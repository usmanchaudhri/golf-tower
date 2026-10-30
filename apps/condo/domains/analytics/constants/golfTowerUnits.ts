export type GolfTowerOccupancy = 'owner' | 'tenant' | 'vacant'

export type GolfTowerPerson = {
    name: string
    role: 'owner' | 'ownerFamily' | 'tenant' | 'tenantFamily'
    phone: string
    email: string
    livesHere: boolean
}

export type GolfTowerUnit = {
    id: string
    unit: string
    floor: number
    occupancy: GolfTowerOccupancy
    billTo: string
    dues: number
    parking: Array<string>
    vehicle?: string
    users: Array<GolfTowerPerson>
}

export const GOLF_TOWER_UNITS: Array<GolfTowerUnit> = [
    { id: '101', unit: '101', floor: 1, occupancy: 'owner', billTo: 'Ahmed Al Busaidi', dues: 0, parking: ['B1-01'], vehicle: '33439 A', users: [{ name: 'Ahmed Al Busaidi', role: 'owner', phone: '+968 9121 0101', email: 'ahmed.101@example.om', livesHere: true }] },
    { id: '102', unit: '102', floor: 1, occupancy: 'tenant', billTo: 'Fatima Al Lawati', dues: 390, parking: ['B1-02'], vehicle: '8812 B', users: [{ name: 'Fatima Al Lawati', role: 'owner', phone: '+968 9121 0102', email: 'fatima.102@example.om', livesHere: false }, { name: 'James Whitaker', role: 'tenant', phone: '+968 9121 1102', email: 'james.102@example.com', livesHere: true }] },
    { id: '103', unit: '103', floor: 1, occupancy: 'vacant', billTo: 'Gulf Holdings LLC', dues: 1161, parking: [], users: [{ name: 'Gulf Holdings LLC', role: 'owner', phone: '+968 2460 0103', email: 'accounts@gulfholdings.om', livesHere: false }] },
    { id: '201', unit: '201', floor: 2, occupancy: 'owner', billTo: 'Mariam Al Zadjali', dues: 0, parking: ['B1-03'], vehicle: '1204 C', users: [{ name: 'Mariam Al Zadjali', role: 'owner', phone: '+968 9121 0201', email: 'mariam.201@example.om', livesHere: true }, { name: 'Noor Al Zadjali', role: 'ownerFamily', phone: '+968 9121 1201', email: 'noor.201@example.om', livesHere: true }] },
    { id: '202', unit: '202', floor: 2, occupancy: 'owner', billTo: 'Said Al Hinai', dues: 180, parking: ['B1-04'], vehicle: '5510 D', users: [{ name: 'Said Al Hinai', role: 'owner', phone: '+968 9121 0202', email: 'said.202@example.om', livesHere: true }] },
    { id: '203', unit: '203', floor: 2, occupancy: 'tenant', billTo: 'Layla Al Maskari', dues: 775, parking: ['B1-05'], vehicle: '7731 E', users: [{ name: 'Layla Al Maskari', role: 'owner', phone: '+968 9121 0203', email: 'layla.203@example.om', livesHere: false }, { name: 'Priya Menon', role: 'tenant', phone: '+968 9121 2203', email: 'priya.203@example.com', livesHere: true }] },
    { id: '301', unit: '301', floor: 3, occupancy: 'owner', billTo: 'Hassan Al Riyami', dues: 0, parking: ['B1-06'], vehicle: '4401 F', users: [{ name: 'Hassan Al Riyami', role: 'owner', phone: '+968 9121 0301', email: 'hassan.301@example.om', livesHere: true }] },
    { id: '302', unit: '302', floor: 3, occupancy: 'vacant', billTo: 'Khalid Al Shanfari', dues: 1548, parking: ['B1-07'], users: [{ name: 'Khalid Al Shanfari', role: 'owner', phone: '+968 9121 0302', email: 'khalid.302@example.om', livesHere: false }] },
    { id: '303', unit: '303', floor: 3, occupancy: 'tenant', billTo: 'Aisha Al Balushi', dues: 387, parking: ['B1-08'], vehicle: '9088 G', users: [{ name: 'Aisha Al Balushi', role: 'owner', phone: '+968 9121 0303', email: 'aisha.303@example.om', livesHere: false }, { name: 'Tomás Ribeiro', role: 'tenant', phone: '+968 9121 3303', email: 'tomas.303@example.com', livesHere: true }] },
    { id: '401', unit: '401', floor: 4, occupancy: 'owner', billTo: 'Yousuf Al Kharusi', dues: 0, parking: ['B2-01', 'B2-02'], vehicle: '2210 H', users: [{ name: 'Yousuf Al Kharusi', role: 'owner', phone: '+968 9121 0401', email: 'yousuf.401@example.om', livesHere: true }, { name: 'Huda Al Kharusi', role: 'ownerFamily', phone: '+968 9121 1401', email: 'huda.401@example.om', livesHere: true }] },
    { id: '402', unit: '402', floor: 4, occupancy: 'tenant', billTo: 'Nasser Al Siyabi', dues: 620, parking: ['B2-03'], vehicle: '6677 J', users: [{ name: 'Nasser Al Siyabi', role: 'owner', phone: '+968 9121 0402', email: 'nasser.402@example.om', livesHere: false }, { name: 'Elena Petrova', role: 'tenant', phone: '+968 9121 4402', email: 'elena.402@example.com', livesHere: true }] },
    { id: '403', unit: '403', floor: 4, occupancy: 'owner', billTo: 'Salim Al Amri', dues: 95, parking: ['B2-04'], vehicle: '3145 K', users: [{ name: 'Salim Al Amri', role: 'owner', phone: '+968 9121 0403', email: 'salim.403@example.om', livesHere: true }] },
    { id: '501', unit: '501', floor: 5, occupancy: 'owner', billTo: 'Moza Al Farsi', dues: 0, parking: ['B2-05'], vehicle: '8080 L', users: [{ name: 'Moza Al Farsi', role: 'owner', phone: '+968 9121 0501', email: 'moza.501@example.om', livesHere: true }] },
    { id: '502', unit: '502', floor: 5, occupancy: 'vacant', billTo: 'Al Noor Investments', dues: 2322, parking: [], users: [{ name: 'Al Noor Investments', role: 'owner', phone: '+968 2460 0502', email: 'property@alnoor.om', livesHere: false }] },
    { id: '503', unit: '503', floor: 5, occupancy: 'tenant', billTo: 'Bader Al Habsi', dues: 387, parking: ['B2-06'], vehicle: '1992 M', users: [{ name: 'Bader Al Habsi', role: 'owner', phone: '+968 9121 0503', email: 'bader.503@example.om', livesHere: false }, { name: 'Chen Wei', role: 'tenant', phone: '+968 9121 5503', email: 'chen.503@example.com', livesHere: true }] },
    { id: '601', unit: '601', floor: 6, occupancy: 'owner', billTo: 'Ibtisam Al Aufi', dues: 0, parking: ['B2-07'], vehicle: '4545 N', users: [{ name: 'Ibtisam Al Aufi', role: 'owner', phone: '+968 9121 0601', email: 'ibtisam.601@example.om', livesHere: true }] },
    { id: '602', unit: '602', floor: 6, occupancy: 'tenant', billTo: 'Omar Al Kalbani', dues: 1161, parking: ['B2-08'], vehicle: '6161 P', users: [{ name: 'Omar Al Kalbani', role: 'owner', phone: '+968 9121 0602', email: 'omar.602@example.om', livesHere: false }, { name: 'Sarah Collins', role: 'tenant', phone: '+968 9121 6602', email: 'sarah.602@example.com', livesHere: true }, { name: 'Mark Collins', role: 'tenantFamily', phone: '+968 9121 7602', email: 'mark.602@example.com', livesHere: true }] },
    { id: '603', unit: '603', floor: 6, occupancy: 'owner', billTo: 'Rashid Al Jabri', dues: 210, parking: ['B3-01'], vehicle: '2703 Q', users: [{ name: 'Rashid Al Jabri', role: 'owner', phone: '+968 9121 0603', email: 'rashid.603@example.om', livesHere: true }] },
    { id: '701', unit: '701', floor: 7, occupancy: 'owner', billTo: 'Hind Al Ismaili', dues: 0, parking: ['B3-02'], vehicle: '7010 R', users: [{ name: 'Hind Al Ismaili', role: 'owner', phone: '+968 9121 0701', email: 'hind.701@example.om', livesHere: true }] },
    { id: '702', unit: '702', floor: 7, occupancy: 'vacant', billTo: 'Talal Al Sulti', dues: 775, parking: ['B3-03'], users: [{ name: 'Talal Al Sulti', role: 'owner', phone: '+968 9121 0702', email: 'talal.702@example.om', livesHere: false }] },
    { id: '703', unit: '703', floor: 7, occupancy: 'tenant', billTo: 'Zainab Al Ghafri', dues: 387, parking: ['B3-04'], vehicle: '3390 S', users: [{ name: 'Zainab Al Ghafri', role: 'owner', phone: '+968 9121 0703', email: 'zainab.703@example.om', livesHere: false }, { name: 'David Okonkwo', role: 'tenant', phone: '+968 9121 7703', email: 'david.703@example.com', livesHere: true }] },
    { id: '801', unit: '801', floor: 8, occupancy: 'owner', billTo: 'Majid Al Rawahi', dues: 0, parking: ['B3-05', 'B3-06'], vehicle: '8001 T', users: [{ name: 'Majid Al Rawahi', role: 'owner', phone: '+968 9121 0801', email: 'majid.801@example.om', livesHere: true }] },
    { id: '802', unit: '802', floor: 8, occupancy: 'owner', billTo: 'Sharifa Al Nadabi', dues: 140, parking: ['B3-07'], vehicle: '8028 U', users: [{ name: 'Sharifa Al Nadabi', role: 'owner', phone: '+968 9121 0802', email: 'sharifa.802@example.om', livesHere: true }] },
    { id: '803', unit: '803', floor: 8, occupancy: 'tenant', billTo: 'Waleed Al Mamari', dues: 387, parking: ['B3-08'], vehicle: '1188 V', users: [{ name: 'Waleed Al Mamari', role: 'owner', phone: '+968 9121 0803', email: 'waleed.803@example.om', livesHere: false }, { name: 'Anna Bergström', role: 'tenant', phone: '+968 9121 8803', email: 'anna.803@example.com', livesHere: true }] },
]

