import Input from "@/app/_components/form/Input";
import {useForm} from "react-hook-form";
import {resolver} from "@/app/_components/validation/schema/address";
import React, {useState} from "react";
import {LuArrowRight} from "react-icons/lu";
import Spinner from "@/app/_components/Spinner";
import useSWR from "swr";
import {fetcher} from "@/lib/helpers";
import LoadsContainer from "@/app/_components/LoadsContainer";

const Cargos = () => {
    const { data: loads, error: loadsErr, isLoading: isLoadsLoading }
        = useSWR<Load[]>('http://localhost:2137/api/v1/load/me', fetcher)

    return(
        <div className={"flex flex-col gap-2 my-2 grow"}>
            {
                loads && !loadsErr &&
                <>
                <div className={"flex flex-row items-center justify-between gap-4"}>
                    <div className={"font-bold"}>Ordered cargos</div>
                </div>
                <div className={"h-px bg-primary"}></div>
                </>
            }
            <LoadsContainer loads={loads} isLoadsLoading={isLoadsLoading} loadsErr={loadsErr}/>
        </div>
    )
}

export default Cargos