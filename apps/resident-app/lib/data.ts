import type {
    Amenity,
    Conversation,
    Notice,
    ResidentProfile,
    Ticket,
    Visitor,
} from './types'

export const BUILDING = {
    name: 'Golf Tower',
    city: 'Muscat',
    manager: 'Intelligence of the Era',
    cycle: 'Sep 2026',
}

export const RESIDENTS: Array<ResidentProfile> = [
    {
        id: 'priya',
        name: 'Priya Menon',
        firstName: 'Priya',
        role: 'tenant',
        unit: '203',
        floor: 2,
        phone: '+968 9121 2203',
        email: 'priya.203@example.com',
        building: BUILDING.name,
        city: BUILDING.city,
        parking: 'B1-05',
        vehicle: '7731 E',
        landlord: 'Layla Al Maskari',
        dues: 775,
        autoPay: false,
        brand: 'visa',
        last4: '7731',
        invoices: [
            { id: 'inv-sep', title: 'Service charge', period: 'Sep 2026', dueDate: '2026-09-15', amount: 387, status: 'due' },
            { id: 'inv-jul', title: 'Service charge', period: 'Jul 2026', dueDate: '2026-07-15', amount: 388, status: 'due' },
        ],
        receipts: [
            { id: 'r-oct', date: '2026-10-25', amount: 387, method: 'Visa', brand: 'visa', last4: '7731' },
            { id: 'r-may', date: '2026-05-18', amount: 387, method: 'Visa', brand: 'visa', last4: '7731' },
        ],
    },
    {
        id: 'ahmed',
        name: 'Ahmed Al Busaidi',
        firstName: 'Ahmed',
        role: 'owner',
        unit: '101',
        floor: 1,
        phone: '+968 9121 0101',
        email: 'ahmed.101@example.om',
        building: BUILDING.name,
        city: BUILDING.city,
        parking: 'B1-01',
        vehicle: '33439 A',
        dues: 0,
        autoPay: true,
        brand: 'visa',
        last4: '4242',
        invoices: [
            { id: 'inv-sep-a', title: 'Service charge', period: 'Sep 2026', dueDate: '2026-09-15', amount: 387, status: 'paid' },
        ],
        receipts: [
            { id: 'r-28', date: '2026-10-28', amount: 387, method: 'Visa · Auto', brand: 'visa', last4: '4242', auto: true },
            { id: 'r-jul-a', date: '2026-07-16', amount: 387, method: 'Visa · Auto', brand: 'visa', last4: '4242', auto: true },
        ],
    },
]

export const CONVERSATIONS: Array<Conversation> = [
    {
        id: 'c1',
        author: 'Mariam Al Zadjali',
        unit: '201',
        time: '2h ago',
        title: 'Gym AC after 8pm',
        body: 'Is anyone else finding the gym too warm in the evenings? Happy to raise a ticket if others agree.',
        channel: 'neighbours',
        replies: 6,
        likes: 11,
    },
    {
        id: 'c2',
        author: 'Building management',
        unit: 'Office',
        time: 'Yesterday',
        title: 'Tank cleaning · Friday 06:00',
        body: 'Domestic water will pause for about 90 minutes on Friday. Please fill a few bottles tonight. Lift 2 stays in service.',
        channel: 'management',
        replies: 3,
        likes: 8,
    },
    {
        id: 'c3',
        author: 'Yousuf Al Kharusi',
        unit: '401',
        time: 'Tue',
        title: 'Visitor parking on B1',
        body: 'Contractors are taking the two visitor bays all morning. Can we keep one free after 9?',
        channel: 'neighbours',
        replies: 4,
        likes: 5,
    },
    {
        id: 'c4',
        author: 'Moza Al Farsi',
        unit: '501',
        time: 'Mon',
        title: 'Eid courtyard breakfast',
        body: 'Thinking of a small shared breakfast in the courtyard next Friday. I’ll bring dates and kahwa if 8+ people join.',
        channel: 'neighbours',
        replies: 12,
        likes: 19,
    },
]

export const VISITORS: Array<Visitor> = [
    { id: 'v1', name: 'Amazon · parcel', when: 'Today · 16:30–18:00', type: 'delivery', status: 'expected' },
    { id: 'v2', name: 'Ananya Menon', when: 'Tomorrow · 19:00', type: 'guest', status: 'expected', vehicle: '8821 B' },
    { id: 'v3', name: 'Cooling technician', when: 'Tue 4 Nov · 10:00', type: 'contractor', status: 'expected' },
    { id: 'v4', name: 'Cleaner · Fatima', when: 'Yesterday · 09:12', type: 'contractor', status: 'left' },
]

export const TICKETS: Array<Ticket> = [
    { id: 't1', title: 'Kitchen mixer drip', category: 'Plumbing', status: 'inProgress', updated: 'Today 11:40' },
    { id: 't2', title: 'Corridor light flicker, floor 2', category: 'Electrical', status: 'open', updated: 'Mon' },
    { id: 't3', title: 'Access card for helper', category: 'Access', status: 'resolved', updated: '12 Oct' },
]

export const NOTICES: Array<Notice> = [
    {
        id: 'n1',
        title: 'Service charge · Sep cycle',
        body: 'September invoices are open. Pay in the app with Visa or Mastercard. Auto-pay residents are already billed.',
        date: '2026-09-08',
        tone: 'alert',
    },
    {
        id: 'n2',
        title: 'Pool closed Thursday morning',
        body: 'The pool deck is being resealed 07:00–12:00. Gym stays open.',
        date: '2026-10-27',
        tone: 'info',
    },
    {
        id: 'n3',
        title: 'Courtyard iftar · 12 Nov',
        body: 'Residents and one guest. RSVP in Community. Children welcome.',
        date: '2026-10-20',
        tone: 'event',
    },
]

export const AMENITIES: Array<Amenity> = [
    { id: 'gym', name: 'Gym · level 1', hours: '05:00 – 23:00', nextSlot: 'Open now' },
    { id: 'pool', name: 'Pool deck', hours: '06:00 – 21:00', nextSlot: '2 loungers free' },
    { id: 'court', name: 'Courtyard / hall', hours: 'By booking', nextSlot: 'Fri 18:00 free' },
    { id: 'guest', name: 'Guest suite', hours: 'Overnight', nextSlot: 'Next: 8 Nov' },
]
