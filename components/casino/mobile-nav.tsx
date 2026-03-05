"use client"

import { useState } from "react"
import { Flame, Dice5, Fish, Clock, Star, Gift } from "lucide-react"
import { cn } from "@/lib/utils"

const tabs = [
  { id: "popular", icon: Flame, label: "Popular", color: "text-orange-500" },
  { id: "slots", icon: Dice5, label: "Slots" },
  { id: "pescaria", icon: Fish, label: "Pescaria" },
  { id: "recentes", icon: Clock, label: "Recentes" },
  { id: "favoritos", icon: Star, label: "Favoritos" },
  { id: "eventos", icon: Gift, label: "Eventos" },
]

export function MobileNav() {
  const [active, setActive] = useState("popular")

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#111122] border-t border-border px-1 py-1 safe-area-bottom">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = active === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={cn(
                "flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg transition-colors",
                isActive ? "text-gold" : "text-muted-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[9px] font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
