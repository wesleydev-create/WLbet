"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export function JackpotBanner() {
  const [jackpotValue, setJackpotValue] = useState(100357346.27)

  useEffect(() => {
    const interval = setInterval(() => {
      setJackpotValue((prev) => prev + Math.random() * 100)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const formattedValue = jackpotValue.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return (
    <div className="relative w-full rounded-xl overflow-hidden">
      {/* Background image */}
      <div className="relative w-full aspect-[3.5/1] min-h-[160px]">
        <Image
          src="/jackpot-banner.jpg"
          alt="Jackpot WLbet"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/80 via-transparent to-[#0d0d0d]/30" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* JACKPOT text */}
          <div className="relative mb-2">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-wider text-gold jackpot-glow">
              JACKPOT
            </h2>
            {/* Decorative lines */}
            <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-gold" />
            <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-gold" />
          </div>

          {/* Value */}
          <div className="bg-casino-red/90 backdrop-blur-sm rounded-lg px-6 py-2 md:px-10 md:py-3 border border-casino-red">
            <p className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-wide tabular-nums">
              {formattedValue}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
