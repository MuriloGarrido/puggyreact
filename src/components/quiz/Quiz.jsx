import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QuizPergunta from "./QuizPergunta";
import QuizResultado from "./QuizResultado";
import api from "../../services/Api";
import "../../styles/style.css";

export default function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();

  const quiz = location.state?.quizData;

  const [perguntaAtual, setPerguntaAtual] = useState(0);

  // Agora salvamos por ID da pergunta
  // respostas = { [pergunta_id]: alternativa_id }
  const [respostas, setRespostas] = useState({});

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

  // Selecionar resposta usando ID
  const handleSelecionarOpcao = (alternativaID) => {
    const perguntaID = quiz.perguntas[perguntaAtual].id;

    setRespostas((r) => ({
      ...r,
      [perguntaID]: alternativaID,
    }));
  };

  // Enviar mantendo compatibilidade com o backend
  const enviarQuiz = async () => {
    setLoading(true);
    try {
      // Converter respostas por ID → ARRAY NA ORDEM DAS PERGUNTAS
      const respostasOrdenadas = quiz.perguntas.map((p) => {
        return respostas[p.id] ?? null;
      });

      console.log(respostasOrdenadas)

      const res = await api.post("/quiz/submit", {
        quiz_id: quiz.id,
        respostas: respostasOrdenadas, // ← compatível com seu backend
      });

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
      enviarQuiz();
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
  const perguntaID = pergunta.id;

  return (
    <div className="container-quiz">
      <div className="caixa-quiz">
        <h1 className="titulo-quiz">{quiz.tema}</h1>

        <div className="contador-pergunta">
          Pergunta {perguntaAtual + 1} de {quiz.perguntas.length}
        </div>

        <QuizPergunta
          pergunta={pergunta}
          respostaSelecionada={respostas[perguntaID]}
          onSelecionar={handleSelecionarOpcao}
        />

        <div className="container-botao">
          <button
            className="botao-quiz"
            onClick={proximaPergunta}
            disabled={respostas[perguntaID] == null || loading}
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
