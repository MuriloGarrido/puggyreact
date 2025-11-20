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
        {pergunta.alternativas.map((opcao) => (
          <div
            key={opcao.id}
            className={`opcao ${
              respostaSelecionada === opcao.id
                ? "opcao-selecionada"
                : "opcao-normal"
            }`}
            onClick={() => onSelecionar(opcao.id)}
          >
            {opcao.texto}
          </div>
        ))}
      </div>
    </div>
  );
}
