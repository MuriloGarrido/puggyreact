import React from "react";
import DisplayFase from "./DisplayFase";

export default function FaseSeletor({ faseAtual, dadosFases, proximaFase, faseAnterior, iniciarQuiz }) {
  return (
    <div className="seletor-fase">
      <div className="navegacao-fase">
        <button className="botao-seta" onClick={faseAnterior}>‹</button>

        <DisplayFase
          fase={faseAtual}
          titulo={dadosFases[faseAtual].titulo}
          descricao={dadosFases[faseAtual].descricao}
        />

        <button className="botao-seta" onClick={proximaFase}>›</button>
      </div>

      <button className="botao-iniciar" onClick={iniciarQuiz}>
        COMEÇAR FASE
      </button>
    </div>
  );
}
