// src/features/mundo/pages/EscolhaMundo.jsx

function EscolhaMundo({ setMundoEscolhido }) {
  const mundos = [
    {
      id: "natureza",
      nome: "Jardim do Bem-Estar",
      descricao: "Um ambiente leve onde seus hábitos fazem a natureza evoluir.",
      diferenciais: ["Tranquilidade", "Natureza", "Equilíbrio"],
    },
    {
      id: "futurista",
      nome: "Cidade Saudável Futurista",
      descricao: "Uma cidade interativa onde cada hábito gera energia e progresso.",
      diferenciais: ["Energia", "Tecnologia", "Evolução"],
    },
  ];

  return (
    <section className="escolha-mundo-section">
      <div className="escolha-mundo-header escolha-mundo-header-clean">
        <h2>Escolha seu mundo</h2>
      </div>

      <div className="escolha-mundo-grid">
        {mundos.map((mundo) => (
          <button
            key={mundo.id}
            type="button"
            className={`mundo-bloco mundo-${mundo.id}`}
            onClick={() => setMundoEscolhido(mundo)}
          >
            <div className="mundo-preview">
              {mundo.id === "natureza" ? (
                <div className="preview-natureza">
                  <div className="ceu"></div>
                  <div className="sol"></div>
                  <div className="montanha montanha-1"></div>
                  <div className="montanha montanha-2"></div>
                  <div className="cachoeira"></div>
                  <div className="lago"></div>
                  <div className="arvore arvore-1"></div>
                  <div className="arvore arvore-2"></div>
                </div>
              ) : (
                <div className="preview-futurista">
                  <div className="ceu-futuro"></div>
                  <div className="circulo-energia"></div>
                  <div className="predio predio-1"></div>
                  <div className="predio predio-2"></div>
                  <div className="predio predio-3"></div>
                  <div className="rua"></div>
                  <div className="linha-neon linha-1"></div>
                  <div className="linha-neon linha-2"></div>
                </div>
              )}
            </div>

            <div className="mundo-info">
              <h3>{mundo.nome}</h3>
              <p>{mundo.descricao}</p>

              <div className="mundo-diferenciais">
                {mundo.diferenciais.map((diferencial) => (
                  <span key={diferencial}>{diferencial}</span>
                ))}
              </div>

              <div className="mundo-escolher-area">
                <span className="mundo-escolher">Selecionar mundo</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default EscolhaMundo;