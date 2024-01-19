import {ChangeEvent, useState} from "react";

interface Props {
    setter: (value: string) => void
}

const SearchBar = ({setter}:Props) => {
    return(
        <div className={"w-full"}>
            <input type={"text"} placeholder={"search"}
                   onChange={e => setter(e.target.value)}
                   className={"shadow w-full rounded-xl p-2 text-xs font-normal border border-gray-500 " +
                       "focus:outline-none focus:border focus:border-gray-800 block ring-0 focus:ring-0"}
            />
        </div>
    )
}

export default SearchBar