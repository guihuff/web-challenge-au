"use client"

import Link from "next/link";

export default function Error ({error: reset}: {error: Error; reset: () => void}) {
  return (
    <div className="md:min-h-[83vh] flex justify-center items-center flex-col gap-4">
      <h1 className="text-xl">Algo deu errado!</h1>
      <Link href={"/"} 
        className="text-color-primary w-60 h-14 flex items-center justify-center rounded-xl font-bold bg-button-primary hover:text-white transition ease-in-out"
      >
        Voltar ao início
      </Link>
    </div>
  )
}