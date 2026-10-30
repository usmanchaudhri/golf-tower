# syntax=docker/dockerfile:1.7
ARG REGISTRY=docker.io

FROM ${REGISTRY}/python:3.14-slim-bookworm AS python
FROM ${REGISTRY}/node:24-bookworm-slim AS node

FROM ${REGISTRY}/buildpack-deps:bookworm AS base

COPY --from=python /usr/local/ /usr/local/
COPY --from=node /usr/local/ /usr/local/
COPY --from=node /opt/ /opt/

# Add app user/group! Clean packages and fix links! Check version! And install some extra packages!
RUN set -ex \
	&& groupadd -r app --gid=999 \
	&& useradd --system --create-home --home /app --gid 999 --uid=999 --shell /bin/bash app \
	&& rm -f /usr/local/bin/docker-entrypoint.sh \
	&& python --version \
	&& pip --version \
	&& node --version \
	&& yarn --version \
	&& python3 -m pip install 'psycopg2-binary==2.9.10' && python3 -m pip install 'Django==5.2' \
    && echo "OK"

# Collect yarn.lock + package.json without requiring a host-side `out/` (gitignored).
FROM base AS pruner
WORKDIR /src
COPY --chown=app:app . /src
# yarn.lock lists @app/resident-app. The folder is absent when Railway clones
# without that workspace (old gitlink / incomplete context), which makes
# `yarn install --immutable` fail with YN0028.
RUN set -eux \
    && mkdir -p apps/resident-app \
    && if [ ! -f apps/resident-app/package.json ]; then \
         printf '%s\n' '{"name":"@app/resident-app","version":"0.0.0-development","private":true}' > apps/resident-app/package.json; \
       fi \
    && bash bin/prune.sh \
    && test -f out/apps/resident-app/package.json \
    && test -f out/yarn.lock

# Installer
FROM base AS installer

WORKDIR /app
COPY --from=pruner --chown=app:app /src/out /app
# Copy yarn berry
COPY --chown=app:app ./.yarn /app/.yarn
COPY --chown=app:app ./.yarnrc.yml /app/.yarnrc.yml
RUN yarn install --immutable --inline-builds

# Builder
FROM base AS builder

ARG TURBO_TEAM
ARG TURBO_TOKEN
ARG TURBO_API
ARG TURBO_REMOTE_ONLY=false

WORKDIR /app
# Copy entire repo
COPY --chown=app:app . /app
# Copy previously installed packages
COPY --from=installer --chown=app:app /app /app

ENV TURBO_TEAM=$TURBO_TEAM
ENV TURBO_TOKEN=$TURBO_TOKEN
ENV TURBO_API=$TURBO_API
ENV TURBO_REMOTE_ONLY=$TURBO_REMOTE_ONLY

RUN echo "# Build time .env config!" >> /app/.env && \
	echo "COOKIE_SECRET=undefined" >> /app/.env && \
	echo "DATABASE_URL=undefined" >> /app/.env && \
	echo "REDIS_URL=undefined" >> /app/.env && \
	echo "FILE_FIELD_ADAPTER=local" >> /app/.env && \
	echo "NEXT_TELEMETRY_DISABLED=1" >> /app/.env && \
	echo "NODE_ENV=production" >> /app/.env

RUN chmod +x ./bin/run_condo_domain_tests.sh

RUN set -ex \
    && yarn turbo run build --filter=@app/condo... \
    && rm -rf /app/out \
    && rm -rf /app/.env  \
    && rm -rf /app/.config /app/.cache /app/.docker  \
    && ls -lah /app/

# Runtime container
FROM base
USER app:app
WORKDIR /app
COPY --from=builder --chown=app:app /app /app
ENV NODE_ENV=production
CMD ["yarn", "workspace", "@app/condo", "start"]
