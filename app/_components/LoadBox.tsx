import {LuBox, LuMail, LuMapPin} from "react-icons/lu";
import Accordion from "@/app/_components/Accordion";

const LoadBox = ({l}:{l:Load}) => {
    return(
        <div className={"rounded-lg border border-primary"}>
            <div className={"flex flex-row gap-2 h-full w-full"}>
                <div className={"flex items-center text-white bg-primary rounded-l-lg px-4"}>
                    <LuBox className={"text-xl"}/>
                </div>
                <div className={"grow mx-4 p-4"}>
                    <div className={"grid grid-cols-3 gap-2"}>
                        <div className={"flex flex-col col-span-3"}>
                            <Accordion title={"customer"}>
                                <div className={"flex flex-col gap-2"}>
                                    <div className={"font-semibold"}>
                                        {l.user.firstname} {l.user.lastname}
                                    </div>
                                    <div className={"flex flex-row items-center text-sm gap-2"}>
                                        <LuMail className={"text-xs"}/>
                                        <p>{l.user.email}</p>
                                    </div>
                                    <div className={"flex flex-row items-center text-sm gap-2"}>
                                        <LuMapPin className={"text-xs"}/>
                                        <div>
                                            <p>{l.user.street} {l.user.houseNumber}/{l.user.flatNumber}</p>
                                            <p>{l.user.zipCode} {l.user.city}</p>
                                        </div>
                                    </div>
                                </div>
                            </Accordion>
                        </div>

                        <div className={"col-span-2"}>
                            <hr className="h-[0.5px] my-1 bg-gray-500 border-0"/>
                        </div>
                        <div></div>

                        <div className={"flex flex-col"}>
                            <div className={"text-xs font-bold"}>content</div>
                            <div className={"text-sm"}>{l.content}</div>
                        </div>
                        <div className={"flex flex-col"}>
                            <div className={"text-xs font-bold"}>weight</div>
                            <div className={"text-sm"}>
                                {l.weight}
                                <span className={"text-xs ml-0.5"}>kg</span>
                            </div>
                        </div>
                        <div></div>

                        <div className={"flex flex-col"}>
                            <div className={"text-xs font-bold"}>from</div>
                            <div className={"text-sm"}>{l.srcPortId.city}</div>
                        </div>
                        <div className={"flex flex-col"}>
                            <div className={"text-xs font-bold"}>to</div>
                            <div className={"text-sm"}>{l.dstPortId.city}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <span
                        className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
                        {l.status && l.status.toLowerCase()}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default LoadBox