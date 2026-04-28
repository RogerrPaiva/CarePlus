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

function getStreakStorageKey(userIdentifier) {
  return `careplus-mundo-streak-${userIdentifier || "visitante"}`;
}

function getMundoProgressStorageKey(userIdentifier) {
  return `careplus-mundo-progress-${userIdentifier || "visitante"}`;
}

function carregarStreakUsuario(userIdentifier) {
  const storageKey = getStreakStorageKey(userIdentifier);
  const dadosSalvos = localStorage.getItem(storageKey);

  if (!dadosSalvos) {
    return 0;
  }

  try {
    const dados = JSON.parse(dadosSalvos);

    return dados.dias || 0;
  } catch {
    return 0;
  }
}

function registrarAtividadeStreak(userIdentifier) {
  const storageKey = getStreakStorageKey(userIdentifier);
  const hoje = getLocalDateKey();
  const ontem = getYesterdayDateKey();

  const dadosSalvos = localStorage.getItem(storageKey);

  if (!dadosSalvos) {
    const novoStreak = {
      dias: 1,
      ultimaAtividade: hoje,
    };

    localStorage.setItem(storageKey, JSON.stringify(novoStreak));
    return novoStreak.dias;
  }

  try {
    const streakAtual = JSON.parse(dadosSalvos);

    if (streakAtual.ultimaAtividade === hoje) {
      return streakAtual.dias || 1;
    }

    if (streakAtual.ultimaAtividade === ontem) {
      const novoStreak = {
        dias: (streakAtual.dias || 0) + 1,
        ultimaAtividade: hoje,
      };

      localStorage.setItem(storageKey, JSON.stringify(novoStreak));
      return novoStreak.dias;
    }

    const streakReiniciado = {
      dias: 1,
      ultimaAtividade: hoje,
    };

    localStorage.setItem(storageKey, JSON.stringify(streakReiniciado));
    return streakReiniciado.dias;
  } catch {
    const streakReiniciado = {
      dias: 1,
      ultimaAtividade: hoje,
    };

    localStorage.setItem(storageKey, JSON.stringify(streakReiniciado));
    return streakReiniciado.dias;
  }
}

function Mundo() {
  const [authenticatedUser] = useState(() => readAuthenticatedUser());
  const [respostas, setRespostas] = useState({});
  const [quizFinalizado, setQuizFinalizado] = useState(false);
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [mundoEscolhido, setMundoEscolhido] = useState(null);
  const [abaResultado, setAbaResultado] = useState("mundo");
  const [streakDias, setStreakDias] = useState(0);
  const [bonusSaude, setBonusSaude] = useState(0);
  const [missoesMundoConcluidasHoje, setMissoesMundoConcluidasHoje] = useState([]);

  const userId = resolveUserId(authenticatedUser);
  const userIdentifier = userId || authenticatedUser?.email || "visitante";
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

  const carregarProgressoMundo = () => {
    const storageKey = getMundoProgressStorageKey(userIdentifier);
    const dadosSalvos = localStorage.getItem(storageKey);

    if (!dadosSalvos) {
      setBonusSaude(0);
      setMissoesMundoConcluidasHoje([]);
      return;
    }

    try {
      const dados = JSON.parse(dadosSalvos);
      const hoje = getLocalDateKey();

      setBonusSaude(dados.bonusSaude || 0);

      if (dados.data === hoje) {
        setMissoesMundoConcluidasHoje(dados.missoesMundoConcluidasHoje || []);
      } else {
        setMissoesMundoConcluidasHoje([]);

        const dadosAtualizados = {
          ...dados,
          data: hoje,
          missoesMundoConcluidasHoje: [],
        };

        localStorage.setItem(storageKey, JSON.stringify(dadosAtualizados));
      }
    } catch {
      setBonusSaude(0);
      setMissoesMundoConcluidasHoje([]);
    }
  };

  const salvarProgressoMundo = (novoBonus, novasMissoesConcluidasHoje) => {
    const storageKey = getMundoProgressStorageKey(userIdentifier);

    const dados = {
      bonusSaude: novoBonus,
      data: getLocalDateKey(),
      missoesMundoConcluidasHoje: novasMissoesConcluidasHoje,
    };

    localStorage.setItem(storageKey, JSON.stringify(dados));
  };

  const concluirMissaoMundo = (missao) => {
    const missaoId = missao.categoria;

    if (missoesMundoConcluidasHoje.includes(missaoId)) {
      return;
    }

    const aumentoSaude = missao.aumentoSaude || 1;
    const novoBonus = Math.min(bonusSaude + aumentoSaude, MAX_BONUS_SAUDE);
    const novasMissoesConcluidasHoje = [
      ...missoesMundoConcluidasHoje,
      missaoId,
    ];

    setBonusSaude(novoBonus);
    setMissoesMundoConcluidasHoje(novasMissoesConcluidasHoje);
    salvarProgressoMundo(novoBonus, novasMissoesConcluidasHoje);

    const streakAtualizado = registrarAtividadeStreak(userIdentifier);
    setStreakDias(streakAtualizado);
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

  const finalizarQuiz = () => {
    if (Object.keys(respostas).length === perguntas.length) {
      setQuizFinalizado(true);
      setAbaResultado("mundo");
    } else {
      alert("Responda todas as perguntas antes de finalizar.");
    }
  };

  const refazerQuiz = () => {
    setRespostas({});
    setQuizFinalizado(false);
    setPerguntaAtual(0);
    setMundoEscolhido(null);
    setAbaResultado("mundo");
  };

  useEffect(() => {
    document.title = "Care Plus | Mundo Ideal";

    setStreakDias(carregarStreakUsuario(userIdentifier));
    carregarProgressoMundo();
  }, [userIdentifier]);

  const porcentagemBase = calcularPorcentagemGeral();
  const porcentagemGeral = Math.min(porcentagemBase + bonusSaude, 100);
  const porcentagensCategorias = calcularPorcentagensPorCategoria();
  const estadoMundo = definirEstadoMundo(porcentagemGeral);

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
            <strong>
              {mundoEscolhido ? mundoEscolhido.nome : "Não escolhido"}
            </strong>
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
              <EscolhaMundo setMundoEscolhido={setMundoEscolhido} />
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