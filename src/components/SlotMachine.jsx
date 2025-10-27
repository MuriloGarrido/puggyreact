import React, { useState, useEffect } from "react";
import "../styles/style.css";
import piggyLogo from "../assets/piggy.png";
import api from "../services/Api";

const SlotMachine = () => {
  const [saldo, setSaldo] = useState(0);
  const [aposta, setAposta] = useState(10);
  const [ultimoGanho, setUltimoGanho] = useState(0);
  const [matriz, setMatriz] = useState(
    Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => ({ unicode: "❔" })))
  );

  useEffect(() => {
    const carregarSaldo = async () => {
      try {
        const res = await api.get("/carteira");
        setSaldo(res.data.saldo);
      } catch (error) {
        console.error("Erro ao carregar saldo:", error);
      }
    };
    carregarSaldo();
  }, []);

  const apostar = async () => {
    try {
      const res = await api.post("/roleta", { valor: aposta });
      const data = res.data;
      setMatriz(data.resultado);
      setSaldo(data.saldo_atual);
      setUltimoGanho(data.ganho || 0);
    } catch (error) {
      alert(error.response.data.detail);
    }
  };

  return (
    <div className="slot-machine">
      <div className="headera">
        <img src={piggyLogo} alt="porquinho" className="piggy" />
        <h1>Roletinha</h1>
      </div>
      <div className="reels">
        {matriz.map((linha, i) => (
          <div key={i} className="reel">
            <div className="symbols">
              {linha.map((item, j) => (
                <div key={j} className="symbol">{item.unicode}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="info-container">
        <div className="info-item">
          <span className="info-title">Saldo:</span>
          <span className="info-value">{`R$ ${saldo.toFixed(2)}`}</span>
        </div>
        <div className="info-item">
          <span className="info-title">Último Ganho:</span>
          <span className="info-value">{`R$ ${ultimoGanho.toFixed(2)}`}</span>
        </div>
        <div className="info-item">
          <span className="info-title">Valor Aposta:</span>
          <span className="info-value">{`R$ ${aposta.toFixed(2)}`}</span>
        </div>
      </div>
      <div className="buttons">
        <button className="btn-spin" onClick={apostar}>Investir</button>
        <button
          className="btn-aposta"
          onClick={() => {
            const novoValor = prompt("Digite o valor da aposta:", aposta);
            const valorNum = Number(novoValor);
            if (!isNaN(valorNum) && valorNum > 0) setAposta(valorNum);
          }}
        >
          Alterar Aposta
        </button>
      </div>
    </div>
  );
};

export default SlotMachine;
