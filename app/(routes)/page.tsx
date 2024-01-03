'use client'

import { LuShip, LuContainer } from "react-icons/lu"
import { motion } from 'framer-motion'

export default function Home(){
    return(
        <div>
        <div className={"p-4"}>
            <div className={"flex flex-row gap-1 text-gray-700 mb-4"}>
                <div>
                    <LuShip size={"1.5em"} className={"h-full"} />
                </div>
                <div className={"text-2xl font-bold"}>
                    Ships
                </div>
            </div>
            <div className={"flex flex-col gap-1 mx-4"}>
                <motion.div className={"bg-gray-300 h-4 w-64 rounded"}></motion.div>
                <div className={"bg-gray-300 h-4 w-32 rounded"}></div>
                <div className={"bg-gray-300 h-4 w-48 rounded"}></div>
                <div className={"bg-gray-300 h-4 w-72 rounded"}></div>
            </div>
        </div>
        <div className={"p-4"}>
            <div className={"flex flex-row gap-1 text-gray-700 mb-4"}>
                <div>
                    <LuContainer size={"1.5em"} className={"h-full"} />
                </div>
                <div className={"text-2xl font-bold"}>
                    Loads
                </div>
            </div>
            <div className={"flex flex-col gap-1 mx-4"}>
                <div className={"bg-gray-300 h-4 w-64 rounded"}></div>
                <div className={"bg-gray-300 h-4 w-32 rounded"}></div>
                <div className={"bg-gray-300 h-4 w-48 rounded"}></div>
                <div className={"bg-gray-300 h-4 w-72 rounded"}></div>
            </div>
        </div>
        </div>
    )
}