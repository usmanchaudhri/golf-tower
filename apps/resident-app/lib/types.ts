export type CardBrand = 'visa' | 'mastercard'

export type InvoiceStatus = 'due' | 'paid' | 'pending' | 'failed'

export type Invoice = {
    id: string
    title: string
    period: string
    dueDate: string
    amount: number
    status: InvoiceStatus
}

export type Receipt = {
    id: string
    date: string
    amount: number
    method: string
    brand?: CardBrand
    last4?: string
    auto?: boolean
}

export type Conversation = {
    id: string
    author: string
    unit: string
    time: string
    title: string
    body: string
    channel: 'neighbours' | 'management'
    replies: number
    likes: number
}

export type Visitor = {
    id: string
    name: string
    when: string
    type: 'guest' | 'delivery' | 'contractor'
    status: 'expected' | 'in' | 'left'
    vehicle?: string
}

export type Ticket = {
    id: string
    title: string
    category: string
    status: 'open' | 'inProgress' | 'resolved'
    updated: string
}

export type Notice = {
    id: string
    title: string
    body: string
    date: string
    tone: 'info' | 'alert' | 'event'
}

export type Amenity = {
    id: string
    name: string
    hours: string
    nextSlot: string
}

export type ResidentProfile = {
    id: string
    name: string
    firstName: string
    role: 'owner' | 'tenant'
    unit: string
    floor: number
    phone: string
    email: string
    building: string
    city: string
    parking: string
    vehicle?: string
    landlord?: string
    dues: number
    autoPay: boolean
    brand?: CardBrand
    last4?: string
    invoices: Array<Invoice>
    receipts: Array<Receipt>
}
