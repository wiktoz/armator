import Input from "@/app/_components/form/Input";
import {useForm} from "react-hook-form";
import {resolver} from "@/app/_components/validation/schema/load";
import React, {useState} from "react";
import {LuArrowRight} from "react-icons/lu";
import Spinner from "@/app/_components/Spinner";
import {fetcher} from "@/lib/helpers";
import { LuCheckCheck } from "react-icons/lu";

interface NewLoad {
    content: string,
    weight: number,
    srcPortId: number,
    dstPortId: number,
}

const OrderCargo = ({user}:{user:User}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [success, setSuccess] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<NewLoad>({resolver})

    const onSubmit = async (data:NewLoad) => {
        setIsLoading(true)

        const updateData = await fetcher("http://localhost:2137/api/v1/user/me", "PUT", JSON.stringify(data))

        if(!updateData){
            setIsLoading(false)
            setSuccess(false)
            return setMessage("Cannot update data - try again later")
        }

        setIsLoading(false)
        setSuccess(true)
        return setMessage("Successfully updated information")
    }

    return(
        <div className={"flex flex-col gap-2 my-2 grow"}>
            <div className={"flex flex-row items-center justify-between gap-4"}>
                <div className={"font-bold"}>Address</div>
            </div>

            <div className={"h-px bg-primary"}></div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={"flex flex-col gap-2 my-2"}>
                    <div className={"flex flex-col"}>
                                <Input id={"street"} title={"street"} type={"text"} value={"Marszałkowska"}
                                       errors={errors} checker={register} /> :
                                <>
                                    <div className={"font-bold text-xs"}>street</div>
                                    <div className={"my-2"}>{"Marszałkowska"}</div>
                                </>
                    </div>
                    <div className={"flex items-center gap-5"}>
                        <div className={"flex flex-col"}>
                                    <Input id={"houseNumber"} title={"house"} type={"text"} value={"11"}
                                           errors={errors} checker={register} /> :
                                    <>
                                        <div className={"font-bold text-xs"}>house</div>
                                        <div className={"my-2"}>{"11"}</div>
                                    </>
                        </div>
                        <div className={"flex flex-col"}>
                                    <Input id={"flatNumber"} title={"flat"} type={"text"} value={"59"}
                                           errors={errors} checker={register} /> :
                                    <>
                                        <div className={"font-bold text-xs"}>flat</div>
                                        <div className={"my-2"}>{"59"}</div>
                                    </>
                        </div>
                    </div>
                    <div className={"flex gap-8"}>
                        <div className={"flex flex-col"}>
                                    <Input id={"zipCode"} title={"zip code"} type={"text"} value={"02-495"}
                                           errors={errors} checker={register} /> :
                                    <>
                                        <div className={"font-bold text-xs"}>zip code</div>
                                        <div className={"my-2"}>{"02-495"}</div>
                                    </>
                        </div>
                        <div className={"flex flex-col"}>
                                    <Input id={"city"} title={"city"} type={"text"} value={"Warszawa"}
                                           errors={errors} checker={register} /> :
                                    <>
                                        <div className={"font-bold text-xs"}>city</div>
                                        <div className={"my-2"}>{"Warszawa"}</div>
                                    </>
                        </div>
                    </div>
                </div>
                    <button className={"w-full bg-primary p-2 text-white rounded-lg text-sm mt-2"}>
                        {
                            isLoading ?
                                <div className={"flex text-center justify-center"}><Spinner /></div>
                                : "Save"
                        }
                    </button>
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

export default OrderCargo