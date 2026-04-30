import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart3,
  Bell,
  ChevronDown,
  ChevronRight,
  Flame,
  Headphones,
  Home,
  Leaf,
  Medal,
  ShoppingBag,
  Sparkles,
  Target,
  UserRound,
  UsersRound,
} from "lucide-react";
import { GiChest } from "react-icons/gi";
import CarePlus from "../../../assets/branding/CarePlus.svg";
import { readAuthenticatedUser } from "../../auth/authStorage";
import { getUserMundo, updateUserMundo } from "../../../lib/api";
import EscolhaMundo from "./EscolhaMundo";
import QuizMundo from "./QuizMundo";
import ResultadoMundo from "./ResultadoMundo";
import "../styles/mundo.css";
import "../styles/escolhamundo.css";
import "../styles/resultadomundo.css";
import "../styles/mundotema.css";

const MAX_BONUS_SAUDE = 20;

const sidebarItems = [
  { label: "Início", Icon: Home, to: "/" },
  { label: "Mundo", Icon: Leaf, to: "/mundo", active: true },
  { label: "Missões", Icon: Target, to: "/missoes" },
  { label: "Loja", Icon: ShoppingBag, to: "#" },
  { label: "Comunidade", Icon: UsersRound, to: "#" },
  { label: "Relatórios", Icon: BarChart3, to: "#" },
  { label: "Benefícios", Icon: GiChest, to: "#" },
  { label: "Suporte", Icon: Headphones, to: "#" },
];

function resolveUserId(user) {
  return user?.id || user?.user_id || "";
}

function resolveFirstName(user, userId) {
  const fullName = user?.full_name?.trim();

  if (!fullName) {
    return userId || user?.email?.split("@")[0] || "Usuário";
  }

  return fullName.split(/\s+/)[0];
}

function resolveDisplayName(user, userId) {
  return user?.full_name?.trim() || userId || user?.email?.trim() || "Usuário";
}

function resolveUserInitial(displayName) {
  return displayName.trim().charAt(0).toUpperCase() || "C";
}

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getYesterdayDateKey() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return getLocalDateKey(yesterday);
}

function calcularNovoStreak(streakAtual, ultimaAtividade) {
  const hoje = getLocalDateKey();
  const ontem = getYesterdayDateKey();

  if (ultimaAtividade === hoje) {
    return streakAtual || 1;
  }

  if (ultimaAtividade === ontem) {
    return (streakAtual || 0) + 1;
  }

  return 1;
}

