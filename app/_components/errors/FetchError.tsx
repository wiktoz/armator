import {LuServerOff} from "react-icons/lu"

const FetchError = ({ message }: { message: string }) => {
    return(
        <div className={"flex flex-col gap-1"}>
            <div className={"text-sm font-semibold text-gray-800 flex flex-row items-center gap-1"}>
                <LuServerOff/>
                Fetch error
            </div>
            <div className={"text-xs"}>
                {message}
            </div>
        </div>
    )
}

export default FetchError