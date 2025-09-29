import React, { useState } from "react";
import "../styles/roleta.css";
import piggyLogo from "../assets/piggy.png";

const symbolsDict = ["🍒","🍋","🍊","🍇","🍉","⭐","🔔","💎","7️⃣"];

const SlotMachine = () => {
  const [saldo, setSaldo] = useState(100);
  const [aposta, setAposta] = useState(10);
  const [ultimoGanho, setUltimoGanho] = useState(0);
  const [matriz, setMatriz] = useState(
    Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => 0))
  );

  const apostar = () => {
    if (saldo < aposta) {
      alert("Saldo insuficiente!");
      return;
    }

    const novaMatriz = Array.from({ length: 3 }, () =>
      Array.from({ length: 3 }, () => Math.floor(Math.random() * 9))
    );

    let ganho = 0;
    if (novaMatriz[1][0] === novaMatriz[1][1] && novaMatriz[1][1] === novaMatriz[1][2]) {
      ganho = aposta * 2;
    }

    setSaldo(saldo - aposta + ganho);
    setUltimoGanho(ganho);
    setMatriz(novaMatriz);
  };

  return (
    <div className="slot-machine">

      <div className="headera">
        <img src={piggyLogo} alt="porquinho" className="piggy" />
        <h1>Roletinha</h1>
      </div>

      <div className="reels">
        {matriz.map((coluna, i) => (
          <div key={i} className="reel">
            <div className="symbols">
              {coluna.map((num, j) => (
                <div key={j} className="symbol">{symbolsDict[num]}</div>
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
