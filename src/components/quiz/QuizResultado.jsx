import React from "react";
import "../../styles/style.css";
import QuizPerguntaResultado from "./QuizPerguntaResultado";

export default function QuizResultado({ resultado, voltarInicio }) {
  if (!resultado) return null;

  const { tema, resultado: perguntasResultado, todas_corretas } = resultado;

  // Tela de resultado geral do quiz
  return (
    <div className="container-quiz">
      <div className="tela-resultado">
        {/* Exibe o tema do quiz */}
        <h2 className="titulo-resultado">{tema}</h2>

        {/* Mostra a pontuação total */}
        <div className="pontuacao-geral">
          {perguntasResultado.filter(p => p.acertou).length} / {perguntasResultado.length} corretas
        </div>

        {/* Mensagem se todas as respostas estiverem corretas */}
        {todas_corretas && (
          <div className="mensagem-resultado">Parabéns! Você acertou todas as perguntas!</div>
        )}

        {/* Lista resposta de cada pergunta */}
        <div className="resultado-detalhado">
          {perguntasResultado.map((p, index) => (
            <QuizPerguntaResultado key={index} perguntaResultado={p} />
          ))}
        </div>

        {/* Botão para voltar ao inicio */}
        <button className="botao-voltar" onClick={voltarInicio}>
          VOLTAR AO INÍCIO
        </button>
      </div>
    </div>
  );


}
