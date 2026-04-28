// src/features/mundo/pages/BarraHabito.jsx

function BarraHabito({ porcentagem, pequena = false }) {
  return (
    <div className={pequena ? "barra-habitos barra-menor" : "barra-habitos"}>
      <div
        className={
          pequena
            ? "indicador-habitos indicador-menor"
            : "indicador-habitos"
        }
        style={{ left: `${porcentagem}%` }}
      ></div>
    </div>
  );
}

export default BarraHabito;