"use client";

import { useState, useEffect, Fragment } from "react";
import { Search, User, ChevronDown, ChevronUp, LogOut } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { Menu, Transition } from "@headlessui/react"; // Dropdown Headless UI
import Link from "next/link";

export function Header() {
  const { user, loading } = useUser();
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted =
        now.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" }) +
        ", " +
        now.toLocaleTimeString("pt-BR");
      setCurrentTime(formatted);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <header className="flex items-center justify-between px-4 py-2 bg-[#111122] border-b border-border sticky top-0 z-50">
        <span className="text-xs text-muted-foreground">Carregando usuário...</span>
      </header>
    );
  }

  const username = user?.id && user.id !== 0 ? user.email || "Usuário" : "Guest";
  const userId = user?.id || 0;
  const balance = user?.id && user.id !== 0 ? (user as any).balance || 0 : 0;

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-2 bg-[#111122] border-b border-border sticky top-0 z-50 gap-2 sm:gap-0">
      {/* Logo + Hora */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span className="text-2xl font-extrabold tracking-tight flex-shrink-0">
          <span className="text-gold">Smart</span>
          <span className="text-foreground">bet</span>
        </span>

        <span className="hidden md:flex flex-col text-xs text-muted-foreground truncate">
          <span className="truncate">{currentTime}</span>
          <span className="text-[10px]">UTC -03:00</span>
        </span>
      </div>

      {/* Ações: Buscar, Saldo, Depósito, Usuário */}
      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto">
        {/* Buscar */}
        <button
          className="p-2 text-muted-foreground hover:text-foreground transition-colors shrink-0"
          aria-label="Buscar"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Saldo */}
        <div className="flex items-center gap-1 bg-[#1e1e3a] rounded-full px-3 py-1.5 shrink-0">
          <span className="w-2 h-2 rounded-full bg-casino-green" />
          <span className="text-sm font-bold text-casino-green truncate">{balance.toFixed(2)}</span>
          <span className="text-muted-foreground text-xs ml-1">R$</span>
        </div>

        {/* Depósito */}
        <button className="bg-gold hover:bg-gold-dark text-primary-foreground font-bold text-sm px-4 py-1.5 rounded transition-colors shrink-0">
          Depósito
        </button>

        {/* Usuário com Dropdown */}
        <Menu as="div" className="relative ml-2 shrink-0">
          <Menu.Button className="flex items-center gap-2 rounded-full bg-[#2a2a40] px-2 py-1.5 border-2 border-gold">
            <User className="w-5 h-5 text-gold" />
            <div className="hidden sm:flex flex-col text-right truncate">
              <p className="text-xs font-semibold text-foreground truncate">{username}</p>
              <p className="text-[10px] text-muted-foreground truncate">ID: {userId}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-48 bg-[#1e1e3a] rounded-lg shadow-lg border border-border py-2 z-50">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/profile"
                    className={`block px-4 py-2 text-sm text-foreground ${
                      active ? "bg-[#2a2a40]" : ""
                    }`}
                  >
                    Perfil
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => alert("Logout")} 
                    className={`w-full text-left px-4 py-2 text-sm text-red-500 font-semibold ${
                      active ? "bg-[#2a2a40]" : ""
                    }`}
                  >
                    Sair
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </header>
  );
}