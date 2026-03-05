"use client";

import { useState } from "react";
import { Flame, Dice5, Fish, Clock, Star, Gift } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "popular", icon: Flame, label: "Popular", color: "text-orange-500" },
  { id: "slots", icon: Dice5, label: "Slots" },
  { id: "pescaria", icon: Fish, label: "Pescaria" },
  { id: "recentes", icon: Clock, label: "Recentes" },
  { id: "favoritos", icon: Star, label: "Favoritos" },
  { id: "eventos", icon: Gift, label: "Eventos" },
];

export function MobileNav() {
  const [active, setActive] = useState("popular");

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#111122] border-t border-border px-2 py-2 safe-area-bottom shadow-inner"
      role="tablist"
      aria-label="Navegação mobile"
    >
      <div className="flex items-center justify-around relative">
        {tabs.map(({ id, icon: Icon, label, color }) => {
          const isActive = active === id;

          return (
            <button
              key={id}
              onClick={() => setActive(id)}
              role="tab"
              aria-selected={isActive}
              aria-label={label}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 py-1 px-2 rounded-lg transition-all duration-300 hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold",
                isActive ? `text-gold ${color || ""}` : "text-muted-foreground"
              )}
            >
              <Icon
                className={cn(
                  "w-6 h-6 transition-transform duration-300",
                  isActive ? "scale-125" : "scale-100"
                )}
              />
              <span
                className={cn(
                  "text-[10px] font-semibold transition-colors duration-300",
                  isActive ? "text-gold" : "text-muted-foreground"
                )}
              >
                {label}
              </span>

              {/* Indicador ativo animado */}
              {isActive && (
                <span className="absolute bottom-0 h-1 w-8 bg-gold rounded-full transition-all duration-300"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}