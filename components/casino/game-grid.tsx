"use client";

import { useEffect, useState } from "react";
import { Flame, TrendingUp, Zap } from "lucide-react";
import { GameCard } from "./game-card";

interface Game {
  id: number;
  title: string;
  thumbnail: string;
  publisher: string;
  game_url: string;
}

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  games: Game[];
}

// Componente de seção de jogos
function GameSection({ title, icon, games }: SectionProps) {
  return (
    <section className="space-y-4">
      {/* Cabeçalho da seção */}
      <div className="flex items-center gap-3">
        <div className="text-xl">{icon}</div>
        <h2 className="text-lg md:text-xl font-bold text-foreground tracking-wide">{title}</h2>
      </div>

      {/* Grid de jogos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
  );
}

// Componente principal de grid de jogos
export function GameGrid() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchGames() {
      try {
        const res = await fetch("/api/games");
        if (!res.ok) throw new Error("Erro na resposta da API");

        const data = await res.json();
        setGames(data);
      } catch (err) {
        console.error("Erro ao buscar jogos:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchGames();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        {[1, 2, 3].map((_, idx) => (
          <div key={idx} className="animate-pulse space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-zinc-700 rounded-full" />
              <div className="h-5 w-24 bg-zinc-700 rounded" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-full h-32 bg-zinc-700 rounded-lg" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 font-semibold text-lg">
        Erro ao carregar jogos. Tente novamente mais tarde.
      </p>
    );
  }

  // Dividindo categorias
  const popular = games.slice(0, 6);
  const trending = games.slice(6, 12);
  const newest = games.slice(12, 18);

  return (
    <div className="space-y-10">
      <GameSection
        title="Popular"
        icon={<Flame className="w-5 h-5 text-orange-500 animate-pulse" />}
        games={popular}
      />
      <GameSection
        title="Em Alta"
        icon={<TrendingUp className="w-5 h-5 text-green-500 animate-pulse" />}
        games={trending}
      />
      <GameSection
        title="Novos Jogos"
        icon={<Zap className="w-5 h-5 text-yellow-500 animate-pulse" />}
        games={newest}
      />
    </div>
  );
}