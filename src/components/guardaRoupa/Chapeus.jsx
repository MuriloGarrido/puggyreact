import "../../styles/style.css";

export default function Chapeus({ hats, purchasedHats, onSelect }) {
  return (
    <div className="options">
      {hats.map((hat) => {
        // Verifica se o chapéu foi comprado comparando o id_vestuario
        const comprado = purchasedHats.some(
          (item) => item.id_vestuario === hat.id
        );

        return (
          <button
            key={hat.id}
            className={!comprado ? "locked" : ""}
            onClick={() => onSelect(hat)}
          >
            {hat.nome}
            {hat.valor > 0 && !comprado ? ` - R$${hat.valor}` : ""}
          </button>
        );
      })}
    </div>
  );
}
