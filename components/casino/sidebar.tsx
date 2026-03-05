"use client";

import { useState } from "react";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { id: "popular", icon: Flame, label: "Popular", color: "text-orange-500" },
  { id: "slots", icon: Dice5, label: "Slots", color: "text-foreground" },
  { id: "pescaria", icon: Fish, label: "Pescaria", color: "text-foreground" },
  { id: "blockchain", icon: Blocks, label: "Blockchain", color: "text-foreground" },
  { id: "recentes", icon: Clock, label: "Recentes", color: "text-foreground" },
  { id: "favoritos", icon: Star, label: "Favoritos", color: "text-foreground" },
];

export function Sidebar() {
  const [activeCategory, setActiveCategory] = useState("popular");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "bg-[#111122] border-r border-border flex flex-col transition-all duration-500 shrink-0 relative h-full overflow-y-auto shadow-xl",
        collapsed ? "w-16" : "w-56"
      )}
    >
      {/* Toggle collapse */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-5 z-10 w-7 h-7 rounded-full bg-[#2a2a40] border border-border flex items-center justify-center text-muted-foreground hover:text-gold shadow-md transition-transform hover:scale-110"
        aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      {/* Categories */}
      <nav className="flex-1 py-5 px-2">
        <div className="grid grid-cols-2 gap-3">
          {categories.map(({ id, icon: Icon, label, color }) => {
            const isActive = activeCategory === id;
            return (
              <button
                key={id}
                onClick={() => setActiveCategory(id)}
                role="tab"
                aria-selected={isActive}
                aria-label={label}
                className={cn(
                  "flex flex-col items-center gap-1 py-3 px-2 rounded-xl text-center relative transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gold",
                  isActive
                    ? "bg-gradient-to-r from-[#2a2a50] to-[#3a3a70] text-gold shadow-[0_4px_15px_rgba(255,215,0,0.5)]"
                    : "text-muted-foreground hover:text-gold"
                )}
              >
                <Icon
                  className={cn(
                    "w-6 h-6 transition-transform duration-500",
                    isActive ? "animate-bounce text-gold" : color
                  )}
                />
                {!collapsed && <span className="text-[11px] font-semibold">{label}</span>}

                {/* Active Indicator */}
                {isActive && !collapsed && (
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-7 h-1 rounded-full bg-gradient-to-r from-gold to-yellow-400 animate-pulse"></span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Banners */}
      {!collapsed && (
        <div className="px-2 pb-5 space-y-3">
          {[
            {
              icon: Gift,
              title: "Eventos",
              subtitle: "Confira!",
              from: "#1e3a1e",
              to: "#2a4a2a",
              textColor: "text-casino-green",
            },
            {
              icon: Gift,
              title: "Pendente",
              subtitle: "Resgatar",
              from: "#3a1e1e",
              to: "#4a2a2a",
              textColor: "text-casino-red",
            },
            {
              icon: DollarSign,
              title: "Agente",
              subtitle: "Comissão",
              from: "#1e1e3a",
              to: "#2a2a5a",
              textColor: "text-gold",
            },
          ].map(({ icon: Icon, title, subtitle, from, to, textColor }) => (
            <button
              key={title}
              className={cn(
                "w-full rounded-xl p-3 flex items-center gap-3 transition-transform transform hover:scale-105 hover:brightness-110 shadow-lg",
                `bg-gradient-to-r from-[${from}] to-[${to}]`
              )}
            >
              <Icon className={cn("w-5 h-5", textColor)} />
              <div className="text-left">
                <p className={cn("text-xs font-bold", textColor)}>{title}</p>
                <p className="text-[10px] text-muted-foreground">{subtitle}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Bottom */}
      {!collapsed && (
        <div className="border-t border-border p-3 space-y-2">
          {[
            { icon: Globe, label: "Português" },
            { icon: Download, label: "Baixar App" },
            { icon: Headphones, label: "Suporte" },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground rounded-lg hover:text-foreground hover:bg-[#1e1e3a] transition-colors shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      )}
    </aside>
  );
}