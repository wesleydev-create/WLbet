"use client"

import { useEffect, useState } from "react"
import { Flame, TrendingUp, Zap } from "lucide-react"
import { GameCard } from "./game-card"

interface Game {
  id: number
  title: string
  thumbnail: string
  publisher: string
  game_url: string
}

interface SectionProps {
  title: string
  icon: React.ReactNode
  games: Game[]
}

function GameSection({ title, icon, games }: SectionProps) {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-lg font-bold text-foreground">{title}</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {games.map((game) => (
          <GameCard
            key={game.id}
            name={game.title}
            provider={game.publisher}
            image={game.thumbnail}
            url={game.game_url}
          />
        ))}
      </div>
    </section>
  )
}

export function GameGrid() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchGames() {
      try {
        const res = await fetch("/api/games")

        if (!res.ok) {
          throw new Error("Erro na resposta da API")
        }

        const data = await res.json()
        setGames(data)
      } catch (err) {
        console.error("Erro ao buscar jogos:", err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchGames()
  }, [])

  if (loading) {
    return (
      <p className="text-center text-muted-foreground">
        Carregando jogos...
      </p>
    )
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        Erro ao carregar jogos.
      </p>
    )
  }

  const popular = games.slice(0, 6)
  const trending = games.slice(6, 12)
  const newest = games.slice(12, 18)

  return (
    <div className="space-y-8">
      <GameSection
        title="Popular"
        icon={<Flame className="w-5 h-5 text-orange-500" />}
        games={popular}
      />

      <GameSection
        title="Em Alta"
        icon={<TrendingUp className="w-5 h-5 text-green-500" />}
        games={trending}
      />

      <GameSection
        title="Novos Jogos"
        icon={<Zap className="w-5 h-5 text-yellow-500" />}
        games={newest}
      />
    </div>
  )
}