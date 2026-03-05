"use client"

import { useState } from "react"
import {
  Flame,
  Dice5,
  Fish,
  Blocks,
  Clock,
  Star,
  Gift,
  DollarSign,
  Globe,
  Download,
  Headphones,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

const categories = [
  { id: "popular", icon: Flame, label: "Popular", color: "text-orange-500" },
  { id: "slots", icon: Dice5, label: "Slots", color: "text-foreground" },
  { id: "pescaria", icon: Fish, label: "Pescaria", color: "text-foreground" },
  { id: "blockchain", icon: Blocks, label: "Blockchain", color: "text-foreground" },
  { id: "recentes", icon: Clock, label: "Recentes", color: "text-foreground" },
  { id: "favoritos", icon: Star, label: "Favoritos", color: "text-foreground" },
]

export function Sidebar() {
  const [activeCategory, setActiveCategory] = useState("popular")
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "bg-[#111122] border-r border-border flex flex-col transition-all duration-300 shrink-0 relative h-full overflow-y-auto",
        collapsed ? "w-16" : "w-48"
      )}
    >
      {/* Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-4 z-10 w-6 h-6 rounded-full bg-[#2a2a40] border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        aria-label={collapsed ? "Expandir" : "Recolher"}
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>

      {/* Categories */}
      <nav className="flex-1 py-4 px-2">
        <div className="grid grid-cols-2 gap-1">
          {categories.map((cat) => {
            const Icon = cat.icon
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "flex flex-col items-center gap-1 py-3 px-1 rounded-lg transition-all text-center",
                  isActive
                    ? "bg-[#2a2a40] text-gold"
                    : "text-muted-foreground hover:text-foreground hover:bg-[#1e1e3a]",
                  collapsed && "col-span-2"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-gold" : cat.color)} />
                {!collapsed && (
                  <span className="text-[10px] font-medium leading-tight">{cat.label}</span>
                )}
              </button>
            )
          })}
        </div>
      </nav>

      {/* Banners */}
      {!collapsed && (
        <div className="px-2 pb-2 space-y-2">
          {/* Eventos */}
          <button className="w-full rounded-lg bg-gradient-to-r from-[#1e3a1e] to-[#2a4a2a] p-3 flex items-center gap-2 hover:brightness-110 transition">
            <Gift className="w-5 h-5 text-casino-green" />
            <div className="text-left">
              <p className="text-xs font-bold text-casino-green">Eventos</p>
              <p className="text-[10px] text-muted-foreground">Confira!</p>
            </div>
          </button>

          {/* Pendente */}
          <button className="w-full rounded-lg bg-gradient-to-r from-[#3a1e1e] to-[#4a2a2a] p-3 flex items-center gap-2 hover:brightness-110 transition">
            <Gift className="w-5 h-5 text-casino-red" />
            <div className="text-left">
              <p className="text-xs font-bold text-casino-red">Pendente</p>
              <p className="text-[10px] text-muted-foreground">Resgatar</p>
            </div>
          </button>

          {/* Agente */}
          <button className="w-full rounded-lg bg-gradient-to-r from-[#1e1e3a] to-[#2a2a5a] p-3 flex items-center gap-2 hover:brightness-110 transition">
            <DollarSign className="w-5 h-5 text-gold" />
            <div className="text-left">
              <p className="text-xs font-bold text-gold">Agente</p>
              <p className="text-[10px] text-muted-foreground">Comissao</p>
            </div>
          </button>
        </div>
      )}

      {/* Bottom */}
      {!collapsed && (
        <div className="border-t border-border p-2 space-y-1">
          <button className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground rounded transition-colors">
            <Globe className="w-4 h-4" />
            <span>Portugues</span>
          </button>
          <button className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground rounded transition-colors">
            <Download className="w-4 h-4" />
            <span>Baixar App</span>
          </button>
          <button className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground rounded transition-colors">
            <Headphones className="w-4 h-4" />
            <span>Suporte</span>
          </button>
        </div>
      )}
    </aside>
  )
}
