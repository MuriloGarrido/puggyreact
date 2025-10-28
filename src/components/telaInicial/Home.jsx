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




  return (
    <div className="container-principal">
      <Header />

      <div className="layout">
        <Sidebar />

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
            <p>Carregando fases...</p>
          )}

        </div>

        <Carteira pontos={1250} />
      </div>
    </div>
  );
}
