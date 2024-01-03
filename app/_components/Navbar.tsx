import { LuShip } from "react-icons/lu"

export default function Navbar(){
    return(
        <div>
            <div className={"flex flex-row bg-primary p-4 py-8 text-slate-100"}>
                <div>
                    <LuShip size={"2em"} className={"h-full"}/>
                </div>
                <p className={"font-bold tracking-wider text-xl align-middle pt-1 pl-2"}>Shipowner</p>
            </div>
        </div>
    )
}