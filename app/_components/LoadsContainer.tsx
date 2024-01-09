import FetchError from "@/app/_components/errors/FetchError";
import UsersLoader from "@/app/_components/loaders/UsersLoader";
import Load from "@/app/_components/Load";

const LoadsContainer = ({loads, loadsErr, isLoadsLoading}:{loads:Load[]|undefined, loadsErr:string, isLoadsLoading:boolean}) => {
    return(
        <div className={"flex flex-col gap-1 grow"}>
            {
                loadsErr ?
                    <FetchError message={"Cannot find API endpoint. Try again later."}/> :

                isLoadsLoading ?
                    <UsersLoader/> :

                !loads ?
                    <FetchError message={"Authentication error. You have no permission to read this data."}/> :

                loads.length === 0 ?
                    <div className={"text-xs my-4"}>
                        No cargos to show
                    </div> :

                <div className={"grid grid-cols-1 gap-2"}>
                    {
                        loads && loads.length > 0 && loads.map(l => {
                            return(
                                <div key={l.loadId}>
                                    <Load l={l}/>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}

export default LoadsContainer