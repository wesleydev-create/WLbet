"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

interface AuthPageProps {
  API_URL?: string;
}

export default function AuthPage({ API_URL = "http://192.168.0.9:8080/api/auth" }: AuthPageProps) {
  const router = useRouter();
  const { setUser } = useUser();

  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    cpf: "",
    fullName: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validação local de senha
    if (isRegister && form.password !== form.confirmPassword) {
      setError("As senhas não conferem ");
      setLoading(false);
      return;
    }

    try {
      const endpoint = isRegister ? "register" : "login";

      const body = isRegister
        ? {
            email: form.email,
            password: form.password,
            confirmPassword: form.confirmPassword,
            cpf: form.cpf,
            fullName: form.fullName,
          }
        : {
            email: form.email,
            password: form.password,
          };

      const res = await fetch(`${API_URL}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.message || "Erro na autenticação ");
        setLoading(false);
        return;
      }

      const data = await res.json();
      const token = data.token;

      if (!token) {
        setError("Token não recebido ");
        setLoading(false);
        return;
      }

      // Atualiza UserContext
      setUser({ ...data.user, token });

      // Salva token no cookie por 7 dias
      document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 60 * 60}`;

      // Redireciona para home
      router.push("/");
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Erro na autenticação ");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-zinc-900 px-4">
      <div className="w-full max-w-md bg-zinc-800 p-6 rounded-xl shadow-md border border-zinc-700">
        <h1 className="text-2xl font-bold text-yellow-400 text-center mb-2">WLBet</h1>
        <p className="text-center text-zinc-300 mb-4 text-sm">
          {isRegister ? "Crie sua conta" : "Faça login com seu email"}
        </p>

        {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <>
              <Input
                label="Nome Completo"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
              />
              <Input
                label="CPF"
                name="cpf"
                type="text"
                value={form.cpf}
                onChange={handleChange}
                required
              />
            </>
          )}

          <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
          <Input label="Senha" name="password" type="password" value={form.password} onChange={handleChange} required />

          {isRegister && (
            <Input
              label="Confirmar Senha"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-2 rounded font-bold mt-2"
          >
            {loading ? "Carregando..." : isRegister ? "Criar Conta" : "Entrar"}
          </button>
        </form>

        <p className="text-center text-zinc-300 mt-4 text-sm">
          {isRegister ? "Já tem conta?" : "Não tem conta?"}{" "}
          <span onClick={() => setIsRegister(!isRegister)} className="text-yellow-400 cursor-pointer font-bold">
            {isRegister ? "Entrar" : "Criar conta"}
          </span>
        </p>
      </div>
    </div>
  );
}

// Input reutilizável
function Input({ label, name, type = "text", value, onChange, required }: any) {
  return (
    <div>
      <label className="text-zinc-300 text-sm">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full mt-1 p-2 rounded bg-zinc-700 text-white border border-zinc-600"
        required={required}
      />
    </div>
  );
}