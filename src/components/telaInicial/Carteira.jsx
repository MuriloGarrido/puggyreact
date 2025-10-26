import React from "react";

export default function Carteira({ pontos }) {
  return (
    <div className="area-pontos">
      <div className="display-pontos">
        <div className="label-pontos">CARTEIRA</div>
        <div className="valor-pontos">
          {pontos}
          <span className="icone-pontos">💰</span>
        </div>
      </div>
    </div>
  );
}
