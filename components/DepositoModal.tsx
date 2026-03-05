"use client";

import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { useUser } from "@/context/UserContext";

interface DepositoResponsiveModalProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

export default function DepositoResponsiveModal({ isOpen, setIsOpen }: DepositoResponsiveModalProps) {
  const { user, addSaldo } = useUser();

  const [valor, setValor] = useState<number | "">("");
  const [metodo, setMetodo] = useState<string>("PIX");
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");

  const LIMITE_MIN = 10;
  const LIMITE_MAX = 5000;

  const handleConfirmar = () => {
    const valorNumber = Number(valor);
    if (isNaN(valorNumber) || valorNumber < LIMITE_MIN || valorNumber > LIMITE_MAX) {
      setErro(`Digite um valor válido entre ${LIMITE_MIN} e ${LIMITE_MAX}`);
      return;
    }
    addSaldo(valorNumber);
    setErro("");
    setSucesso(true);
  };

  const fecharModal = () => {
    setValor("");
    setMetodo("PIX");
    setErro("");
    setSucesso(false);
    setIsOpen(false);
  };

  const adicionarRapido = (v: number) => setValor(v);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={fecharModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-2 sm:p-4 overflow-auto">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="bg-[#111122] rounded-2xl shadow-2xl w-full max-w-4xl sm:max-w-3xl md:max-w-4xl p-4 sm:p-6 md:p-8 border border-gold flex flex-col gap-4 sm:gap-6 md:gap-8 overflow-hidden sm:overflow-auto">
              {/* Header */}
              <div className="flex justify-between items-center border-b border-gold pb-2 sm:pb-4 mb-2 sm:mb-4">
                <Dialog.Title className="text-2xl sm:text-3xl font-extrabold text-gold">
                  Checkout de Depósito
                </Dialog.Title>
                <button onClick={fecharModal} className="text-white hover:text-red-500 transition">
                  <X size={24} className="sm:h-7 sm:w-7" />
                </button>
              </div>

              {!sucesso ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                  {/* Coluna 1: Usuário + Valor */}
                  <div className="flex flex-col gap-4 sm:gap-6">
                    {/* Identificação do usuário */}
                    <div className="bg-[#1e1e3a] p-4 sm:p-6 rounded-xl border border-border flex flex-col gap-1 sm:gap-2">
                      <h3 className="text-white font-bold text-lg sm:text-xl">Identificação do usuário</h3>
                      <p>ID: <span className="font-semibold">{user?.id}</span></p>
                      <p>Email: <span className="font-semibold">{user?.email || "Guest"}</span></p>
                      <p>Saldo atual: <span className="font-bold text-green-500">{user?.saldo ?? 0} moedas</span></p>
                    </div>

                    {/* Valor do depósito */}
                    <div className="bg-[#1e1e3a] p-4 sm:p-6 rounded-xl border border-border flex flex-col gap-2 sm:gap-4">
                      <h3 className="text-white font-bold text-lg sm:text-xl">Valor do depósito</h3>
                      <input
                        type="number"
                        value={valor === "" ? "" : valor}
                        onChange={(e) => setValor(e.target.value === "" ? "" : Number(e.target.value))}
                        className="w-full p-3 sm:p-4 rounded-lg bg-[#2a2a40] text-white border border-gray-500 text-xl sm:text-2xl font-semibold placeholder-gray-400"
                        placeholder={`Digite o valor (${LIMITE_MIN}-${LIMITE_MAX})`}
                      />
                      {erro && <p className="text-red-500 font-semibold text-sm sm:text-base">{erro}</p>}
                      <div className="flex flex-wrap gap-2 sm:gap-3 mt-2">
                        {[50, 100, 200, 500].map((v) => (
                          <button
                            key={v}
                            onClick={() => adicionarRapido(v)}
                            className="flex-1 sm:flex-none sm:w-[48%] py-2 sm:py-3 rounded-lg bg-gold text-black font-bold hover:bg-gold-dark transition text-sm sm:text-base"
                          >
                            +{v}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Coluna 2: Pagamento + Resumo */}
                  <div className="flex flex-col gap-4 sm:gap-6">
                    {/* Método de pagamento */}
                    <div className="bg-[#1e1e3a] p-4 sm:p-6 rounded-xl border border-border flex flex-col gap-2 sm:gap-4">
                      <h3 className="text-white font-bold text-lg sm:text-xl">Método de pagamento</h3>
                      <select
                        value={metodo}
                        onChange={(e) => setMetodo(e.target.value)}
                        className="w-full p-2 sm:p-3 rounded-lg bg-[#2a2a40] text-white border border-gray-500 text-base sm:text-lg"
                      >
                        <option value="PIX">PIX</option>
                        <option value="Cartão">Cartão de Crédito/Débito</option>
                        <option value="Boleto">Boleto Bancário</option>
                        <option value="Transferência">Transferência Bancária</option>
                        <option value="Carteira">Carteira Digital</option>
                      </select>

                      <div className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">
                        {metodo === "PIX" && <p>Chave PIX ou QR Code será gerado (simulado).</p>}
                        {metodo === "Cartão" && <p>Insira número do cartão, validade e CVV (simulado).</p>}
                        {metodo === "Boleto" && <p>O boleto será gerado (simulado).</p>}
                        {metodo === "Transferência" && <p>Instruções de transferência aparecerão (simulado).</p>}
                        {metodo === "Carteira" && <p>Escolha a carteira digital (simulado).</p>}
                      </div>
                    </div>

                    {/* Resumo da transação */}
                    <div className="bg-[#1e1e3a] p-4 sm:p-6 rounded-xl border border-border flex flex-col gap-1 sm:gap-2">
                      <h3 className="text-white font-bold text-lg sm:text-xl">Resumo da transação</h3>
                      <p>Valor total: <span className="font-bold">{valor === "" ? 0 : valor}</span> moedas</p>
                      <p>Taxas aplicáveis: <span className="font-bold">0</span> moedas</p>
                      <p>Crédito estimado: <span className="font-bold">imediato</span></p>
                    </div>

                    {/* Botões */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-end mt-2 sm:mt-4">
                      <button
                        onClick={fecharModal}
                        className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-gray-500 hover:bg-gray-600 text-white font-semibold transition"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handleConfirmar}
                        className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-gold hover:bg-gold-dark text-black font-bold transition"
                      >
                        Confirmar depósito
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center flex flex-col items-center justify-center gap-4 py-8 sm:py-12">
                  <h2 className="text-3xl sm:text-4xl font-bold text-green-500">Depósito Realizado!</h2>
                  <p>Valor adicionado: <span className="font-bold">{valor}</span> moedas</p>
                  <p>ID da transação: <span className="font-bold">TX{Math.floor(Math.random() * 999999)}</span></p>
                  <button
                    onClick={fecharModal}
                    className="px-6 sm:px-8 py-2 sm:py-3 rounded-lg bg-gold hover:bg-gold-dark text-black font-bold transition mt-2 sm:mt-4"
                  >
                    Fechar
                  </button>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}