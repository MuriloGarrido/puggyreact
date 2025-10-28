import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QuizPergunta from "./QuizPergunta";
import QuizResultado from "./QuizResultado";
import api from "../../services/Api";
import "../../styles/style.css";

export default function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();

  // Dados do quiz recebidos via navigate
  const quiz = location.state?.quizData;

  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [respostas, setRespostas] = useState([]);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [resultadoQuiz, setResultadoQuiz] = useState(null);
  const [loading, setLoading] = useState(false);

  //se deu ruim pra carregar o quiz pode voltar
  if (!quiz) {
    return (
      <div className="container-quiz">
        <h2>Nenhum quiz selecionado.</h2>
        <button className="botao-voltar" onClick={() => navigate("/home")}>
          VOLTAR
        </button>
      </div>
    );
  }

  //seleção de alternativa
  const handleSelecionarOpcao = (indiceOpcao) => {
    const novasRespostas = [...respostas];
    novasRespostas[perguntaAtual] = indiceOpcao;
    setRespostas(novasRespostas);
  };

  //finaliza o quiz enviando as respostas pro servidor
  const enviarQuiz = async () => {
    setLoading(true);
    try {
      const res = await api.post("/quiz/submit", {
        quiz_id: quiz.id,
        respostas: respostas,
      });
      console.log("Resultado do quiz:", res.data);

      setResultadoQuiz(res.data);
      setMostrarResultado(true);
    } catch (error) {
      console.error("Erro ao enviar quiz:", error);
      alert("Erro ao enviar o quiz. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  //ação de próxima pergunta após responder
  const proximaPergunta = () => {
    if (perguntaAtual + 1 < quiz.perguntas.length) {
      setPerguntaAtual(perguntaAtual + 1);
    } else {
      enviarQuiz(); // última pergunta -> envia o quiz
    }
  };

  //voltar a tela inicial
  const voltarInicio = () => navigate("/home");

  //mostra o resultado do quiz
  if (mostrarResultado && resultadoQuiz) {
    return (
      <QuizResultado
        quiz={quiz}
        resultado={resultadoQuiz}
        voltarInicio={voltarInicio}
      />
    );
  }

  const pergunta = quiz.perguntas[perguntaAtual];

 // Estrutura principal do quiz
  return (
    <div className="container-quiz">
      <div className="caixa-quiz">
        {/* Título e contador de perguntas */}
        <h1 className="titulo-quiz">{quiz.tema}</h1>
        <div className="contador-pergunta">
          Pergunta {perguntaAtual + 1} de {quiz.perguntas.length}
        </div>

        {/* Componente da pergunta atual */}
        <QuizPergunta
          pergunta={pergunta}
          respostaSelecionada={respostas[perguntaAtual]}
          onSelecionar={handleSelecionarOpcao}
        />

        {/* Botão de próxima ou finalizar */}
        <div className="container-botao">
          <button
            className="botao-quiz"
            onClick={proximaPergunta}
            disabled={respostas[perguntaAtual] == null || loading}
          >
            {loading
              ? "ENVIANDO..."
              : perguntaAtual === quiz.perguntas.length - 1
              ? "FINALIZAR"
              : "PRÓXIMA"}
          </button>
        </div>
      </div>
    </div>
  );

}
