"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface GameCardProps {
  name: string;
  provider: string;
  image: string;
  url: string;
}

export function GameCard({ name, provider, image, url }: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group rounded-xl overflow-hidden aspect-[3/4] w-full shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-gold"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Jogar ${name}`}
    >
      {/* Imagem do jogo */}
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
      />

      {/* Overlay com efeito glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col items-center justify-center transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-black font-bold text-sm px-6 py-2 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-xl animate-pulse">
          Jogar
        </div>
      </div>

      {/* Informações do jogo */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-2 pt-6 rounded-b-xl">
        <p className="text-xs md:text-sm font-bold text-white leading-tight text-center truncate">
          {name}
        </p>
        <p className="text-[9px] md:text-[10px] text-gray-400 text-center uppercase tracking-wide truncate">
          {provider}
        </p>
      </div>

      {/* Glow sutil ao redor do card */}
      {isHovered && (
        <div className="absolute inset-0 rounded-xl shadow-[0_0_20px_rgba(255,215,0,0.6)] pointer-events-none" />
      )}
    </Link>
  );
}