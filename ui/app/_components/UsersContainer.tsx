import FetchError from "@/app/_components/errors/FetchError";
import LoadBox from "@/app/_components/LoadBox";
import useSWR from "swr";
import {fetcher} from "@/lib/helpers";
import UsersLoader from "@/app/_components/loaders/UsersLoader";
import SearchBar from "@/app/_components/form/SearchBar";
import {LuContainer, LuUsers2} from "react-icons/lu";
import {useState} from "react";
import UserBox from "@/app/_components/UserBox";

const UsersContainer = () => {
    const [search, setSearch] = useState("")
    const { data: users, error: usersErr, isLoading: isUsersLoading }
        = useSWR<User[]>(search ? 'http://localhost:2137/api/v1/user/search/' + search : 'http://localhost:2137/api/v1/user/all', fetcher)

    return(
        <div>
            <div className={"flex flex-row justify-between items-center mb-4 gap-6"}>
                <div className={"my-2 flex flex-col gap-1"}>
                    <div className={"flex flex-row gap-1 text-gray-700"}>
                        <div>
                            <LuUsers2 size={"1.5em"} className={"h-full"} />
                        </div>
                        <div className={"text-xl font-bold"}>
                            Users
                        </div>
                    </div>
                    <div className={"text-xs text-gray-600"}>
                        Preview and manage users
                    </div>
                </div>
                <div className={"grow md:grow-0 md:w-1/2 lg:w-1/4"}>
                    <SearchBar setter={setSearch}/>
                </div>
            </div>
            <div className={"flex flex-col gap-1"}>
                {
                    usersErr ?
                        <FetchError message={"Cannot find API endpoint. Try again later."}/> :

                    isUsersLoading ?
                        <UsersLoader/> :

                    !users ?
                        <FetchError message={"Authentication error. You have no permission to read this data."}/> :

                    users.length === 0 ?
                        <div className={"text-xs mb-4 text-gray-800"}>
                            No users to show
                        </div> :

                    <div className={"grid md:grid-cols-2 lg:grid-cols-3 gap-4"}>
                        {
                            users.length > 0 && users.map(u => {
                                return(
                                    <div key={u.id}>
                                        <UserBox u={u}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default UsersContainer