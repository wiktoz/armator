import {LuCheckCheck, LuShip} from "react-icons/lu";
import Datepicker from "@/app/_components/form/Datepicker";
import {useForm} from "react-hook-form";
import {resolver} from "@/app/_components/validation/schema/cruise";
import React, {useState} from "react";
import Spinner from "@/app/_components/Spinner";
import PortPicker from "@/app/_components/PortPicker";

interface Cruise {
    startDate: string,
    endDate: string,
    routeLength?: number,
    loadsNumber?: number,
    shipId: number,
    srcPortId: number,
    dstPortId: number,
    workersIds: number[]
}

const NewCruise = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [message, setMessage] = useState("")

    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue
    } = useForm<Cruise>({resolver})

    const onSubmit = async (data: Cruise) => {
        console.log(data)
    }

    return(
        <div>
            <div className={"flex flex-row justify-between items-center mb-4 gap-6"}>
                <div className={"my-2 flex flex-col gap-1"}>
                    <div className={"flex flex-row gap-1 text-gray-700"}>
                        <div>
                            <LuShip size={"1.5em"} className={"h-full"} />
                        </div>
                        <div className={"text-xl font-bold"}>
                            Cruise
                        </div>
                    </div>
                    <div className={"text-xs text-gray-600"}>
                        Add a new cruise
                    </div>
                </div>
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={"flex flex-col gap-4"}>
                        <div>
                            <Datepicker title={"start date"} id={"startDate"}/>
                            <PortPicker title={"source port"} id={"srcPortId"}
                                    errors={errors} checker={register} setValue={setValue}/>
                        </div>
                        <div>
                            <Datepicker title={"end date"} id={"endDate"}/>
                            <PortPicker title={"destination port"} id={"dstPortId"}
                                    errors={errors} checker={register} setValue={setValue}/>
                        </div>

                        <button className={"w-full bg-primary p-2 text-white rounded-lg text-sm mt-2"}>
                            {
                                isLoading ?
                                    <div className={"flex text-center justify-center"}><Spinner /></div>
                                    : "Save"
                            }
                        </button>
                    </div>
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
        </div>
    )
}

export default NewCruise