import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const MicrosoftCallback = () => {
  const navigate = useNavigate();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return; // evita execução dupla
    hasRun.current = true;

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const expiresIn = parseInt(params.get("expires_in") || "0", 10);
    const name = params.get("name");
    const email = params.get("email");

    if (token) {
      const expirationTime = new Date().getTime() + expiresIn * 1000;
      localStorage.setItem("token", token);
      localStorage.setItem("token_expiration", expirationTime);
      localStorage.setItem("user_name", name);
      localStorage.setItem("user_email", email);

      navigate("/home");
    } else {
      alert("Erro ao obter token da Microsoft");
      navigate("/");
    }
  }, [navigate]);

  return <div>Entrando com Microsoft...</div>;
};

export default MicrosoftCallback;
