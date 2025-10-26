import React from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <button className="menu-item" onClick={() => navigate("/slot")}>
        <span className="menu-icon">🎰</span>
        Roleta
      </button>

      <button className="menu-item" onClick={() => navigate("/GuardaRoupa")}>
        <span className="menu-icon">👕</span>
        Guarda Roupa
      </button>
    </div>
  );
}
