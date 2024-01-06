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