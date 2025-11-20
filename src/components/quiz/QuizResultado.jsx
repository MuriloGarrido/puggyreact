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
          {perguntasResultado.filter((p) => p.acertou).length} /{" "}
          {perguntasResultado.length} corretas
        </div>

        {todas_corretas && (
          <div className="mensagem-resultado">
            Parabéns! Você acertou todas as perguntas!
          </div>
        )}

        <div className="resultado-detalhado">
          {perguntasResultado.map((p, index) => (
            <div key={index} className="pergunta-resultado">
              <div className="texto-pergunta">{p.pergunta}</div>

              <ul className="alternativas-resultado">
                {p.alternativas.map((alt) => {
                  // classes baseadas no ID da alternativa
                  let classe = "opcao-normal";

                  const id = alt.id;
                  const enviada = p.resposta_enviada;
                  const correta = p.resposta_correta;

                  if (id === enviada && id === correta)
                    classe = "opcao-correta";
                  else if (id === enviada && id !== correta)
                    classe = "opcao-incorreta";
                  else if (id === correta)
                    classe = "opcao-correta-desabilitada";

                  return (
                    <li key={id} className={`opcao ${classe}`}>
                      {alt.texto}
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
