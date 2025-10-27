import React, { useState } from "react";
import "../styles/style.css";
import piggyLogo from "../assets/piggy.png";
import axios from "axios";

import Home from "./telaInicial/Home";

import { useNavigate } from "react-router-dom";

const Login = ({ gotoRegister }) => {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/login", {
        email,
        senha,
      });

      const token = response.data.token;
      const expiresIn = response.data.expires_in * 1000; //ms
      const expirationTime = new Date().getTime() + expiresIn;

      localStorage.setItem("token", token);
      localStorage.setItem("token_expiration", expirationTime);
      navigate("/home")

      
    } catch (error) {
      alert(error.response.data.detail);
    }
  };

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

