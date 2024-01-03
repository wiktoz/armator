'use client'

import React, {useEffect, useState} from "react";

interface FuncProps {
    handleSignIn(email: string, password: string):void
}

const SignIn: React.FC<FuncProps> = ({handleSignIn}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const trySignIn = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        handleSignIn(email, password)
    }

    return(
        <div>
            <input type={"text"}
                   value={email}
                   onChange={e => setEmail(e.target.value)} />
            <input type={"password"}
                   value={password}
                   onChange={e => setPassword(e.target.value)} />
            <button onClick={e => trySignIn(e)}>Sign In</button>
        </div>
    )
}

export default SignIn