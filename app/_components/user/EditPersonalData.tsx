import Input from "@/app/_components/form/Input";
import {useForm} from "react-hook-form";
import {resolver} from "@/app/_components/validation/schema/personal";
import React, {useState} from "react";
import {LuArrowRight} from "react-icons/lu";
import Spinner from "@/app/_components/Spinner";

interface PersonalData {
    firstname: string,
    lastname: string,
    email: string
}

const EditPersonalData = ({user}:{user:User}) => {
    const [editState, setEditState] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<PersonalData>({resolver})

    const onSubmit = () => {
        setIsLoading(true)
        console.log("submitting")
        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }

    return(
        <div className={"flex flex-col gap-2 my-2 grow"}>
            <div className={"flex flex-row items-center justify-between gap-4"}>
                <div className={"font-bold"}>Personal information</div>
                <div onClick={() => setEditState(!editState)}
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
                                       errors={errors} checker={register} /> :
                                <>
                                    <div className={"font-bold text-xs"}>e-mail</div>
                                    <div className={"my-2"}>{user?.email}</div>
                                </>
                        }
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
        </div>
    )
}

export default EditPersonalData