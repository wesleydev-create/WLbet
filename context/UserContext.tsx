"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: number;
  email?: string;
  token?: string;
}

interface UserContextProps {
  user: User | null; // null = carregando, guest = id:0
  setUser: (user: User) => void;
  loading: boolean;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
  loading: true,
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null); // null = carregando
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const match = document.cookie.match(/token=([^;]+)/);
    const token = match ? match[1] : null;

    if (!token) {
      // Sem token → usuário guest
      setUser({ id: 0 });
      setLoading(false);
      return;
    }

    fetch("http://localhost:8080/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Token inválido");
        return res.json();
      })
      .then((data) => {
        // data.user ou data direto dependendo do backend
        const fetchedUser = data.user || data;
        setUser({ ...fetchedUser, token });
      })
      .catch((err) => {
        console.error("Erro ao carregar usuário:", err);
        setUser({ id: 0 }); // fallback guest
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para acessar o contexto
export const useUser = () => useContext(UserContext);