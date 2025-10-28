import React from "react";
import "../../styles/style.css";

export default function FaseSeletor({
  faseAtual,
  dadosFases,
  proximaFase,
  faseAnterior,
  iniciarQuiz,
}) {
  const fase = dadosFases[faseAtual - 1];

  return (
    <div className="seletor-fase">
      <div className="navegacao-fase">
        <button className="botao-seta" onClick={faseAnterior} disabled={faseAtual === 1}>
          ‹
        </button>

        <div className="display-fase">
          <div className="numero-fase">{faseAtual}</div>
          <div className="texto-fase">FASE</div>
          <div className="descricao-fase">{fase.tema}</div>
        </div>

        <button
          className="botao-seta"
          onClick={proximaFase}
          disabled={faseAtual === dadosFases.length}
        >
          ›
        </button>
      </div>

      <button className="botao-iniciar" onClick={iniciarQuiz}>
        COMEÇAR FASE
      </button>
    </div>
  );
}
