import {useState} from "react";
import { LuChevronDown, LuAnchor } from "react-icons/lu";
import {AnimatePresence, motion} from "framer-motion";
import useSWR from "swr";
import {fetcher} from "@/lib/helpers";
import FetchError from "@/app/_components/errors/FetchError";
import UsersLoader from "@/app/_components/loaders/UsersLoader";
import Input from "@/app/_components/form/Input";
import {UseFormRegister, UseFormSetValue} from "react-hook-form";

interface Props {
    title:string,
    id:string,
    errors: { [key: string]: { message?: string } },
    checker: UseFormRegister<any>,
    setValue: UseFormSetValue<any>
}

const PortPicker = ({title, id, errors, checker, setValue}:Props) => {
    const { data: ports, error: portsErr, isLoading: isPortsLoading } = useSWR<Port[]>('http://localhost:2137/api/v1/port/all', fetcher)

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [pickedPort, setPickedPort] = useState<number>()

    return(
        <div>
            <div className={"text-xs font-bold text-gray-800 my-1"}>{title}</div>
            <div className={"flex flex-col border-primary border py-2 px-2 rounded-lg text-sm bg-gray-50 mb-1"}>
                <div onClick={() => setIsOpen(!isOpen)}
                     className={"hover:cursor-pointer flex items-center justify-between transition-all"}>

                    {
                        pickedPort ?
                            ports && ports.length > 0 && ports.map(p => {
                                return p.portId === pickedPort ?
                                        <div key={"#"+p.portId}>
                                            <div className={"flex flex-row items-center p-2"}>
                                                <div className={"text-lg mx-2"}>
                                                    <LuAnchor/>
                                                </div>
                                                <div className={"mx-2"}>
                                                    <p>{p.city}</p>
                                                    <p>{p.zipCode} {p.street}</p>
                                                </div>
                                            </div>
                                        </div> : null
                            }) :

                            <div className={"px-2 py-1"}>Pick your port</div>
                    }
                    <motion.div
                        key={"arrow"}
                        animate={{
                            rotate: isOpen ? 180 : 0
                        }}
                        className="text-sm"
                    >
                        <LuChevronDown/>
                    </motion.div>
                </div>
                {
                    isOpen &&
                    <motion.div
                        key={"modal"}
                        initial={{ opacity: 0, height:0, y:-30 }}
                        animate={{
                            opacity: 1,
                            height:"auto",
                            y:0,
                            transition: {
                                duration: 0.2,
                            },
                        }}
                        exit={{ opacity: 0, height:0, y:-30, transition: {
                                duration: 0.2,
                            }}}
                    >
                    <div className={"bg-primary h-px my-2"}></div>
                    <div className={"my-2"}>
                        {
                            portsErr ?
                                <FetchError message={"Cannot find API endpoint. Try again later."}/> :

                            isPortsLoading ?
                                <UsersLoader/> :

                            !ports ?
                                <FetchError message={"Authentication error. You have no permission to read this data."}/> :

                            ports.length === 0 ?
                                <div className={"text-xs my-4"}>
                                    No ports to show
                                </div> :

                            ports.map(p => {
                                return(
                                    <div key={"port"+p.portId} onClick={() => { setPickedPort(p.portId); setIsOpen(false)}}>
                                        <div className={"flex flex-row items-center p-2 my-1 rounded-lg hover:cursor-pointer hover:bg-primary hover:text-white "
                                            + (pickedPort === p.portId ? "bg-primary text-white" : null)}>
                                            <div className={"text-lg mx-2"}>
                                                <LuAnchor/>
                                            </div>
                                            <div className={"mx-2"}>
                                                <p>{p.city}</p>
                                                <p>{p.zipCode} {p.street}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    </motion.div>
                }
            </div>
            <Input id={id} title={""} type={"hidden"} errors={errors} checker={checker} value={pickedPort ? pickedPort.toString() : ""}
            setValue={setValue}/>
        </div>
    )
}

export default PortPicker