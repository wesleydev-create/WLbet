import { Header } from "@/components/casino/header"
import { Sidebar } from "@/components/casino/sidebar"
import { JackpotBanner } from "@/components/casino/jackpot-banner"
import { GameGrid } from "@/components/casino/game-grid"
import { MobileNav } from "@/components/casino/mobile-nav"

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden md:flex h-full">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-6">
          <div className="max-w-7xl mx-auto px-3 md:px-6 py-4 space-y-6">
            {/* Jackpot Banner */}
            <JackpotBanner />

            {/* Game Grid */}
            <GameGrid />
          </div>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <MobileNav />
    </div>
  )
}
