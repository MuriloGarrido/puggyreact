import React from "react";
import "../../styles/style.css";

export default function QuizResultado({ resultado, voltarInicio }) {
  if (!resultado) return null;

  const { tema, resultado: perguntasResultado, todas_corretas } = resultado;

  return (
    <div className="container-quiz">
      <div className="tela-resultado">
        <h2 className="titulo-resultado">{tema}</h2>

        <div className="pontuacao-geral">
          {perguntasResultado.filter(p => p.acertou).length} / {perguntasResultado.length} corretas
        </div>

        {todas_corretas && (
          <div className="mensagem-resultado">Parabéns! Você acertou todas as perguntas!</div>
        )}

        <div className="resultado-detalhado">
          {perguntasResultado.map((p, index) => (
            <div key={index} className="pergunta-resultado">
              <div className="texto-pergunta">{p.pergunta}</div>
              <ul className="alternativas-resultado">
                {p.alternativas.map((alt, i) => {
                  let classe = "opcao-normal";
                  if (i === p.resposta_enviada && i === p.resposta_correta) classe = "opcao-correta";
                  else if (i === p.resposta_enviada && i !== p.resposta_correta) classe = "opcao-incorreta";
                  else if (i === p.resposta_correta) classe = "opcao-correta-desabilitada";

                  return (
                    <li key={i} className={`opcao ${classe}`}>
                      {alt}
                    </li>
                  );
                })}
              </ul>
              <div className="status-pergunta">
                {p.acertou ? "✅ Acertou" : "❌ Errou"}
              </div>
            </div>
          ))}
        </div>

        <button className="botao-voltar" onClick={voltarInicio}>
          VOLTAR AO INÍCIO
        </button>
      </div>
    </div>
  );
}
