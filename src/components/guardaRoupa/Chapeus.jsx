import "../../styles/style.css";

export default function Chapeus({ hats, purchasedHats, onSelect }) {
  return (
    <div className="options">
      {hats.map((hat, index) => {
        const comprado = purchasedHats.includes(hat.file);
        return (
          <button
            key={index}
            className={!comprado ? "locked" : ""}
            onClick={() => onSelect(hat)}
          >
            {hat.name}
            {hat.price > 0 && !comprado ? ` - R$${hat.price}` : ""}
          </button>
        );
      })}
    </div>
  );
}