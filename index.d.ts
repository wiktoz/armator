interface User extends Address{
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
    user: User,
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