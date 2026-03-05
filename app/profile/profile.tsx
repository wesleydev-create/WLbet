"use client";

import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { DollarSign, User, LogOut, Settings } from "lucide-react";
import Link from "next/link";

export default function UserProfile() {
  const { user, loading } = useUser(); // Removido setUser
  const [currentTime, setCurrentTime] = useState("");

  // Atualiza horário
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted =
        now.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" }) +
        " • " +
        now.toLocaleTimeString("pt-BR");
      setCurrentTime(formatted);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    // Limpa token
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh] text-muted-foreground">
        Carregando perfil...
      </div>
    );
  }

  if (!user || user.id === 0) {
    return (
      <div className="flex justify-center items-center min-h-[80vh] text-red-500">
        Usuário não logado.
      </div>
    );
  }

  const balance = user.balance ?? 0; // garante que balance seja 0 se não existir

  return (
    <div className="p-4 md:p-8 bg-[#111122] min-h-screen text-white">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#2a2a40] border-4 border-gold flex items-center justify-center">
            <User className="w-8 h-8 text-gold" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{user.email}</h1>
            <p className="text-xs text-muted-foreground">ID: {user.id}</p>
            <p className="text-[10px] text-muted-foreground">{currentTime}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Link
            href="/profile/settings"
            className="flex items-center gap-1 px-4 py-2 rounded bg-[#2a2a40] hover:bg-[#3a3a50] transition"
          >
            <Settings className="w-4 h-4" />
            Configurações
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 px-4 py-2 rounded bg-red-600 hover:bg-red-700 transition"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      </div>

      {/* Saldo */}
      <div className="bg-[#1e1e3a] p-6 rounded-xl mb-8 shadow-lg flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Saldo disponível</p>
          <p className="text-2xl font-extrabold text-gold flex items-center gap-2">
            <DollarSign className="w-5 h-5" /> R$ {balance.toFixed(2)}
          </p>
        </div>
        <button className="bg-gold hover:bg-gold-dark text-black font-bold px-4 py-2 rounded transition">
          Depositar
        </button>
      </div>

      {/* Histórico / Transações */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1e1e3a] rounded-xl p-4 shadow-lg">
          <h2 className="text-lg font-bold text-foreground mb-2">Histórico de Jogos</h2>
          <ul className="text-sm text-muted-foreground space-y-1 max-h-60 overflow-y-auto">
            <li>Jogo 1 - Ganhou R$ 50</li>
            <li>Jogo 2 - Perdeu R$ 20</li>
            <li>Jogo 3 - Ganhou R$ 120</li>
            <li>Jogo 4 - Perdeu R$ 10</li>
          </ul>
        </div>

        <div className="bg-[#1e1e3a] rounded-xl p-4 shadow-lg">
          <h2 className="text-lg font-bold text-foreground mb-2">Transações Recentes</h2>
          <ul className="text-sm text-muted-foreground space-y-1 max-h-60 overflow-y-auto">
            <li>Depósito: R$ 100 - 01/03/2026</li>
            <li>Saque: R$ 50 - 28/02/2026</li>
            <li>Depósito: R$ 200 - 25/02/2026</li>
          </ul>
        </div>
      </div>

      {/* Promoções */}
      <div className="mt-8 bg-[#1e1e3a] rounded-xl p-4 shadow-lg">
        <h2 className="text-lg font-bold text-foreground mb-2">Bônus e Promoções</h2>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>Bônus de Boas-Vindas: +R$ 50</li>
          <li>Bônus de Depósito: +R$ 100</li>
        </ul>
      </div>
    </div>
  );
}