function Mundo() {
  const [authenticatedUser] = useState(() => readAuthenticatedUser());
  const [respostas, setRespostas] = useState({});
  const [quizFinalizado, setQuizFinalizado] = useState(false);
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [mundoEscolhido, setMundoEscolhido] = useState(null);
  const [mundoSalvoNome, setMundoSalvoNome] = useState(null);
  const [abaResultado, setAbaResultado] = useState("mundo");
  const [streakDias, setStreakDias] = useState(0);
  const [ultimaAtividadeMundo, setUltimaAtividadeMundo] = useState(null);
  const [bonusSaude, setBonusSaude] = useState(0);
  const [missoesMundoConcluidasHoje, setMissoesMundoConcluidasHoje] =
    useState([]);

  const userId = resolveUserId(authenticatedUser);
  const firstName = resolveFirstName(authenticatedUser, userId);
  const displayName = resolveDisplayName(authenticatedUser, userId);
  const userInitial = resolveUserInitial(displayName);

  const perguntas = [
    {
      id: 1,
      texto: "Quantas horas você dorme por noite?",
      opcoes: [
        { texto: "Menos de 5 horas por noite", valor: 1, categoria: "sono" },
        { texto: "Entre 5 e 7 horas por noite", valor: 2, categoria: "sono" },
        { texto: "Mais de 7 horas por noite", valor: 3, categoria: "sono" },
      ],
    },
    {
      id: 2,
      texto: "Quantos copos de água você toma por dia?",
      opcoes: [
        { texto: "Pouquíssimos", valor: 1, categoria: "agua" },
        { texto: "Uma quantidade média", valor: 2, categoria: "agua" },
        { texto: "Uma quantidade boa", valor: 3, categoria: "agua" },
      ],
    },
    {
      id: 3,
      texto: "Qual é a sua frequência de exercícios?",
      opcoes: [
        {
          texto: "Raramente faço exercícios",
          valor: 1,
          categoria: "exercicio",
        },
        {
          texto: "Faço de vez em quando",
          valor: 2,
          categoria: "exercicio",
        },
        {
          texto: "Faço exercícios com frequência",
          valor: 3,
          categoria: "exercicio",
        },
      ],
    },
    {
      id: 4,
      texto: "Como está sua alimentação no dia a dia?",
      opcoes: [
        {
          texto: "Como muitos alimentos industrializados",
          valor: 1,
          categoria: "alimentacao",
        },
        {
          texto: "Tento equilibrar, mas nem sempre consigo",
          valor: 2,
          categoria: "alimentacao",
        },
        {
          texto: "Tenho uma alimentação bem equilibrada",
          valor: 3,
          categoria: "alimentacao",
        },
      ],
    },
    {
      id: 5,
      texto: "Como está seu nível de estresse?",
      opcoes: [
        {
          texto: "Me sinto muito estressado",
          valor: 1,
          categoria: "estresse",
        },
        {
          texto: "Me sinto estressado às vezes",
          valor: 2,
          categoria: "estresse",
        },
        {
          texto: "Consigo lidar bem com o estresse",
          valor: 3,
          categoria: "estresse",
        },
      ],
    },
    {
      id: 6,
      texto: "Como você avalia seu humor na maior parte dos dias?",
      opcoes: [
        {
          texto: "Costumo ficar desanimado",
          valor: 1,
          categoria: "humor",
        },
        {
          texto: "Meu humor varia bastante",
          valor: 2,
          categoria: "humor",
        },
        {
          texto: "Costumo me sentir bem e disposto",
          valor: 3,
          categoria: "humor",
        },
      ],
    },
    {
      id: 7,
      texto: "Como está seu cansaço físico?",
      opcoes: [
        {
          texto: "Me sinto cansado quase sempre",
          valor: 1,
          categoria: "cansaco",
        },
        {
          texto: "Sinto cansaço em alguns momentos",
          valor: 2,
          categoria: "cansaco",
        },
        {
          texto: "Tenho uma boa disposição física",
          valor: 3,
          categoria: "cansaco",
        },
      ],
    },
    {
      id: 8,
      texto: "Quanto tempo você passa em telas por dia?",
      opcoes: [
        {
          texto: "Passo muitas horas em telas",
          valor: 1,
          categoria: "tela",
        },
        {
          texto: "Uso telas por um tempo moderado",
          valor: 2,
          categoria: "tela",
        },
        {
          texto: "Consigo controlar bem meu tempo de tela",
          valor: 3,
          categoria: "tela",
        },
      ],
    },
  ];

  const nomesCategorias = {
    sono: "Sono",
    agua: "Água",
    exercicio: "Exercícios",
    alimentacao: "Alimentação",
    estresse: "Estresse",
    humor: "Humor",
    cansaco: "Cansaço físico",
    tela: "Tempo de tela",
  };

  const selecionarResposta = (perguntaId, opcao) => {
    setRespostas({
      ...respostas,
      [perguntaId]: opcao,
    });
  };

  const calcularPorcentagem = (valor, minimo, maximo) => {
    const porcentagem = ((valor - minimo) / (maximo - minimo)) * 100;
    return Math.round(porcentagem);
  };

  const calcularPorcentagemGeral = () => {
    const respostasSelecionadas = Object.values(respostas);

    if (respostasSelecionadas.length === 0) {
      return 0;
    }

    const total = respostasSelecionadas.reduce((acc, resposta) => {
      return acc + resposta.valor;
    }, 0);

    const minimo = perguntas.length * 1;
    const maximo = perguntas.length * 3;

    return calcularPorcentagem(total, minimo, maximo);
  };

  const calcularPorcentagensPorCategoria = () => {
    const categorias = {};

    Object.values(respostas).forEach((resposta) => {
      if (!categorias[resposta.categoria]) {
        categorias[resposta.categoria] = {
          total: 0,
          quantidade: 0,
        };
      }

      categorias[resposta.categoria].total += resposta.valor;
      categorias[resposta.categoria].quantidade += 1;
    });

    const porcentagens = {};

    Object.entries(categorias).forEach(([categoria, dados]) => {
      const media = dados.total / dados.quantidade;
      porcentagens[categoria] = calcularPorcentagem(media, 1, 3);
    });

    return porcentagens;
  };

  const porcentagemBase = calcularPorcentagemGeral();

  const carregarProgressoMundo = async () => {
    if (!userId) {
      setBonusSaude(0);
      setStreakDias(0);
      setUltimaAtividadeMundo(null);
      setMundoSalvoNome(null);
      setMissoesMundoConcluidasHoje([]);
      return;
    }

    try {
      const response = await getUserMundo(userId);
      const mundo = response?.mundo || {};
      const hoje = getLocalDateKey();

      setBonusSaude(mundo.bonus_saude || 0);
      setStreakDias(mundo.streak_dias || 0);
      setUltimaAtividadeMundo(mundo.ultima_atividade || null);
      setMundoSalvoNome(mundo.mundo_escolhido || null);

      if (mundo.data_missoes === hoje) {
        setMissoesMundoConcluidasHoje(
          mundo.missoes_concluidas_hoje || []
        );
      } else {
        setMissoesMundoConcluidasHoje([]);

        await updateUserMundo(userId, {
          data_missoes: hoje,
          missoes_concluidas_hoje: [],
        });
      }
    } catch (error) {
      console.error("Erro ao carregar progresso do mundo:", error);
      setBonusSaude(0);
      setStreakDias(0);
      setUltimaAtividadeMundo(null);
      setMissoesMundoConcluidasHoje([]);
    }
  };

  const salvarProgressoMundo = async (
    novoBonus,
    novasMissoesConcluidasHoje,
    novoStreak,
    novaUltimaAtividade
  ) => {
    if (!userId) {
      return;
    }

    try {
      await updateUserMundo(userId, {
        bonus_saude: novoBonus,
        data_missoes: getLocalDateKey(),
        missoes_concluidas_hoje: novasMissoesConcluidasHoje,
        streak_dias: novoStreak,
        ultima_atividade: novaUltimaAtividade,
        porcentagem_base: porcentagemBase,
        quiz_finalizado: quizFinalizado,
        mundo_escolhido: mundoEscolhido?.nome || mundoSalvoNome || null,
      });
    } catch (error) {
      console.error("Erro ao salvar progresso do mundo:", error);
    }
  };

  const concluirMissaoMundo = async (missao) => {
    const missaoId = missao.categoria;

    if (missoesMundoConcluidasHoje.includes(missaoId)) {
      return;
    }

    const hoje = getLocalDateKey();
    const aumentoSaude = missao.aumentoSaude || 1;
    const novoBonus = Math.min(bonusSaude + aumentoSaude, MAX_BONUS_SAUDE);
    const novasMissoesConcluidasHoje = [
      ...missoesMundoConcluidasHoje,
      missaoId,
    ];
    const novoStreak = calcularNovoStreak(streakDias, ultimaAtividadeMundo);

    setBonusSaude(novoBonus);
    setMissoesMundoConcluidasHoje(novasMissoesConcluidasHoje);
    setStreakDias(novoStreak);
    setUltimaAtividadeMundo(hoje);

    await salvarProgressoMundo(
      novoBonus,
      novasMissoesConcluidasHoje,
      novoStreak,
      hoje
    );
  };

  const selecionarMundo = async (mundo) => {
    setMundoEscolhido(mundo);
    setMundoSalvoNome(mundo?.nome || null);

    if (!userId) {
      return;
    }

    try {
      await updateUserMundo(userId, {
        mundo_escolhido: mundo?.nome || null,
      });
    } catch (error) {
      console.error("Erro ao salvar mundo escolhido:", error);
    }
  };

  const definirEstadoMundo = (porcentagem) => {
    if (porcentagem < 40) {
      return {
        status: "Mundo fraco",
        classe: "mundo-fraco",
        descricao:
          "Seu mundo ainda precisa de cuidado. Alguns hábitos estão deixando o ambiente com menos energia.",
      };
    }

    if (porcentagem < 70) {
      return {
        status: "Mundo em evolução",
        classe: "mundo-evolucao",
        descricao:
          "Seu mundo está melhorando. Seus hábitos já mostram progresso, mas ainda há espaço para evoluir.",
      };
    }

    return {
      status: "Mundo saudável",
      classe: "mundo-saudavel",
      descricao:
        "Seu mundo está cheio de vida. Seus hábitos estão ajudando o ambiente a crescer de forma saudável.",
    };
  };

  const finalizarQuiz = async () => {
    if (Object.keys(respostas).length !== perguntas.length) {
      alert("Responda todas as perguntas antes de finalizar.");
      return;
    }

    const porcentagemCalculada = calcularPorcentagemGeral();

    setQuizFinalizado(true);
    setAbaResultado("mundo");

    if (!userId) {
      return;
    }

    try {
      await updateUserMundo(userId, {
        quiz_finalizado: true,
        porcentagem_base: porcentagemCalculada,
        mundo_escolhido: mundoEscolhido?.nome || mundoSalvoNome || null,
      });
    } catch (error) {
      console.error("Erro ao salvar resultado do quiz:", error);
    }
  };

  const refazerQuiz = async () => {
    setRespostas({});
    setQuizFinalizado(false);
    setPerguntaAtual(0);
    setMundoEscolhido(null);
    setMundoSalvoNome(null);
    setAbaResultado("mundo");

    if (!userId) {
      return;
    }

    try {
      await updateUserMundo(userId, {
        quiz_finalizado: false,
        porcentagem_base: 0,
        mundo_escolhido: null,
      });
    } catch (error) {
      console.error("Erro ao reiniciar quiz do mundo:", error);
    }
  };

  useEffect(() => {
    document.title = "Care Plus | Mundo Ideal";
    carregarProgressoMundo();
  }, [userId]);

  const porcentagemGeral = Math.min(porcentagemBase + bonusSaude, 100);
  const porcentagensCategorias = calcularPorcentagensPorCategoria();
  const estadoMundo = definirEstadoMundo(porcentagemGeral);
  const nomeMundoExibido =
    mundoEscolhido?.nome || mundoSalvoNome || "Não escolhido";

  return (
    <main className="mundo-page mundo-dashboard-page">
      <aside className="mundo-sidebar" aria-label="Navegação do mundo">
        <Link
          to="/"
          className="mundo-sidebar__brand"
          aria-label="Ir para a home Care Plus"
        >
          <img src={CarePlus} alt="Care Plus" />
        </Link>

        <nav className="mundo-sidebar__nav">
          {sidebarItems.map((item) => {
            const Icon = item.Icon;

            const content = (
              <>
                <Icon size={22} aria-hidden="true" />
                <span>{item.label}</span>
              </>
            );

            if (item.to === "#") {
              return (
                <a
                  key={item.label}
                  href="#"
                  className={`mundo-sidebar__link ${
                    item.active ? "is-active" : ""
                  }`}
                >
                  {content}
                </a>
              );
            }

            return (
              <Link
                key={item.label}
                to={item.to}
                className={`mundo-sidebar__link ${
                  item.active ? "is-active" : ""
                }`}
              >
                {content}
              </Link>
            );
          })}
        </nav>

        <div className="mundo-level">
          <Medal size={34} aria-hidden="true" />
          <div>
            <span>Seu mundo</span>
            <strong>{nomeMundoExibido}</strong>
          </div>
          <ChevronRight size={18} aria-hidden="true" />
        </div>

        <section className="mundo-tip" aria-label="Dica do mundo">
          <span>Dica do dia</span>
          <p>Complete missões do mundo para manter sua sequência ativa.</p>
        </section>
      </aside>

      <section className="mundo-content" aria-labelledby="mundo-title">
        <header className="mundo-topbar">
          <div className="mundo-greeting">
            <span className="mundo-avatar" aria-hidden="true">
              <UserRound size={30} />
            </span>

            <div>
              <p>
                Olá, <strong>{firstName}!</strong>
              </p>
              <span>Construa seu mundo ideal de saúde.</span>
            </div>
          </div>

          <nav className="mundo-tabs" aria-label="Áreas do mundo">
            {quizFinalizado ? (
              <>
                <button
                  type="button"
                  className={abaResultado === "mundo" ? "is-active" : ""}
                  onClick={() => setAbaResultado("mundo")}
                >
                  <Leaf size={18} aria-hidden="true" />
                  Mundo
                </button>

                <button
                  type="button"
                  className={abaResultado === "missoes" ? "is-active" : ""}
                  onClick={() => setAbaResultado("missoes")}
                >
                  <Target size={18} aria-hidden="true" />
                  Missões
                </button>

                <button
                  type="button"
                  className={abaResultado === "saude" ? "is-active" : ""}
                  onClick={() => setAbaResultado("saude")}
                >
                  <Sparkles size={18} aria-hidden="true" />
                  Saúde {porcentagemGeral}%
                </button>
              </>
            ) : (
              <>
                <Link to="/mundo" className="is-active">
                  <Leaf size={18} aria-hidden="true" />
                  Mundo
                </Link>

                <Link to="/missoes">
                  <Target size={18} aria-hidden="true" />
                  Missões
                </Link>

                <a href="#">
                  <UsersRound size={18} aria-hidden="true" />
                  Comunidade
                </a>
              </>
            )}
          </nav>

          <div className="mundo-user-actions">
            <button type="button" aria-label="Notificações">
              <Bell size={21} />
            </button>

            <span className="mundo-points-pill">
              <Sparkles size={17} aria-hidden="true" />
              <strong>{porcentagemGeral}%</strong>
              saúde
            </span>

            <span
              className="mundo-streak-pill"
              title={`Você está há ${streakDias} dias ativo no mundo`}
            >
              <Flame size={18} aria-hidden="true" />
              <strong>{streakDias}</strong>
              dias
            </span>

            <div className="mundo-user-card">
              <span className="mundo-user-photo" aria-hidden="true">
                {userInitial}
              </span>

              <div>
                <strong>{displayName}</strong>
                <span>Mundo Ideal</span>
              </div>

              <ChevronDown size={18} aria-hidden="true" />
            </div>
          </div>
        </header>

        {!quizFinalizado && (
          <section className="mundo-hero" id="mundo-title">
            <div className="mundo-hero-content">
              <span className="mundo-tag">Care Plus</span>

              <h1>Construa seu Mundo Ideal de Saúde</h1>

              <p>
                Escolha um mundo, responda ao quiz e descubra como seus hábitos
                influenciam a evolução do seu ambiente saudável.
              </p>
            </div>
          </section>
        )}

        <div className="mundo-dashboard-grid">
          <section className="mundo-dashboard-main">
            {!mundoEscolhido && (
              <EscolhaMundo setMundoEscolhido={selecionarMundo} />
            )}

            {mundoEscolhido && !quizFinalizado && (
              <QuizMundo
                perguntas={perguntas}
                respostas={respostas}
                perguntaAtual={perguntaAtual}
                setPerguntaAtual={setPerguntaAtual}
                selecionarResposta={selecionarResposta}
                finalizarQuiz={finalizarQuiz}
                nomesCategorias={nomesCategorias}
              />
            )}

            {mundoEscolhido && quizFinalizado && (
              <ResultadoMundo
                mundoEscolhido={mundoEscolhido}
                porcentagemGeral={porcentagemGeral}
                porcentagensCategorias={porcentagensCategorias}
                nomesCategorias={nomesCategorias}
                estadoMundo={estadoMundo}
                refazerQuiz={refazerQuiz}
                abaAtiva={abaResultado}
                missoesMundoConcluidasHoje={missoesMundoConcluidasHoje}
                concluirMissaoMundo={concluirMissaoMundo}
              />
            )}
          </section>
        </div>
      </section>
    </main>
  );
}

export default Mundo;