import {decodeJwt} from "jose";

export const getToken = async () => {
    const response = await fetch("http://localhost:3000/api/token/get", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    })

    if(response.status === 200){
        const data = await response.json()
        return data.token
    }
    return null
}

export const deleteToken = async () => {
    const response = await fetch("http://localhost:3000/api/token/delete", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return response.status === 200;
}

export const logout = async () => {
    const token = await getToken()
    if(!token) return true

    const isTokenDeleted = await deleteToken()
    if(!isTokenDeleted) return false

    const blackListToken = await fetch("http://api:2137/api/v1/auth/revoke-token", {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    })

    return blackListToken.status === 200;
}

export const isTokenValid = async (token:string) => {
    if(!token) return false

    try {
        const checkValidity = await fetch("http://api:2137/api/v1/auth/check-token", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })

        if(checkValidity.status !== 200) return false

        const response = await checkValidity.json()

        return response.authenticated;

    } catch (err){
        if(err)
            return false
    }
}

export const getTokenPayload = async (token:string) => {
    if (!token) return null

    const payload = await decodeJwt(token)

    if (!payload) return null

    return {
        email: payload.email as string,
        iat: payload.iat as number,
        exp: payload.exp as number,
        role: payload.role as string
    }
}

export const fetcher = async (url:string, method?:string, body?:string) => {
    const token = await getToken()

    console.log(body)

    if (token) {
        const data = await fetch(url, {
            method: method || 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: body ? body : null
        })

        if(data.status === 200) return await data.json()
    }

    return null
}