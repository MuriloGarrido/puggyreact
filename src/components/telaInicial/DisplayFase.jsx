import React from "react";

export default function DisplayFase({ fase, titulo, descricao }) {
  return (
    <div className="display-fase">
      <div className="numero-fase">{fase}</div>
      <div className="texto-fase">FASE</div>
      <div className="descricao-fase">{titulo}</div>
      <div className="topico-fase">{descricao}</div>
    </div>
  );
}
