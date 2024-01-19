import Input from "@/app/_components/form/Input";
import {useForm} from "react-hook-form";
import {resolver} from "@/app/_components/validation/schema/address";
import React, {useState} from "react";
import {LuArrowRight, LuChevronRight} from "react-icons/lu";
import Spinner from "@/app/_components/Spinner";
import useSWR from "swr";
import {fetcher} from "@/lib/helpers";
import LoadsContainer from "@/app/_components/LoadsContainer";

const Cargos = () => {

    return(
        <div className={"my-2"}>
            <div className={"flex flex-row text-xs items-center mb-4"}>
                Cargos <LuChevronRight/> Ordered cargos
            </div>
            <LoadsContainer/>
        </div>
    )
}

export default Cargos