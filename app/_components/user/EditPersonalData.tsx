import Input from "@/app/_components/form/Input";
import {useForm} from "react-hook-form";
import {resolver} from "@/app/_components/validation/schema/personal";
import React, {useState} from "react";
import {LuArrowRight, LuCheckCheck} from "react-icons/lu";
import Spinner from "@/app/_components/Spinner";
import {fetcher, logout} from "@/lib/helpers";
import {KeyedMutator} from "swr";
import {useRouter} from 'next/navigation'

interface PersonalData {
    firstname: string,
    lastname: string,
    email: string
}

const EditPersonalData = ({user, mutate}:{user:User, mutate:KeyedMutator<User>}) => {
    const router = useRouter()
    const [editState, setEditState] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [success, setSuccess] = useState(false)

    const [email, setEmail] = useState(user.email)

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<PersonalData>({resolver})

    const onSubmit = async (data: PersonalData) => {
        setIsLoading(true)

        const updateData = await fetcher("http://localhost:2137/api/v1/user/me", "PUT", JSON.stringify(data))

        if(!updateData){
            setIsLoading(false)
            setEditState(false)
            setSuccess(false)
            return setMessage("Cannot update data - try again later")
        }

        if(user.email !== email){
            await logout()
            return router.push("/auth/signin")
        }

        await mutate()

        setIsLoading(false)
        setEditState(false)
        setSuccess(true)
        return setMessage("Successfully updated information")
    }

    return(
        <div className={"flex flex-col gap-2 my-2 grow"}>
            <div className={"flex flex-row items-center justify-between gap-4"}>
                <div className={"font-bold"}>Personal information</div>
                <div onClick={() => { setEditState(!editState); setMessage("")}}
                     className={"hover:cursor-pointer flex flex-row gap-1 items-center text-xs"}>
                    <div>
                        {
                            editState ?
                                "Cancel editing" : "Edit data"

                        }
                    </div>
                    <div><LuArrowRight/></div>
                </div>
            </div>

            <div className={"h-px bg-primary"}></div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={"flex flex-col gap-2 my-2"}>
                    <div className={"flex flex-col"}>
                        {
                            editState ?
                                <Input id={"firstname"} title={"name"} type={"text"} value={user?.firstname}
                                       errors={errors} checker={register} /> :
                                <>
                                    <div className={"font-bold text-xs"}>name</div>
                                    <div className={"my-2"}>{user?.firstname}</div>
                                </>
                        }
                    </div>
                    <div className={"flex flex-col"}>
                        {
                            editState ?
                                <Input id={"lastname"} title={"surname"} type={"text"} value={user?.lastname}
                                       errors={errors} checker={register} /> :
                                <>
                                    <div className={"font-bold text-xs"}>surname</div>
                                    <div className={"my-2"}>{user?.lastname}</div>
                                </>
                        }
                    </div>
                    <div className={"flex flex-col"}>
                        {
                            editState ?
                                <Input id={"email"} title={"e-mail"} type={"text"} value={user?.email}
                                       errors={errors} checker={register} setter={setEmail} /> :
                                <>
                                    <div className={"font-bold text-xs"}>e-mail</div>
                                    <div className={"my-2"}>{user?.email}</div>
                                </>
                        }
                    </div>
                </div>
                {
                    editState && user.email !== email &&
                    <div className={"text-xs font-bold my-2"}>
                        <span className={"text-red-600"}>Warning:</span>  you will be asked to sign in again after changing e-mail.
                    </div>
                }
                {
                    editState &&
                    <button className={"w-full bg-primary p-2 text-white rounded-lg text-sm mt-2"}>
                        {
                            isLoading ?
                                <div className={"flex text-center justify-center"}><Spinner /></div>
                                : "Save"
                        }
                    </button>
                }
            </form>
            {
                message &&
                <div className={"flex flex-row gap-1 items-center text-sm "
                    + (success ? "text-green-600" : "text-red-600")}>
                    <LuCheckCheck/>
                    <p>{message}</p>
                </div>
            }
        </div>
    )
}

export default EditPersonalData