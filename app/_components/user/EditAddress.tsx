import Input from "@/app/_components/form/Input";
import {useForm} from "react-hook-form";
import {resolver} from "@/app/_components/validation/schema/address";
import React, {useState} from "react";
import {LuArrowRight} from "react-icons/lu";
import Spinner from "@/app/_components/Spinner";
import {fetcher} from "@/lib/helpers";
import {KeyedMutator} from "swr";
import { LuCheckCheck } from "react-icons/lu";

const EditAddress = ({user, mutate}:{user:User, mutate:KeyedMutator<User>}) => {
    const [editState, setEditState] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [success, setSuccess] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<Address>({resolver})

    const onSubmit = async (data:Address) => {
        setIsLoading(true)

        const updateData = await fetcher("http://localhost:2137/api/v1/user/me", "PUT", JSON.stringify(data))

        if(!updateData){
            setIsLoading(false)
            setEditState(false)
            setSuccess(false)
            return setMessage("Cannot update data - try again later")
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
                <div className={"font-bold"}>Address</div>
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
                                <Input id={"street"} title={"street"} type={"text"} value={user.street}
                                       errors={errors} checker={register} /> :
                                <>
                                    <div className={"font-bold text-xs"}>street</div>
                                    <div className={"my-2"}>{user.street}</div>
                                </>
                        }
                    </div>
                    <div className={"flex items-center " + (editState ? "gap-8" : "gap-5")}>
                        <div className={"flex flex-col"}>
                            {
                                editState ?
                                    <Input id={"houseNumber"} title={"house"} type={"text"} value={user.houseNumber}
                                           errors={errors} checker={register} /> :
                                    <>
                                        <div className={"font-bold text-xs"}>house</div>
                                        <div className={"my-2"}>{user.houseNumber}</div>
                                    </>
                            }
                        </div>
                        { !editState && <div className={"font-bold self-end my-2"}>/</div>}
                        <div className={"flex flex-col"}>
                            {
                                editState ?
                                    <Input id={"flatNumber"} title={"flat"} type={"text"} value={user.flatNumber}
                                           errors={errors} checker={register} /> :
                                    <>
                                        <div className={"font-bold text-xs"}>flat</div>
                                        <div className={"my-2"}>{user.flatNumber}</div>
                                    </>
                            }
                        </div>
                    </div>
                    <div className={"flex gap-8"}>
                        <div className={"flex flex-col"}>
                            {
                                editState ?
                                    <Input id={"zipCode"} title={"zip code"} type={"text"} value={user.zipCode}
                                           errors={errors} checker={register} /> :
                                    <>
                                        <div className={"font-bold text-xs"}>zip code</div>
                                        <div className={"my-2"}>{user.zipCode}</div>
                                    </>
                            }
                        </div>
                        <div className={"flex flex-col"}>
                            {
                                editState ?
                                    <Input id={"city"} title={"city"} type={"text"} value={user.city}
                                           errors={errors} checker={register} /> :
                                    <>
                                        <div className={"font-bold text-xs"}>city</div>
                                        <div className={"my-2"}>{user.city}</div>
                                    </>
                            }
                        </div>
                    </div>
                </div>
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

export default EditAddress