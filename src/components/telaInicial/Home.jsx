import React, { useState } from "react";
import "../../styles/style.css";
import { useNavigate } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";
import FaseSeletor from "./FaseSeletor";
import Carteira from "./Carteira";

export default function Index() {
  const [faseAtual, setFaseAtual] = useState(1);
  const fasesMaximas = 5;
  const navigate = useNavigate();

  const dadosFases = {
    1: { titulo: "Conceitos Básicos", descricao: "Poupança, necessidades e orçamento" },
    2: { titulo: "Planejamento Financeiro", descricao: "Reserva de emergência e organização" },
    3: { titulo: "Consumo Consciente", descricao: "Decisões inteligentes de compra" },
    4: { titulo: "Investimentos Básicos", descricao: "Como fazer o dinheiro crescer" },
    5: { titulo: "Empreendedorismo Jovem", descricao: "Criar valor e ganhar dinheiro" },
  };

  const proximaFase = () => {
    if (faseAtual < fasesMaximas) setFaseAtual(faseAtual + 1);
  };

  const faseAnterior = () => {
    if (faseAtual > 1) setFaseAtual(faseAtual - 1);
  };

  const iniciarQuiz = () => {
    navigate("/quiz");
  };

  return (
    <div className="container-principal">
      <Header />

      <div className="layout">
        <Sidebar />

        <div className="conteudo-principal">
          <FaseSeletor
            faseAtual={faseAtual}
            dadosFases={dadosFases}
            proximaFase={proximaFase}
            faseAnterior={faseAnterior}
            iniciarQuiz={iniciarQuiz}
          />
        </div>

        <Carteira pontos={1250} />
      </div>
    </div>
  );
}
