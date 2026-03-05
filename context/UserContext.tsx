"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: number;
  email?: string;
  token?: string;
  saldo: number;
}

interface UserContextProps {
  user: User | null;              // null = carregando
  setUser: (user: User) => void;
  loading: boolean;
  login: (token?: string, email?: string) => void;
  logout: () => void;
  updateSaldo: (novoSaldo: number) => void;
  addSaldo: (valor: number) => void;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
  loading: true,
  login: () => {},
  logout: () => {},
  updateSaldo: () => {},
  addSaldo: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Carrega usuário do localStorage ao iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      const guest: User = { id: 0, saldo: 100 }; // saldo inicial guest
      setUser(guest);
      localStorage.setItem("user", JSON.stringify(guest));
    }
    setLoading(false);
  }, []);

  // Salva usuário no contexto e no localStorage
  const saveUser = (u: User) => {
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
  };

  // Login (simulado ou real)
  const login = (token?: string, email?: string) => {
    const newUser: User = {
      id: token ? 1 : 0, // id 1 para teste, guest = 0
      email: email || "",
      token,
      saldo: user?.saldo ?? 100,
    };
    saveUser(newUser);
  };

  // Logout
  const logout = () => {
    const guest: User = { id: 0, saldo: 100 };
    saveUser(guest);
  };

  // Atualiza saldo diretamente
  const updateSaldo = (novoSaldo: number) => {
    if (!user) return;
    saveUser({ ...user, saldo: novoSaldo });
  };

  // Adiciona saldo (depósito fake)
  const addSaldo = (valor: number) => {
    if (!user) return;
    const novoSaldo = user.saldo + valor;
    saveUser({ ...user, saldo: novoSaldo });
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, loading, login, logout, updateSaldo, addSaldo }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Hook para acessar facilmente o contexto
export const useUser = () => useContext(UserContext);