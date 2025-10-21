import { useState } from "react";
import Porquinho from "./Porquinho";
import Chapeus from "./Chapeus";
import "../../styles/style.css";
import musica from "../../assets/Musica.mp3";
import semChapeu from "../../assets/Sem_Chapeu.png";
import militar from "../../assets/Militar.png";
import detetive from "../../assets/Detetive.png";
import chaves from "../../assets/Chaves.png";



export default function GuardaRoupa() {
  const [saldo, setSaldo] = useState(100);
  const [purchasedHats, setPurchasedHats] = useState([semChapeu]);
  const [currentHat, setCurrentHat] = useState(semChapeu);

  const hats = [
    { name: "Sem Chapéu", file: semChapeu, price: 0 },
    { name: "Militar", file: militar, price: 50 },
    { name: "Detetive", file: detetive, price: 30 },
    { name: "Chaves", file: chaves, price: 20 },
  ];

  function buyOrSelectHat(hat) {
    if (purchasedHats.includes(hat.file)) {
      setCurrentHat(hat.file);
    } else {
      if (saldo >= hat.price) {
        setSaldo(saldo - hat.price);
        setPurchasedHats([...purchasedHats, hat.file]);
        setCurrentHat(hat.file);
        alert("Chapéu comprado!");
      } else {
        alert("Saldo insuficiente!");
      }
    }
  }

  return (
    <div>
      {/* Header */}
      <header className="app-header">
        <button className="back-button" onClick={() => window.history.back()}>
          ←
        </button>
        <h1 className="header-title">Guarda-Roupa</h1>
        <div className="saldo">
          Saldo: R$ <span>{saldo.toFixed(2)}</span>
        </div>
      </header>

      {/* Música */}
      <audio src={musica} autoPlay loop />


      {/* Personagem */}
      <Porquinho currentHat={currentHat} />

      {/* Lista de Chapéus */}
      <Chapeus
        hats={hats}
        purchasedHats={purchasedHats}
        onSelect={buyOrSelectHat}
      />
    </div>
  );
}