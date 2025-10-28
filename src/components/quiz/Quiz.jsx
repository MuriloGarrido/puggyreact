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

  const handleSelecionarOpcao = (indiceOpcao) => {
    const novasRespostas = [...respostas];
    novasRespostas[perguntaAtual] = indiceOpcao;
    setRespostas(novasRespostas);
  };

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

  const proximaPergunta = () => {
    if (perguntaAtual + 1 < quiz.perguntas.length) {
      setPerguntaAtual(perguntaAtual + 1);
    } else {
      enviarQuiz(); // última pergunta -> envia o quiz
    }
  };

  const voltarInicio = () => navigate("/home");

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

  return (
    <div className="container-quiz">
      <div className="caixa-quiz">
        <h1 className="titulo-quiz">{quiz.tema}</h1>

        <div className="contador-pergunta">
          Pergunta {perguntaAtual + 1} de {quiz.perguntas.length}
        </div>

        <QuizPergunta
          pergunta={pergunta}
          respostaSelecionada={respostas[perguntaAtual]}
          onSelecionar={handleSelecionarOpcao}
        />

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
