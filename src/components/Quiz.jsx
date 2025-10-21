import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/style.css';

export default function Quiz() {
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [respondida, setRespondida] = useState(false);
  const navigate = useNavigate();
    
  const perguntas = [
    {
      pergunta: "O que é uma reserva de emergência?",
      opcoes: [
        "Dinheiro guardado para comprar coisas que desejo",
        "Dinheiro separado para situações imprevistas e urgentes",
        "Dinheiro investido em ações",
        "Dinheiro para pagar contas mensais"
      ],
      correta: 1
    },
    {
      pergunta: "Qual a diferença entre NECESSIDADE e DESEJO?",
      opcoes: [
        "Necessidade é o que queremos, desejo é o que precisamos",
        "Não há diferença entre eles",
        "Necessidade é essencial para viver, desejo é algo que gostaríamos de ter",
        "Necessidade é mais cara que desejo"
      ],
      correta: 2
    },
    {
      pergunta: "Por que é importante fazer um orçamento?",
      opcoes: [
        "Para impressionar os amigos",
        "Para controlar gastos e planejar o uso do dinheiro",
        "Porque é obrigatório por lei",
        "Para poder gastar mais dinheiro"
      ],
      correta: 1
    }
  ];

  const selecionarOpcao = (indice) => {
    if (!respondida) {
      setOpcaoSelecionada(indice);
    }
  };

  const confirmarResposta = () => {
    if (opcaoSelecionada === null) return;
    
    setRespondida(true);
    
    if (opcaoSelecionada === perguntas[perguntaAtual].correta) {
      setPontuacao(pontuacao + 1);
    }
  };

  const proximaPergunta = () => {
    if (perguntaAtual + 1 < perguntas.length) {
      setPerguntaAtual(perguntaAtual + 1);
      setOpcaoSelecionada(null);
      setRespondida(false);
    } else {
      setMostrarResultado(true);
    }
  };

  const voltarInicio = () => {
    navigate("/home");
  };

  const obterClasseOpcao = (indice) => {
    if (!respondida) {
      if (indice === opcaoSelecionada) {
        return 'opcao opcao-selecionada';
      }
      return 'opcao opcao-normal';
    } else {
      if (indice === perguntas[perguntaAtual].correta) {
        return 'opcao opcao-correta opcao-desabilitada';
      } else if (indice === opcaoSelecionada && indice !== perguntas[perguntaAtual].correta) {
        return 'opcao opcao-incorreta opcao-desabilitada';
      }
      return 'opcao opcao-normal opcao-desabilitada';
    }
  };

  if (mostrarResultado) {
    let tituloResultado = "";
    let mensagemResultado = "";
    
    if (pontuacao === perguntas.length) {
      tituloResultado = "Excelente!";
      mensagemResultado = "Parabéns! Você acertou todas as perguntas.";
    } else if (pontuacao >= 2) {
      tituloResultado = "Muito Bem!";
      mensagemResultado = "Bom trabalho! Continue estudando.";
    } else {
      tituloResultado = "Continue Estudando!";
      mensagemResultado = "Continue praticando !";
    }

    return (
      <div className="container-quiz">
        <div className="tela-resultado">
          <h2 className="titulo-resultado">{tituloResultado}</h2>
          <div className="pontuacao">
            {pontuacao}/{perguntas.length}
          </div>
          <div className="mensagem-resultado">{mensagemResultado}</div>
          <button className="botao-voltar" onClick={voltarInicio}>
            VOLTAR AO INÍCIO
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-quiz">
      <div className="caixa-quiz">
        <h1 className="titulo-quiz">Aula 1 - Conceitos Básicos</h1>
        
        <div className="contador-pergunta">
          Pergunta {perguntaAtual + 1} de {perguntas.length}
        </div>
        
        <div className="texto-pergunta">
          {perguntas[perguntaAtual].pergunta}
        </div>
        
        <div className="opcoes">
          {perguntas[perguntaAtual].opcoes.map((opcao, indice) => (
            <div
              key={indice}
              onClick={() => selecionarOpcao(indice)}
              className={obterClasseOpcao(indice)}
            >
              {opcao}
            </div>
          ))}
        </div>
        
        <div className="container-botao">
          {!respondida ? (
            <button 
              className="botao-quiz"
              onClick={confirmarResposta}
              disabled={opcaoSelecionada === null}
            >
              CONFIRMAR
            </button>
          ) : (
            <button 
              className="botao-quiz"
              onClick={proximaPergunta}
            >
              {perguntaAtual === perguntas.length - 1 ? 'VER RESULTADO' : 'PRÓXIMA'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
