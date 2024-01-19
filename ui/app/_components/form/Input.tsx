'use client'

import {useEffect, useState} from "react"
import {UseFormRegister, UseFormSetValue} from "react-hook-form";

interface InputParams {
    id: string,
    title: string,
    type: string,
    value?: string,
    autoComplete?: boolean,
    errors: { [key: string]: { message?: string } },
    checker: UseFormRegister<any>,
    setter?: (value: string) => void,
    setValue?: UseFormSetValue<any>
}

const Input = ({id, title, type, value, autoComplete, errors, checker, setter, setValue} : InputParams) => {
    const [currentValue, setCurrentValue] = useState(value || "")

    useEffect(() => {
        setCurrentValue(value || "")
        setValue ? setValue(id, value || "") : null
    }, [value, setValue, id])

    return (
        <div className="w-full">
            <label htmlFor={id} className="block text-xs font-bold text-gray-800">
                {title}
            </label>
            <input
                { ...checker ? checker(id) : ""}
                type={type}
                id={id}
                name={id}
                placeholder={title}
                autoComplete={autoComplete ? autoComplete.toString() : "false"}
                value={currentValue}
                onChange={ e => {
                    setCurrentValue(e.target.value)
                    if(setter) setter(e.target.value)
                }}
                className={"w-full my-1 p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg " +
                    "focus:outline-none focus:border focus:border-gray-800 block ring-0 focus:ring-0 " +
                    (errors ? errors[id] ? "border-red-600" : "border-gray-300" : "border-gray-300")}
            />
            <div className="text-red-600 text-xs mb-2">{ errors ? errors[id]?.message : ""}</div>
        </div>
    )
}

export default Input