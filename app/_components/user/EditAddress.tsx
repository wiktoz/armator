import Input from "@/app/_components/form/Input";
import {useForm} from "react-hook-form";
import {resolver} from "@/app/_components/validation/schema/address";
import React, {useState} from "react";
import {LuArrowRight} from "react-icons/lu";
import Spinner from "@/app/_components/Spinner";

const EditAddress = ({user}:{user:User}) => {
    const [editState, setEditState] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<Address>({resolver})

    const onSubmit = () => {
        setIsLoading(true)
        console.log("submitting")
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }

    return(
        <div className={"flex flex-col gap-2 my-2 grow"}>
            <div className={"flex flex-row items-center justify-between gap-4"}>
                <div className={"font-bold"}>Address</div>
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
                                <Input id={"street"} title={"street"} type={"text"} value={"Marszałkowska"}
                                       errors={errors} checker={register} /> :
                                <>
                                    <div className={"font-bold text-xs"}>street</div>
                                    <div className={"my-2"}>{"Marszałkowska"}</div>
                                </>
                        }
                    </div>
                    <div className={"flex items-center " + (editState ? "gap-8" : "gap-5")}>
                        <div className={"flex flex-col"}>
                            {
                                editState ?
                                    <Input id={"houseNumber"} title={"house"} type={"text"} value={"11"}
                                           errors={errors} checker={register} /> :
                                    <>
                                        <div className={"font-bold text-xs"}>house</div>
                                        <div className={"my-2"}>{"11"}</div>
                                    </>
                            }
                        </div>
                        { !editState && <div className={"font-bold self-end my-2"}>/</div>}
                        <div className={"flex flex-col"}>
                            {
                                editState ?
                                    <Input id={"flat"} title={"flat"} type={"text"} value={"59"}
                                           errors={errors} checker={register} /> :
                                    <>
                                        <div className={"font-bold text-xs"}>flat</div>
                                        <div className={"my-2"}>{"59"}</div>
                                    </>
                            }
                        </div>
                    </div>
                    <div className={"flex gap-8"}>
                        <div className={"flex flex-col"}>
                            {
                                editState ?
                                    <Input id={"zipCode"} title={"zip code"} type={"text"} value={"02-495"}
                                           errors={errors} checker={register} /> :
                                    <>
                                        <div className={"font-bold text-xs"}>zip code</div>
                                        <div className={"my-2"}>{"02-495"}</div>
                                    </>
                            }
                        </div>
                        <div className={"flex flex-col"}>
                            {
                                editState ?
                                    <Input id={"city"} title={"city"} type={"text"} value={"Warszawa"}
                                           errors={errors} checker={register} /> :
                                    <>
                                        <div className={"font-bold text-xs"}>city</div>
                                        <div className={"my-2"}>{"Warszawa"}</div>
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
        </div>
    )
}

export default EditAddress