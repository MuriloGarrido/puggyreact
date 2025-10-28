import React, { Component } from "react";
import "../styles/style.css";
import piggyLogo from "../assets/piggy.png";
import api from "../services/Api";

class SlotMachineHeader extends Component {
  render() {
    return (
      <div className="headera">
        <img src={piggyLogo} alt="porquinho" className="piggy" />
        <h1>Roletinha</h1>
      </div>
    );
  }
}

class Symbol extends Component {
  render() {
    return <div className="symbol">{this.props.unicode}</div>;
  }
}

class Reel extends Component {
  render() {
    const { linha } = this.props;
    return (
      <div className="reel">
        <div className="symbols">
          {linha.map((item, j) => (
            <Symbol key={j} unicode={item.unicode} />
          ))}
        </div>
      </div>
    );
  }
}

class ReelsContainer extends Component {
  render() {
    const { matriz } = this.props;
    return (
      <div className="reels">
        {matriz.map((linha, i) => (
          <Reel key={i} linha={linha} />
        ))}
      </div>
    );
  }
}

class InfoItem extends Component {
  render() {
    const { title, value } = this.props;
    return (
      <div className="info-item">
        <span className="info-title">{title}</span>
        <span className="info-value">{value}</span>
      </div>
    );
  }
}

class InfoContainer extends Component {
  render() {
    const { saldo, ultimoGanho, aposta } = this.props;
    return (
      <div className="info-container">
        <InfoItem title="Saldo:" value={`R$ ${saldo.toFixed(2)}`} />
        <InfoItem title="Último Ganho:" value={`R$ ${ultimoGanho.toFixed(2)}`} />
        <InfoItem title="Valor Aposta:" value={`R$ ${aposta.toFixed(2)}`} />
      </div>
    );
  }
}

class SlotMachineButtons extends Component {
  handleAlterarAposta = () => {
    const { aposta, setAposta } = this.props;
    const novoValor = prompt("Digite o valor da aposta:", aposta);
    const valorNum = Number(novoValor);
    if (!isNaN(valorNum) && valorNum > 0) setAposta(valorNum);
  };

  render() {
    const { apostar } = this.props;
    return (
      <div className="buttons">
        <button className="btn-spin" onClick={apostar}>
          Investir
        </button>
        <button className="btn-aposta" onClick={this.handleAlterarAposta}>
          Alterar Aposta
        </button>
      </div>
    );
  }
}

class SlotMachine extends Component {
  state = {
    saldo: 0,
    aposta: 10,
    ultimoGanho: 0,
    matriz: Array.from({ length: 3 }, () =>
      Array.from({ length: 3 }, () => ({ unicode: "❔" }))
    ),
  };

  componentDidMount() {
    this.carregarSaldo();
  }

  carregarSaldo = async () => {
    try {
      const res = await api.get("/carteira");
      this.setState({ saldo: res.data.saldo });
    } catch (error) {
      console.error("Erro ao carregar saldo:", error);
    }
  };

  apostar = async () => {
    try {
      const { aposta } = this.state;
      const res = await api.post("/roleta", { valor: aposta });
      const data = res.data;
      this.setState({
        matriz: data.resultado,
        saldo: data.saldo_atual,
        ultimoGanho: data.ganho || 0,
      });
    } catch (error) {
      alert(error.response.data.detail);
    }
  };

  setAposta = (novoValor) => {
    this.setState({ aposta: novoValor });
  };

  render() {
    const { saldo, ultimoGanho, aposta, matriz } = this.state;
    return (
      <div className="slot-machine">
        <SlotMachineHeader />
        <ReelsContainer matriz={matriz} />
        <InfoContainer saldo={saldo} ultimoGanho={ultimoGanho} aposta={aposta} />
        <SlotMachineButtons
          apostar={this.apostar}
          setAposta={this.setAposta}
          aposta={aposta}
        />
      </div>
    );
  }
}

export default SlotMachine;
