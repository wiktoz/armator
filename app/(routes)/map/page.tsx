import dynamic from "next/dynamic"

const Map = dynamic(() => import('@/app/_components/Map'), {
    ssr: false
})

export default function ShipMap() {
    return (
    <main className="min-w-screen min-h-screen overflow-hidden relative">
        <Map/>
    </main>
  )
}
