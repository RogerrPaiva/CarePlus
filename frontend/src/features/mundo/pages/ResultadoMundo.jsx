import BarraHabito from "./BarraHabito";
import "../styles/resultadomundo.css";

function ResultadoMundo({
  mundoEscolhido,
  porcentagemGeral,
  porcentagensCategorias,
  nomesCategorias,
  estadoMundo,
  refazerQuiz,
  abaAtiva = "mundo",
  missoesMundoConcluidasHoje = [],
  concluirMissaoMundo,
}) {
  const classeTipoMundo =
    mundoEscolhido.id === "natureza" ? "mundo-jardim" : "mundo-tech";

  const missoesPorCategoria = {
    sono: {
      titulo: "Melhorar o sono",
      descricao: "Tente dormir 30 minutos mais cedo hoje.",
      pontos: 15,
      aumentoSaude: 2,
    },
    agua: {
      titulo: "Hidratação",
      descricao: "Beba 2 copos de água nas próximas horas.",
      pontos: 10,
      aumentoSaude: 1,
    },
    exercicio: {
      titulo: "Movimento",
      descricao: "Faça uma caminhada leve de 15 minutos.",
      pontos: 20,
      aumentoSaude: 3,
    },
    alimentacao: {
      titulo: "Alimentação equilibrada",
      descricao: "Inclua uma fruta ou verdura na sua próxima refeição.",
      pontos: 15,
      aumentoSaude: 2,
    },
    estresse: {
      titulo: "Reduzir estresse",
      descricao: "Faça uma pausa de 5 minutos para respirar com calma.",
      pontos: 10,
      aumentoSaude: 1,
    },
    humor: {
      titulo: "Cuidar do humor",
      descricao: "Faça algo simples que te deixe bem hoje.",
      pontos: 10,
      aumentoSaude: 1,
    },
    cansaco: {
      titulo: "Recuperar energia",
      descricao: "Faça uma pausa curta e alongue o corpo.",
      pontos: 10,
      aumentoSaude: 1,
    },
    tela: {
      titulo: "Menos tela",
      descricao: "Fique 20 minutos longe do celular.",
      pontos: 15,
      aumentoSaude: 2,
    },
  };

  const gerarMissoes = () => {
    const categoriasOrdenadas = Object.entries(porcentagensCategorias)
      .sort((a, b) => a[1] - b[1])
      .filter(([, porcentagem]) => porcentagem < 70)
      .slice(0, 4);

    if (categoriasOrdenadas.length === 0) {
      return [
        {
          categoria: "geral",
          titulo: "Manter bons hábitos",
          descricao: "Continue mantendo sua rotina saudável hoje.",
          pontos: 20,
          porcentagem: porcentagemGeral,
          aumentoSaude: 1,
        },
      ];
    }

    return categoriasOrdenadas.map(([categoria, porcentagem]) => ({
      categoria,
      porcentagem,
      ...missoesPorCategoria[categoria],
    }));
  };

  const missoes = gerarMissoes();

  return (
    <section className="resultado-container resultado-container-novo">
      <div className="resultado-card resultado-card-novo resultado-card-limpo">
        {abaAtiva === "mundo" && (
          <div
            className={`visual-mundo visual-mundo-grande visual-mundo-limpo ${estadoMundo.classe} ${classeTipoMundo}`}
          >
            {mundoEscolhido.id === "natureza" ? (
              <div className="mundo-cenario jardim-cenario">
                <div className="jardim-sol"></div>
                <div className="jardim-nuvem jardim-nuvem-1"></div>
                <div className="jardim-nuvem jardim-nuvem-2"></div>

                <div className="jardim-colina jardim-colina-1"></div>
                <div className="jardim-colina jardim-colina-2"></div>

                <div className="jardim-lago"></div>
                <div className="jardim-caminho"></div>

                <div className="jardim-casa"></div>

                <div className="jardim-arvore jardim-arvore-1"></div>
                <div className="jardim-arvore jardim-arvore-2"></div>
                <div className="jardim-arvore jardim-arvore-3"></div>

                <div className="jardim-flor jardim-flor-1"></div>
                <div className="jardim-flor jardim-flor-2"></div>
                <div className="jardim-flor jardim-flor-3"></div>

                <div className="jardim-grama"></div>
              </div>
            ) : (
              <div className="mundo-cenario tech-cenario">
                <div className="tech-ceu"></div>
                <div className="tech-sol-neon"></div>

                <div className="tech-nuvem tech-nuvem-1"></div>
                <div className="tech-nuvem tech-nuvem-2"></div>

                <div className="tech-predio tech-predio-1"></div>
                <div className="tech-predio tech-predio-2"></div>
                <div className="tech-predio tech-predio-3"></div>
                <div className="tech-predio tech-predio-4"></div>
                <div className="tech-predio tech-predio-5"></div>

                <div className="tech-torre-central"></div>

                <div className="tech-palmeira tech-palmeira-1"></div>
                <div className="tech-palmeira tech-palmeira-2"></div>

                <div className="tech-faixa-carros">
                  <div className="tech-carro tech-carro-1"></div>
                  <div className="tech-carro tech-carro-2"></div>
                  <div className="tech-carro tech-carro-3"></div>
                  <div className="tech-carro tech-carro-4"></div>
                </div>

                <div className="tech-grid"></div>

                <div className="tech-linha-perspectiva tech-linha-perspectiva-1"></div>
                <div className="tech-linha-perspectiva tech-linha-perspectiva-2"></div>
                <div className="tech-linha-perspectiva tech-linha-perspectiva-3"></div>
                <div className="tech-linha-perspectiva tech-linha-perspectiva-4"></div>
                <div className="tech-linha-perspectiva tech-linha-perspectiva-5"></div>

                <div className="tech-linha-horizontal tech-linha-horizontal-1"></div>
                <div className="tech-linha-horizontal tech-linha-horizontal-2"></div>
                <div className="tech-linha-horizontal tech-linha-horizontal-3"></div>

                <div className="tech-base"></div>
              </div>
            )}

            <div className="visual-mundo-info visual-mundo-info-nova">
              <span>{estadoMundo.status}</span>
              <p>{estadoMundo.descricao}</p>
            </div>
          </div>
        )}

        {abaAtiva === "missoes" && (
          <section className="painel-missoes">
            <div className="painel-missoes-header">
              <h2>Missões saudáveis do mundo</h2>
              <p>
                Complete ações diárias para melhorar seu mundo e manter sua
                sequência ativa.
              </p>
            </div>

            <div className="missoes-grid">
              {missoes.map((missao, index) => {
                const missaoConcluidaHoje = missoesMundoConcluidasHoje.includes(
                  missao.categoria,
                );

                return (
                  <div className="missao-card" key={`${missao.categoria}-${index}`}>
                    <div className="missao-topo">
                      <span>
                        {missao.categoria === "geral"
                          ? "Geral"
                          : nomesCategorias[missao.categoria]}
                      </span>

                      <strong>+{missao.pontos} pts</strong>
                    </div>

                    <h3>{missao.titulo}</h3>

                    <p>{missao.descricao}</p>

                    {missao.categoria !== "geral" && (
                      <small>Saúde atual: {missao.porcentagem}%</small>
                    )}

                    <span className="missao-saude-bonus">
                      +{missao.aumentoSaude}% saúde do mundo
                    </span>

                    <button
                      type="button"
                      className={
                        missaoConcluidaHoje
                          ? "btn-concluir-missao missao-concluida"
                          : "btn-concluir-missao"
                      }
                      disabled={missaoConcluidaHoje}
                      onClick={() => concluirMissaoMundo(missao)}
                    >
                      {missaoConcluidaHoje
                        ? "Concluída hoje"
                        : "Concluir missão"}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {abaAtiva === "saude" && (
          <section className="painel-saude-tela">
            <div className="painel-saude-header">
              <h2>Barra de saúde</h2>
              <p>
                Veja a saúde geral do seu mundo e o desempenho de cada hábito.
              </p>
            </div>

            <div className="resultado-geral resultado-geral-compacto saude-geral-card">
              <div className="saude-geral-topo">
                <h3>Hábitos gerais</h3>
                <strong>{porcentagemGeral}%</strong>
              </div>

              <BarraHabito porcentagem={porcentagemGeral} />
            </div>

            <div className="resultado-categorias resultado-categorias-compacta">
              <h3>Resultado por categoria</h3>

              {Object.entries(porcentagensCategorias).map(
                ([categoria, porcentagem]) => (
                  <div className="categoria-resultado" key={categoria}>
                    <div className="categoria-topo">
                      <span>{nomesCategorias[categoria]}</span>
                      <strong>{porcentagem}%</strong>
                    </div>

                    <BarraHabito porcentagem={porcentagem} pequena={true} />
                  </div>
                ),
              )}
            </div>
          </section>
        )}

        <button
          type="button"
          className="btn-refazer btn-refazer-novo"
          onClick={refazerQuiz}
        >
          Refazer quiz
        </button>
      </div>
    </section>
  );
}

export default ResultadoMundo;