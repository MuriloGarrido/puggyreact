// QuizPerguntaResultado.jsx
import React from "react";
import "../../styles/style.css";

export default function QuizPerguntaResultado({ perguntaResultado }) {
  const p = perguntaResultado;

  // Exibe o resultado de uma única pergunta do quiz
    return (
    <div className="pergunta-resultado">
        {/* Enunciado da pergunta */}
        <div className="texto-pergunta">{p.pergunta}</div>

        {/* Lista das alternativas */}
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

        {/* Mostra se o usuário acertou ou errou */}
        <div className="status-pergunta">
        {p.acertou ? "✅ Acertou" : "❌ Errou"}
        </div>
    </div>
    );

}
