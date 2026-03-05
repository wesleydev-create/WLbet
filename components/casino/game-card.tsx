"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface GameCardProps {
  name: string
  provider: string
  image: string
  url: string // Nova prop para link
}

export function GameCard({ name, provider, image, url }: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group rounded-xl overflow-hidden aspect-[3/4] w-full transition-transform duration-200 hover:scale-[1.03] hover:z-10 focus-visible:ring-2 focus-visible:ring-gold"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Jogar ${name}`}
    >
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
      />

      {/* Overlay ao passar o mouse */}
      <div
        className={`absolute inset-0 bg-[#0d0d0d]/70 flex flex-col items-center justify-center transition-opacity duration-200 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="bg-gold text-primary-foreground font-bold text-sm px-6 py-2 rounded-full transition-transform duration-200 hover:scale-105">
          Jogar
        </div>
      </div>

      {/* Informações do jogo */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/80 to-transparent p-2 pt-6">
        <p className="text-xs md:text-sm font-bold text-foreground leading-tight text-center">
          {name}
        </p>
        <p className="text-[10px] text-muted-foreground text-center uppercase tracking-wide">
          {provider}
        </p>
      </div>
    </Link>
  )
}