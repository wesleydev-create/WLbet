"use client"

import { useState, useEffect } from "react"
import { Search, User } from "lucide-react"

export function Header() {
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const formatted = now.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }) + ", " + now.toLocaleTimeString("pt-BR")
      setCurrentTime(formatted)
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-[#111122] border-b border-border sticky top-0 z-50">
      {/* Logo + Time */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <span className="text-2xl font-extrabold tracking-tight">
            <span className="text-gold">WL</span>
            <span className="text-foreground">bet</span>
          </span>
        </div>
        <span className="hidden md:block text-xs text-muted-foreground">
          {currentTime}
          <br />
          <span className="text-[10px]">UTC -03:00</span>
        </span>
      </div>

      {/* Balance + Actions */}
      <div className="flex items-center gap-3">
        <button className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Buscar">
          <Search className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1 bg-[#1e1e3a] rounded-full px-3 py-1.5">
          <span className="w-2 h-2 rounded-full bg-casino-green" />
          <span className="text-sm font-bold text-casino-green">100,00</span>
          <span className="text-muted-foreground text-xs ml-1">R$</span>
        </div>

        <button className="bg-gold hover:bg-gold-dark text-primary-foreground font-bold text-sm px-4 py-1.5 rounded transition-colors">
          Deposito
        </button>

        <div className="flex items-center gap-2 ml-2">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-foreground">Player650</p>
            <p className="text-[10px] text-muted-foreground">ID: 650</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#2a2a40] flex items-center justify-center overflow-hidden border-2 border-gold">
            <User className="w-5 h-5 text-gold" />
          </div>
        </div>
      </div>
    </header>
  )
}
