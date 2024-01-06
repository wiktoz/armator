'use client'

import dynamic from "next/dynamic"
import {useEffect, useState} from "react";
import axios from "axios";
import MarkerBox from "@/app/_components/map/MarkerBox";

const Map = dynamic(() => import('@/app/_components/map/Map'), {
    ssr: false
})

export default function ShipMap() {
    useEffect(() => {
        /*fetch("http://localhost:3000/api/token/get", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(r => {
            if(r.status === 200)
                r.json().then(data => {
                    fetch("http://localhost:2137/api/v1/user/me", {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${data.token}`,
                            'Content-Type': 'application/json',
                        }
                    }).then(r => {
                        if(r.status === 200)
                            r.json().then(data => setUser(data))
                    })
                })
        })*/
    }, [])

    return (
    <main className="min-w-screen h-[calc(100vh-96px)] overflow-hidden relative">
        <Map>
            <MarkerBox/>
        </Map>
    </main>
  )
}
