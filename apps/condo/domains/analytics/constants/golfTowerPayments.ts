import { GOLF_TOWER_UNITS } from './golfTowerUnits'

import type { GolfTowerOccupancy } from './golfTowerUnits'



export type CardBrand = 'visa' | 'mastercard'
export type PaymentStatus = 'paid' | 'pending' | 'failed'

export type GolfTowerCardPayment = {
    id: string
    date: string
    unit: string
    tenant: string
    amount: number
    brand: CardBrand
    last4: string
    status: PaymentStatus
    auto: boolean
}

export type GolfTowerAutoPayRow = {
    unit: string
    tenant: string
    occupancy: GolfTowerOccupancy
    dues: number
    autoPay: boolean
    brand?: CardBrand
    last4?: string
}

const AUTO_PAY_CARDS: Record<string, { brand: CardBrand, last4: string }> = {
    '101': { brand: 'visa', last4: '4242' },
    '102': { brand: 'mastercard', last4: '4444' },
    '201': { brand: 'visa', last4: '1881' },
    '202': { brand: 'visa', last4: '5510' },
    '301': { brand: 'mastercard', last4: '5100' },
    '401': { brand: 'visa', last4: '2210' },
    '501': { brand: 'mastercard', last4: '5454' },
    '601': { brand: 'visa', last4: '4545' },
    '701': { brand: 'visa', last4: '7010' },
    '801': { brand: 'mastercard', last4: '2222' },
}

export const GOLF_TOWER_CARD_PAYMENTS: Array<GolfTowerCardPayment> = [
    { id: 'p-28', date: '2026-10-28', unit: '101', tenant: 'Ahmed Al Busaidi', amount: 387, brand: 'visa', last4: '4242', status: 'paid', auto: true },
    { id: 'p-27', date: '2026-10-28', unit: '201', tenant: 'Mariam Al Zadjali', amount: 387, brand: 'visa', last4: '1881', status: 'paid', auto: true },
    { id: 'p-26', date: '2026-10-27', unit: '301', tenant: 'Hassan Al Riyami', amount: 387, brand: 'mastercard', last4: '5100', status: 'paid', auto: true },
    { id: 'p-25', date: '2026-10-27', unit: '401', tenant: 'Yousuf Al Kharusi', amount: 387, brand: 'visa', last4: '2210', status: 'paid', auto: true },
    { id: 'p-24', date: '2026-10-26', unit: '501', tenant: 'Moza Al Farsi', amount: 387, brand: 'mastercard', last4: '5454', status: 'paid', auto: true },
    { id: 'p-23', date: '2026-10-26', unit: '801', tenant: 'Majid Al Rawahi', amount: 387, brand: 'mastercard', last4: '2222', status: 'paid', auto: true },
    { id: 'p-22', date: '2026-10-25', unit: '203', tenant: 'Priya Menon', amount: 387, brand: 'visa', last4: '7731', status: 'paid', auto: false },
    { id: 'p-21', date: '2026-10-24', unit: '601', tenant: 'Ibtisam Al Aufi', amount: 387, brand: 'visa', last4: '4545', status: 'pending', auto: true },
    { id: 'p-20', date: '2026-10-23', unit: '102', tenant: 'James Whitaker', amount: 390, brand: 'mastercard', last4: '4444', status: 'failed', auto: true },
    { id: 'p-19', date: '2026-10-22', unit: '701', tenant: 'Hind Al Ismaili', amount: 387, brand: 'visa', last4: '7010', status: 'paid', auto: true },
    { id: 'p-18', date: '2026-10-21', unit: '403', tenant: 'Salim Al Amri', amount: 95, brand: 'visa', last4: '3145', status: 'pending', auto: false },
    { id: 'p-17', date: '2026-10-20', unit: '502', tenant: 'Al Noor Investments', amount: 387, brand: 'mastercard', last4: '0909', status: 'failed', auto: false },
]

export const GOLF_TOWER_AUTO_PAY: Array<GolfTowerAutoPayRow> = GOLF_TOWER_UNITS.map((unit) => {
    const card = AUTO_PAY_CARDS[unit.id]
    return {
        unit: unit.unit,
        tenant: unit.billTo,
        occupancy: unit.occupancy,
        dues: unit.dues,
        autoPay: Boolean(card),
        brand: card?.brand,
        last4: card?.last4,
    }
})
