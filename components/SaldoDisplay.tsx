"use client";

import { useUser } from "@/context/UserContext";

export default function SaldoDisplay() {
  const { user } = useUser();

  return (
    <div style={{ marginBottom: "1rem" }}>
      <h2>Saldo atual: {user?.saldo ?? 0} moedas</h2>
    </div>
  );
}