"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectPath?: string; // rota para login
}

export default function ProtectedRoute({ children, redirectPath = "/login" }: ProtectedRouteProps) {
  const { user } = useUser();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Se user ainda não foi carregado do contexto, espera
    if (!user) return;

    // Usuário não logado (id 0 ou sem token)
    if (!user.id || !user.token) {
      router.replace(redirectPath);
    } else {
      setAuthorized(true); // usuário logado
    }

    setChecking(false);
  }, [user, router, redirectPath]);

  // Evita renderizar conteúdo antes de verificar usuário
  if (checking) return null;

  if (!authorized) return null;

  return <>{children}</>;
}