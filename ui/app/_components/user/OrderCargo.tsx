import Input from "@/app/_components/form/Input";
import {useForm} from "react-hook-form";
import {resolver} from "@/app/_components/validation/schema/load";
import React, {useState} from "react";
import Spinner from "@/app/_components/Spinner";
import {fetcher} from "@/lib/helpers";
import {LuBox, LuCheckCheck, LuChevronRight, LuContainer} from "react-icons/lu";
import PortPicker from "@/app/_components/PortPicker";

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
        formState: {errors},
        setValue,
        reset
    } = useForm<NewLoad>({resolver})

    const onSubmit = async (data:NewLoad) => {
        setIsLoading(true)

        try {
            const updateData = await fetcher("http://localhost:2137/api/v1/load/", "POST", JSON.stringify(data))

            if (!updateData) {
                setIsLoading(false)
                setSuccess(false)
                return setMessage("Cannot update data - try again later")
            }

            setIsLoading(false)
            setSuccess(true)
            reset()
            return setMessage("Successfully ordered a new cargo")
        }
        catch(err){
            if(err) {
                setIsLoading(false)
                setSuccess(false)
                return setMessage("Error: cannot connect to API")
            }
        }
    }

    return(
        <div className={"flex flex-col gap-2 my-2 grow"}>
            <div className={"flex flex-row text-xs items-center mb-2"}>
                Cargos <LuChevronRight/> Order a new cargo
            </div>
            <div className={"my-2 flex flex-col gap-1"}>
                <div className={"flex flex-row gap-1 text-gray-700"}>
                    <div>
                        <LuBox size={"1.5em"} className={"h-full"} />
                    </div>
                    <div className={"text-xl font-bold"}>
                        Order a new cargo
                    </div>
                </div>
                <div className={"text-xs text-gray-600"}>
                    Fill out the form to receive freight transport offers from shipowners
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={"flex flex-col gap-2 my-2"}>
                    <div className={"flex flex-col"}>
                        <Input id={"content"} title={"content"} type={"text"}
                               errors={errors} checker={register} />
                    </div>
                    <div className={"flex flex-col"}>
                        <Input id={"weight"} title={"weight"} type={"text"}
                               errors={errors} checker={register} />
                    </div>
                    <div className={"grid md:grid-cols-2 gap-4"}>
                        <PortPicker id={"srcPortId"} title={"from"} errors={errors} checker={register} setValue={setValue}/>
                        <PortPicker id={"dstPortId"} title={"to"} errors={errors} checker={register} setValue={setValue}/>
                    </div>
                </div>
                    <button className={"w-full bg-primary p-2 text-white rounded-lg text-sm mt-2"}>
                        {
                            isLoading ?
                                <div className={"flex text-center justify-center"}><Spinner /></div>
                                : "Order"
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