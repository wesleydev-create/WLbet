"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export function JackpotBanner() {
  const [jackpotValue, setJackpotValue] = useState(100_357_346.27);

  // Incremento suave do jackpot
  useEffect(() => {
    const interval = setInterval(() => {
      setJackpotValue((prev) => prev + Math.random() * 150);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedValue = jackpotValue.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-xl">
      {/* Fundo animado */}
      <div className="relative w-full aspect-[3.5/1] min-h-[180px]">
        <Image
          src="/jackpot-banner.jpg"
          alt="Jackpot WLbet"
          fill
          className="object-cover brightness-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/90 via-transparent to-[#0d0d0d]/30 animate-pulse" />

        {/* Conteúdo */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          {/* Texto JACKPOT com glow */}
          <h2 className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gold tracking-widest text-center drop-shadow-[0_0_12px_rgba(255,215,0,0.8)] animate-pulse">
            JACKPOT
            {/* Efeito de luz lateral */}
            <span className="absolute -left-8 top-1/2 w-12 h-1 bg-gold rounded-full -translate-y-1/2 animate-ping" />
            <span className="absolute -right-8 top-1/2 w-12 h-1 bg-gold rounded-full -translate-y-1/2 animate-ping" />
          </h2>

          {/* Valor do Jackpot */}
          <div className="mt-4 md:mt-6 bg-gradient-to-r from-[#ff4d4d]/80 to-[#ff1a1a]/70 backdrop-blur-sm border border-red-600 rounded-xl px-6 py-3 md:px-10 md:py-4 flex items-center gap-3 shadow-lg animate-[pulse_2s_infinite]">
            <Sparkles className="w-6 h-6 text-yellow-400 animate-bounce" />
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-wide tabular-nums">
              R$ {formattedValue}
            </p>
          </div>

          {/* Botão CTA */}
          <button className="mt-4 md:mt-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-6 md:px-8 py-2 md:py-3 rounded-full shadow-xl hover:scale-105 transition-transform flex items-center gap-2">
            JOGAR AGORA
            <Sparkles className="w-5 h-5 animate-spin-slow text-yellow-300" />
          </button>
        </div>
      </div>
    </div>
  );
}