import React, { useState } from "react";
import "../styles/autenticacao.css";
import piggyLogo from "../assets/piggy.png";

const Register = ({ gotoLogin }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (senha !== confirmar) {
      alert("As senhas não conferem!");
      return;
    }

    alert(`Registrado com sucesso: ${nome}`);
    gotoLogin();
  };

  return (
    <div className="card register text-center">
      <img src={piggyLogo} alt="logo do porquinho" />
      <h2>Registrar</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group text-start">
          <label>Nome:</label>
          <input
            type="text"
            className="form-control"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="form-group text-start">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group text-start">
          <label>Senha:</label>
          <input
            type="password"
            className="form-control"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <div className="form-group text-start">
          <label>Confirmar Senha:</label>
          <input
            type="password"
            className="form-control"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success btn-block">
          Registrar
        </button>
      </form>
      <p className="mt-3">
        Já tem conta? <a href="#" onClick={gotoLogin}>Login</a>
      </p>
    </div>
  );
};

export default Register;