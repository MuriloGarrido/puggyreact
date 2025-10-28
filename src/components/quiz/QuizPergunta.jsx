import React from "react";

export default function QuizPergunta({
  pergunta,
  respostaSelecionada,
  onSelecionar,
}) {
  if (!pergunta || !pergunta.alternativas) return null;

  // Exibe a pergunta e suas alternativas
  return (
    <div>
      {/* Texto da pergunta */}
      <div className="texto-pergunta">{pergunta.enunciado}</div>

      {/* Lista de opções */}
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
