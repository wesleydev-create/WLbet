"use client";

import ProtectedRoute from "@/components/ProtectedRoute"; // protege a rota
import { Header } from "@/components/casino/header";
import { Sidebar } from "@/components/casino/sidebar";
import { JackpotBanner } from "@/components/casino/jackpot-banner";
import { GameGrid } from "@/components/casino/game-grid";
import { MobileNav } from "@/components/casino/mobile-nav";

export default function HomePage() {
  return (
    <ProtectedRoute redirectPath="/login">
      <div className="flex flex-col h-screen bg-background overflow-hidden">
        {/* Cabeçalho */}
        <Header />

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Desktop */}
          <aside className="hidden md:flex h-full">
            <Sidebar />
          </aside>

          {/* Conteúdo Principal */}
          <main className="flex-1 overflow-y-auto pb-20 md:pb-6">
            <div className="max-w-7xl mx-auto px-3 md:px-6 py-4 space-y-6">
              {/* Banner de Jackpot */}
              <JackpotBanner />

              {/* Grid de Jogos */}
              <GameGrid />
            </div>
          </main>
        </div>

        {/* Navegação Mobile */}
        <MobileNav />
      </div>
    </ProtectedRoute>
  );
}