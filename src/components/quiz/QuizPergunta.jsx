import React from "react";

export default function QuizPergunta({
  pergunta,
  respostaSelecionada,
  onSelecionar,
}) {
  if (!pergunta || !pergunta.alternativas) return null;

  return (
    <div>
      <div className="texto-pergunta">{pergunta.enunciado}</div>

      <div className="opcoes">
        {pergunta.alternativas.map((opcao, indice) => (
          <div
            key={indice}
            className={`opcao ${
              respostaSelecionada === indice
                ? "opcao-selecionada"
                : "opcao-normal"
            }`}
            onClick={() => onSelecionar(indice)}
          >
            {opcao}
          </div>
        ))}
      </div>
    </div>
  );
}
