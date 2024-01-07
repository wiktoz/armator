interface User {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    role: string,
    enabled: boolean,
    accountNonExpired: boolean,
    credentialsNonExpired: boolean,
    authorities: [
        {
            authority: string
        }
    ],
    username: string,
    accountNonLocked: boolean
}

interface Ship {
    shipId: number,
    name: string,
    flag: string,
    maxLoadsNumber: number,
    maxFuelCapacity: number,
    maxKnots: number,
    latitude: number,
    longitude: number,
    shipOwner: {
        shipOwnerId: number,
        user: User
    }
}

interface Port extends Address {
    portId: number,
    maxLoadsNumber: number,
    loadsNumber: number
}

interface Load {
    loadId: number,
    content: string,
    weight: number,
    price: number,
    customer: Customer,
    srcPortId: Port,
    dstPortId: Port,
    status: string
}

interface Address {
    city: string,
    street: string,
    zipCode: string,
    houseNumber?: string,
    flatNumber?: string
}

interface Customer extends Address {
    id: number,
    companyName: string,
    email: string
}