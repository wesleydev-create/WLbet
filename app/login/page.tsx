"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();

  // estado de login ou registro
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // dados do usuário
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");

  const API_URL = "http://localhost:8080/api/auth";

  // função que envia os dados
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    // verificação de senha só no registro
    if (isRegister && password !== confirmPassword) {
      setError("As senhas não conferem 😢");
      setLoading(false);
      return;
    }

    const endpoint = isRegister ? "/register" : "/login";

    // preparando os dados para enviar
    const bodyData = isRegister
      ? { email, password, fullName, phone, birthDate, gender }
      : { email, password };

    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Erro na autenticação 😵");
        setLoading(false);
        return;
      }

      // salvando token (bem básico, inseguro)
      document.cookie = `token=${data.token}; path=/`;

      // redirecionando
      router.push("/");
    } catch (err) {
      setError("Erro na requisição 😬");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-zinc-900 px-4">
      <div className="w-full max-w-md bg-zinc-800 p-6 rounded-xl shadow-md border border-zinc-700">
        {/* título */}
        <h1 className="text-2xl font-bold text-yellow-400 text-center mb-2">WLBet</h1>
        <p className="text-center text-zinc-300 mb-4 text-sm">
          {isRegister ? "Preencha seus dados para criar a conta" : "Faça login com seu email"}
        </p>

        {/* mensagem de erro */}
        {error && (
          <p className="text-red-500 mb-4 text-sm text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* nome completo */}
          {isRegister && (
            <div>
              <label className="text-zinc-300 text-sm">Nome Completo</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full mt-1 p-2 rounded bg-zinc-700 text-white border border-zinc-600"
                placeholder="Ex: João Silva"
                required
              />
            </div>
          )}

          {/* email */}
          <div>
            <label className="text-zinc-300 text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 rounded bg-zinc-700 text-white border border-zinc-600"
              placeholder="email@exemplo.com"
              required
            />
          </div>

          {/* senha */}
          <div>
            <label className="text-zinc-300 text-sm">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 rounded bg-zinc-700 text-white border border-zinc-600"
              placeholder="Sua senha"
              required
            />
          </div>

          {/* confirm senha */}
          {isRegister && (
            <div>
              <label className="text-zinc-300 text-sm">Confirmar Senha</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full mt-1 p-2 rounded bg-zinc-700 text-white border border-zinc-600"
                placeholder="Repita a senha"
                required
              />
            </div>
          )}

          {/* telefone */}
          {isRegister && (
            <div>
              <label className="text-zinc-300 text-sm">Telefone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full mt-1 p-2 rounded bg-zinc-700 text-white border border-zinc-600"
                placeholder="(99) 99999-9999"
              />
            </div>
          )}

          {/* data de nascimento */}
          {isRegister && (
            <div>
              <label className="text-zinc-300 text-sm">Data de Nascimento</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full mt-1 p-2 rounded bg-zinc-700 text-white border border-zinc-600"
                required
              />
            </div>
          )}

          {/* gênero */}
          {isRegister && (
            <div>
              <label className="text-zinc-300 text-sm">Gênero</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full mt-1 p-2 rounded bg-zinc-700 text-white border border-zinc-600"
                required
              >
                <option value="">Selecione</option>
                <option value="male">Masculino</option>
                <option value="female">Feminino</option>
                <option value="other">Outro</option>
                <option value="no-info">Prefiro não informar</option>
              </select>
            </div>
          )}

          {/* botão */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-2 rounded font-bold mt-2"
          >
            {loading ? "Carregando..." : isRegister ? "Criar Conta" : "Entrar"}
          </button>
        </form>

        {/* link para alternar */}
        <p className="text-center text-zinc-300 mt-4 text-sm">
          {isRegister ? "Já tem conta?" : "Não tem conta?"}{" "}
          <span
            onClick={() => setIsRegister(!isRegister)}
            className="text-yellow-400 cursor-pointer font-bold"
          >
            {isRegister ? "Entrar" : "Criar conta"}
          </span>
        </p>

        {/* pequena dica extra */}
        {isRegister && (
          <p className="text-zinc-400 text-xs mt-2 text-center">
            ⚠️ Seus dados devem ser reais para não ter problemas depois.
          </p>
        )}
      </div>
    </div>
  );
}