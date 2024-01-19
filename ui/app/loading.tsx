'use client'

import Loader from "@/app/_components/Loader";

export default function Loading() {
    return(
        <div className={"flex h-[calc(100vh-200px)] justify-center items-center"}>
            <Loader/>
        </div>
    )
}