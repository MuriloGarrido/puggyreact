import React, { useState } from "react";
import "../styles/autenticacao.css";
import piggyLogo from "../assets/piggy.png";

import { useNavigate } from "react-router-dom";

const Login = ({ gotoRegister }) => {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === "murilo@gmail.com" && senha === "123") {
            alert("Login realizado com sucesso!");
            navigate("/slot");
        } else {
            alert("Erro: Email ou senha incorretos!");
        }
    }

      return (
    <div className="card login text-center">
      <img src={piggyLogo} alt="logo do porquinho" />
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary btn-block">
          Entrar
        </button>
      </form>
      <p className="mt-3">
        Não tem conta? <a href="#" onClick={gotoRegister}>Registrar</a>
      </p>
    </div>
  );
}

export default Login;

