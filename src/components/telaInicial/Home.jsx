import React, { useState, useEffect } from "react";
import "../../styles/style.css";
import { useNavigate } from "react-router-dom";
import api from "../../services/Api";
import Header from "./Header";
import Sidebar from "./Sidebar";
import FaseSeletor from "./FaseSeletor";
import Carteira from "./Carteira";

export default function Index() {
  const [faseAtual, setFaseAtual] = useState(1);
  const [fases, setFases] = useState([]);
  const navigate = useNavigate();
  const [saldo, setSaldo] = useState(0); 

  //mostrar o valor da carteira
  useEffect(() => {
    async function carregarCarteira() {
      try {
        const res = await api.get("/carteira");
        console.log(res.data.saldo)
        setSaldo(res.data.saldo);
      } catch (error) {
        alert(error);
        setSaldo(0);
      }
    }

    carregarCarteira();
  }, []); 

  // Buscar fases da API ao montar o componente
  useEffect(() => {
    const carregarFases = async () => {
      try {
        const res = await api.get("/quiz/temas");
        console.log("res.data:", res.data);
        setFases(res.data);
      } catch (error) {
        console.error("Erro ao carregar fases:", error);
      }
    };

    carregarFases();
  }, []);

  const proximaFase = () => {
    if (faseAtual < fases.length) setFaseAtual(faseAtual + 1);
  };

  const faseAnterior = () => {
    if (faseAtual > 1) setFaseAtual(faseAtual - 1);
  };

  //manda o id do quiz pro servidor e o inicia
  const iniciarQuiz = async () => {
    const fase = fases[faseAtual - 1];
    if (!fase) return;

    try {
      const res = await api.get(`/quiz/${fase.id}`);
      console.log("Quiz recebido:", res.data);

      // Envia os dados via navigate
      navigate("/quiz", { state: { quizData: res.data } });
    } catch (error) {
      console.error("Erro ao iniciar quiz:", error);
      alert("Erro ao carregar o quiz. Tente novamente.");
    }
  };

  // Estrutura principal da página do quiz
  return (
    <div className="container-principal">
      {/* Cabeçalho */}
      <Header />

      <div className="layout">
        {/* Menu lateral */}
        <Sidebar />

        {/* Área central com o seletor de fase */}
        <div className="conteudo-principal">
          {fases.length > 0 ? (
            <FaseSeletor
              faseAtual={faseAtual}
              dadosFases={fases}
              proximaFase={proximaFase}
              faseAnterior={faseAnterior}
              iniciarQuiz={iniciarQuiz}
            />
          ) : (
            <p>Carregando fases...</p> // Mensagem enquanto carrega os dados
          )}
        </div>

        {/* Exibe o saldo do usuário */}
        <Carteira pontos={saldo} />
      </div>
    </div>
  );

}
