import { useState, useEffect } from "react";
import Porquinho from "./Porquinho";
import Chapeus from "./Chapeus";
import "../../styles/style.css";
import musica from "../../assets/Musica.mp3";
import semChapeu from "../../assets/Sem_Chapeu.png";
import militar from "../../assets/Militar.png";
import detetive from "../../assets/Detetive.png";
import chaves from "../../assets/Chaves.png";
import api from "../../services/Api";

export default function GuardaRoupa() {
  const [saldo, setSaldo] = useState(0);
  const [hats, setHats] = useState([]);
  const [purchasedHats, setPurchasedHats] = useState(["semChapeu"]);
  const [currentHat, setCurrentHat] = useState("semChapeu");

  // Mapa de aliases → imagens
  const imagens = {
    semChapeu,
    militar,
    detetive,
    chaves,
  };

  const atualizarSaldo = async () => {
    try {
      const response = await api.get("/carteira")

      setSaldo(response.data.saldo);
      return response.data.saldo; // retorna o saldo para usar imediatamente
    } catch (error) {
      alert(error.response?.data?.detail || "Erro ao buscar saldo");
      return saldo; // retorna o saldo atual caso haja erro
    }
  };



  const obterTodosChapeus = async () => {
    try {
      const response = await api.get("/vestuario")

      // Armazena o alias (arquivo) e o nome/valor como vem da API
      setHats(response.data.vestuarios);
    } catch (error) {
      alert(error.response?.data?.detail || "Erro ao buscar chapéus");
    }
  };

  
  const obterChapeus = async () => {
    try {
      const response = await api.get("/vestuario/comprados")

      setPurchasedHats(response.data.vestuarios);
    } catch (error) {
      alert(error.response?.data?.detail || "Erro ao buscar chapéus");
    }
  };

  useEffect(() => {
    atualizarSaldo();
    obterTodosChapeus();
    obterChapeus();
  }, []);

  async function buyOrSelectHat(hat) {
    if (purchasedHats.some(item => item.id_vestuario === hat.id)) {
      // Já comprado
      setCurrentHat(hat.arquivo);
    }else {
      try {
        const response = await api.post("/vestuario",{ id_vestuario: hat.id })

        if(response.data.status == "Compra bem sucedida"){
          const novoSaldo = await atualizarSaldo();
          obterChapeus();
          setCurrentHat(hat.arquivo);
        }
        
        alert(response.data.status)

      } catch (error) {
        alert(error.response?.data?.detail || "Erro ao buscar chapéus");
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
          Saldo: R$ <span>{saldo}</span>
        </div>
      </header>

      {/* Música */}
      <audio src={musica} autoPlay loop />

      {/* Porquinho com imagem correspondente */}
      <Porquinho currentHat={imagens[currentHat]} />

      {/* Lista de Chapéus */}
      <Chapeus
        hats={hats.map((hat) => ({
          ...hat,
          file: imagens[hat.arquivo], // converte para exibir a imagem correta no componente
        }))}
        purchasedHats={purchasedHats}
        onSelect={buyOrSelectHat}
      />
    </div>
  );
}
