import porquinho from "../assets/porquinho.png";
import "../styles/guardaRoupa.css";

export default function Porquinho({ currentHat }) {
  return (
    <div className="character-container">
      <img src={currentHat} alt="Chapéu" className="hat" />
      <img src={porquinho} alt="Porco" className="character" />
    </div>
  );
}