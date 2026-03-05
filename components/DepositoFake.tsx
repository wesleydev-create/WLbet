"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";

export default function DepositoFake() {
  const { addSaldo } = useUser();
  const [valor, setValor] = useState<number>(0);

  const handleDeposito = () => {
    if (valor <= 0) return alert("Digite um valor válido");
    addSaldo(valor);
    alert(`Depósito de ${valor} moedas realizado!`);
    setValor(0); // limpa input
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <h3>Adicionar saldo (fake)</h3>
      <input
        type="number"
        placeholder="Digite o valor"
        value={valor}
        onChange={(e) => setValor(Number(e.target.value))}
        style={{ padding: "0.5rem", marginRight: "0.5rem", width: "120px" }}
      />
      <button
        onClick={handleDeposito}
        style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
      >
        Depositar
      </button>

      <div style={{ marginTop: "0.5rem" }}>
        <button onClick={() => addSaldo(50)} style={{ marginRight: "0.5rem" }}>
          +50 moedas
        </button>
        <button onClick={() => addSaldo(100)} style={{ marginRight: "0.5rem" }}>
          +100 moedas
        </button>
        <button onClick={() => addSaldo(500)}>
          +500 moedas
        </button>
      </div>
    </div>
  );
}