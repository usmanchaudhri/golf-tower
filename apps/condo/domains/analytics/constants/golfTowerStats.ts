export type GolfTowerMonth = {
    label: string
    income: number
    expenses: number
}

export type GolfTowerOpexItem = {
    id: 'electricity' | 'repairs' | 'fm' | 'cleaning' | 'security' | 'office'
    amount: number
}

export const GOLF_TOWER_STATS = {
    income: 152153,
    surplus: 26698,
    receivables: 70109,
    software: 1567,
    opex: 125455,
    defaulters: 174,
    due: 68624,
    excess: 1252,
    netDue: 67372,
    avgDue: 387,
    cashOutsideFd: 22304,
    bankMuscat: 26535,
    nboCurrent: -5532,
    nboFd: 64314,
    otherRecv: 7452,
    payables: 21733,
    sinking: 68410,
    retained: 45200,
    bsSurplus: 32230,
    bankMuscat2024: 4039,
    nboCurrent2024: 15620,
    nboFd2024: 42206,
    receivables2024: 61344,
    payables2024: 24848,
    sinking2024: 60410,
    retained2024: 36366,
    assetsTotal: 164254,
    equityLiabilities: 169786,
    receivablesDelta: 8765,
    decemberIncomeReversal: 139210,
    decemberExpenseReversal: 147533,
    months: [
        { label: 'Oct 25', income: 25, expenses: 12151 },
        { label: 'Nov 25', income: 25315, expenses: 9886 },
        { label: 'Jan 26', income: 23217, expenses: 13885 },
        { label: 'Feb 26', income: 1998, expenses: 10522 },
        { label: 'Mar 26', income: 26314, expenses: 9512 },
        { label: 'Apr 26', income: 0, expenses: 11055 },
        { label: 'May 26', income: 31204, expenses: 14207 },
        { label: 'Jun 26', income: 7031, expenses: 20342 },
        { label: 'Jul 26', income: 28788, expenses: 16964 },
        { label: 'Aug 26', income: 0, expenses: 15095 },
        { label: 'Sep 26', income: 33407, expenses: 11949 },
    ] as Array<GolfTowerMonth>,
    opexItems: [
        { id: 'electricity', amount: 38959 },
        { id: 'repairs', amount: 25168 },
        { id: 'fm', amount: 19845 },
        { id: 'cleaning', amount: 13085 },
        { id: 'security', amount: 17251 },
        { id: 'office', amount: 11147 },
    ] as Array<GolfTowerOpexItem>,
}
