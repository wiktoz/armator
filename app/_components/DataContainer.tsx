import {LuServerOff, LuStar, LuUser2, LuUserCog2} from "react-icons/lu";
import {motion} from "framer-motion";
import Tooltip from "@/app/_components/Tooltip";
import {ReactElement} from "react";

interface Props {
    authError: boolean,
    error: any,
    isLoading: boolean,
    children: ReactElement
}

const DataContainer = ({authError, error, isLoading, children}:Props) => {
    return(
        <div>
            {
                error ?
                    <div className={"flex flex-col gap-1"}>
                        <div className={"text-sm font-semibold text-gray-800 flex flex-row items-center gap-1"}>
                            <LuServerOff/>
                            Fetch error
                        </div>
                        <div className={"text-xs"}>
                            Cannot find API endpoint. Try again later.
                        </div>
                    </div> :

                isLoading ?
                    <div className={"flex flex-col gap-1"}>
                        <motion.div className={"bg-gray-300 h-4 w-64 rounded"}></motion.div>
                        <div className={"bg-gray-300 h-4 w-32 rounded"}></div>
                        <div className={"bg-gray-300 h-4 w-48 rounded"}></div>
                        <div className={"bg-gray-300 h-4 w-72 rounded"}></div>
                    </div> :
                authError ?
                    <div className={"flex flex-col gap-1"}>
                        <div className={"text-sm font-semibold text-gray-800 flex flex-row items-center gap-1"}>
                            <LuServerOff/>
                            Fetch error
                        </div>
                        <div className={"text-xs"}>
                            Authentication error. You have no permission to read this data.
                        </div>
                    </div>
                    :
                    <div>{children}</div>
            }
        </div>
    )
}

export default DataContainer