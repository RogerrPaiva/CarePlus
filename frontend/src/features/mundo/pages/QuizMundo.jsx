// src/features/mundo/pages/QuizMundo.jsx

function QuizMundo({
  perguntas,
  respostas,
  perguntaAtual,
  setPerguntaAtual,
  selecionarResposta,
  finalizarQuiz,
  nomesCategorias,
}) {
  const pergunta = perguntas[perguntaAtual];
  const categoriaAtual = pergunta.opcoes[0].categoria;
  const progressoQuiz = ((perguntaAtual + 1) / perguntas.length) * 100;

  const avancarPergunta = () => {
    if (perguntaAtual < perguntas.length - 1) {
      setPerguntaAtual(perguntaAtual + 1);
    }
  };

  const voltarPergunta = () => {
    if (perguntaAtual > 0) {
      setPerguntaAtual(perguntaAtual - 1);
    }
  };

  return (
    <section className="quiz-fullscreen">
      <div className="quiz-progress-area">
        <div className="quiz-progress-info">
          <span>
            Pergunta {perguntaAtual + 1} de {perguntas.length}
          </span>

          <strong>{Math.round(progressoQuiz)}%</strong>
        </div>

        <div className="quiz-progress-bar">
          <div
            className="quiz-progress-fill"
            style={{ width: `${progressoQuiz}%` }}
          ></div>
        </div>
      </div>

      <div className="pergunta-full-card">
        <div className="pergunta-topo">
          <span>{nomesCategorias[categoriaAtual]}</span>

          <h2>{pergunta.texto}</h2>
        </div>

        <div className="opcoes-full-lista">
          {pergunta.opcoes.map((opcao, index) => (
            <button
              key={index}
              type="button"
              className={
                respostas[pergunta.id]?.texto === opcao.texto
                  ? "opcao-full-card opcao-selecionada"
                  : "opcao-full-card"
              }
              onClick={() => selecionarResposta(pergunta.id, opcao)}
            >
              {opcao.texto}
            </button>
          ))}
        </div>

        <div className="quiz-botoes">
          <button
            type="button"
            className="btn-voltar"
            onClick={voltarPergunta}
            disabled={perguntaAtual === 0}
          >
            Voltar
          </button>

          {perguntaAtual < perguntas.length - 1 ? (
            <button
              type="button"
              className="btn-proxima"
              onClick={avancarPergunta}
              disabled={!respostas[pergunta.id]}
            >
              Próxima
            </button>
          ) : (
            <button
              type="button"
              className="btn-proxima"
              onClick={finalizarQuiz}
              disabled={!respostas[pergunta.id]}
            >
              Ver resultado
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default QuizMundo;