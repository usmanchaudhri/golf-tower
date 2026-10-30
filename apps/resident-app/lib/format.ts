export const formatOmr = (value: number) => {
    const formatted = new Intl.NumberFormat('en-OM', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value)
    return `OMR ${formatted}`
}

export const formatDate = (iso: string) => {
    return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    }).format(new Date(`${iso}T12:00:00`))
}
