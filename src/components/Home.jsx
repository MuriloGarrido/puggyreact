import React, { useState, useEffect} from 'react';
import '../styles/style.css';
import SlotMachine from './SlotMachine';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Index() {
  const [faseAtual, setFaseAtual] = useState(1);
  const [saldo, setSaldo] = useState(0);
  const fasesMaximas = 5;
  const navigate = useNavigate();

  const dadosFases = {
    1: { titulo: "Conceitos Básicos", descricao: "Poupança, necessidades e orçamento" },
    2: { titulo: "Planejamento Financeiro", descricao: "Reserva de emergência e organização" },
    3: { titulo: "Consumo Consciente", descricao: "Decisões inteligentes de compra" },
    4: { titulo: "Investimentos Básicos", descricao: "Como fazer o dinheiro crescer" },
    5: { titulo: "Empreendedorismo Jovem", descricao: "Criar valor e ganhar dinheiro" }
  };

    useEffect(() => {
    const fetchSaldo = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:8000/carteira", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSaldo(response.data.saldo);
      } catch (error) {
        console.error("Erro ao buscar saldo:", error);
      }
    };

    fetchSaldo();
  }, []);

  const proximaFase = () => {
    if (faseAtual < fasesMaximas) {
      setFaseAtual(faseAtual + 1);
    }
  };

  const faseAnterior = () => {
    if (faseAtual > 1) {
      setFaseAtual(faseAtual - 1);
    }
  };

  const iniciarQuiz = () => {
    navigate("/quiz");
  };

  const selecionarMenu = (opcao) => {
    alert(`Menu ${opcao} selecionado!`);
  };

  return (
    <div className="container-principal">
      <div className="header">
        <div className="logo">
          <span className="logo-icon">🐷</span> PiggyUp
        </div>
      </div>

      <div className="layout">
        {/* Sidebar */}
        <div className="sidebar">
          <button className="menu-item" onClick={() => navigate("/slot")}>
            <span className="menu-icon">🎰</span>
            Roleta
          </button>
          <button className="menu-item" onClick={() => navigate('/GuardaRoupa')}>
            <span className="menu-icon">👕</span>
            Guarda Roupa
          </button>
        </div>

        {/* Main Content */}
        <div className="conteudo-principal">
          <div className="seletor-fase">
            <div className="navegacao-fase">
              <button className="botao-seta" onClick={faseAnterior}>
                ‹
              </button>
              
              <div className="display-fase">
                <div className="numero-fase">{faseAtual}</div>
                <div className="texto-fase">FASE</div>
                <div className="descricao-fase">{dadosFases[faseAtual].titulo}</div>
                <div className="topico-fase">{dadosFases[faseAtual].descricao}</div>
              </div>
              
              <button className="botao-seta" onClick={proximaFase}>
                ›
              </button>
            </div>
            
            <button className="botao-iniciar" onClick={iniciarQuiz}>
              COMEÇAR FASE
            </button>
          </div>
        </div>

        {/* Points Area */}
        <div className="area-pontos">
          <div className="display-pontos">
            <div className="label-pontos">CARTEIRA</div>
            <div className="valor-pontos">
              {saldo}<span className="icone-pontos">💰</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}