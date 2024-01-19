import FetchError from "@/app/_components/errors/FetchError";
import LoadBox from "@/app/_components/LoadBox";
import useSWR from "swr";
import {fetcher} from "@/lib/helpers";
import UsersLoader from "@/app/_components/loaders/UsersLoader";
import SearchBar from "@/app/_components/form/SearchBar";
import {LuContainer} from "react-icons/lu";
import {useState} from "react";

const LoadsContainer = () => {
    const [search, setSearch] = useState("")
    const { data: loads, error: loadsErr, isLoading: isLoadsLoading }
        = useSWR<Load[]>(search ? 'http://localhost:2137/api/v1/load/search/' + search : "http://localhost:2137/api/v1/load/all", fetcher)

    return(
        <div className={"my-2"}>
        <div className={"flex flex-row justify-between items-center mb-4 gap-6"}>
            <div className={"my-2 flex flex-col gap-1"}>
                <div className={"flex flex-row gap-1 text-gray-700"}>
                    <div>
                        <LuContainer size={"1.5em"} className={"h-full"} />
                    </div>
                    <div className={"text-xl font-bold"}>
                        Loads
                    </div>
                </div>
                <div className={"text-xs text-gray-600"}>
                    Preview and manage cargos
                </div>
            </div>
            <div className={"grow md:grow-0 md:w-1/2 lg:w-1/4"}>
                <SearchBar setter={setSearch}/>
            </div>
        </div>
        <div className={"flex flex-col gap-1 grow"}>
            {
                loadsErr ?
                    <FetchError message={"Cannot find API endpoint. Try again later."}/> :

                isLoadsLoading ?
                    <UsersLoader/> :

                !loads ?
                    <FetchError message={"Authentication error. You have no permission to read this data."}/> :

                loads.length === 0 ?
                    <div className={"text-xs mb-4 text-gray-800"}>
                        No cargos to show
                    </div> :

                <div>
                    <div>

                    </div>
                    <div className={"grid grid-cols-1 lg:grid-cols-2 gap-4"}>
                        {
                            loads && loads.length > 0 && loads.map(l => {
                                return(
                                    <div key={l.loadId}>
                                        <LoadBox l={l}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </div>
        </div>
    )
}

export default LoadsContainer