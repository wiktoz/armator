import React from "react"
import type { Metadata } from 'next'
import '@/public/css/globals.css'
import Navbar from '@/app/_components/Navbar'
import Transition from "@/app/_components/Transition";

export const metadata: Metadata = {
  title: 'Shipowner',
  description: 'Shipowner',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={"bg-white w-full min-h-screen"}>
        <Navbar/>
          <div>
              {children}
          </div>
      </body>
    </html>
  )
}