export const GOLF_TOWER_PARKING_BAYS: Array<{
    bay: string
    level: string
    unit?: string
    vehicle?: string
    status: 'assigned' | 'vacant' | 'visitor'
}> = [
    { bay: 'B1-01', level: 'B1', unit: '101', vehicle: '33439 A', status: 'assigned' },
    { bay: 'B1-02', level: 'B1', unit: '102', vehicle: '8812 B', status: 'assigned' },
    { bay: 'B1-03', level: 'B1', unit: '201', vehicle: '1204 C', status: 'assigned' },
    { bay: 'B1-04', level: 'B1', unit: '202', vehicle: '5510 D', status: 'assigned' },
    { bay: 'B1-05', level: 'B1', unit: '203', vehicle: '7731 E', status: 'assigned' },
    { bay: 'B1-06', level: 'B1', unit: '301', vehicle: '4401 F', status: 'assigned' },
    { bay: 'B1-07', level: 'B1', unit: '302', vehicle: '', status: 'assigned' },
    { bay: 'B1-08', level: 'B1', unit: '303', vehicle: '9088 G', status: 'assigned' },
    { bay: 'B2-01', level: 'B2', unit: '401', vehicle: '2210 H', status: 'assigned' },
    { bay: 'B2-02', level: 'B2', unit: '401', vehicle: '', status: 'assigned' },
    { bay: 'B2-03', level: 'B2', unit: '402', vehicle: '6677 J', status: 'assigned' },
    { bay: 'B2-04', level: 'B2', unit: '403', vehicle: '3145 K', status: 'assigned' },
    { bay: 'B2-05', level: 'B2', unit: '501', vehicle: '8080 L', status: 'assigned' },
    { bay: 'B2-06', level: 'B2', unit: '503', vehicle: '1992 M', status: 'assigned' },
    { bay: 'B2-07', level: 'B2', unit: '601', vehicle: '4545 N', status: 'assigned' },
    { bay: 'B2-08', level: 'B2', unit: '602', vehicle: '6161 P', status: 'assigned' },
    { bay: 'B3-01', level: 'B3', unit: '603', vehicle: '2703 Q', status: 'assigned' },
    { bay: 'B3-02', level: 'B3', unit: '701', vehicle: '7010 R', status: 'assigned' },
    { bay: 'B3-03', level: 'B3', unit: '702', vehicle: '', status: 'assigned' },
    { bay: 'B3-04', level: 'B3', unit: '703', vehicle: '3390 S', status: 'assigned' },
    { bay: 'B3-05', level: 'B3', unit: '801', vehicle: '8001 T', status: 'assigned' },
    { bay: 'B3-06', level: 'B3', unit: '801', vehicle: '', status: 'assigned' },
    { bay: 'B3-07', level: 'B3', unit: '802', vehicle: '8028 U', status: 'assigned' },
    { bay: 'B3-08', level: 'B3', unit: '803', vehicle: '1188 V', status: 'assigned' },
    { bay: 'B3-09', level: 'B3', status: 'vacant' },
    { bay: 'B3-10', level: 'B3', status: 'vacant' },
    { bay: 'V-01', level: 'Podium', status: 'visitor' },
    { bay: 'V-02', level: 'Podium', status: 'visitor' },
]
