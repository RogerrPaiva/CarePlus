import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Apple,
  BarChart3,
  Bell,
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Circle,
  ClipboardCheck,
  Droplets,
  Flame,
  Footprints,
  Headphones,
  HeartPulse,
  Home,
  Info,
  Lock,
  Medal,
  Moon,
  ShoppingBag,
  Target,
  Trophy,
  UserRound,
  UsersRound,
} from "lucide-react";
import { GiChest } from "react-icons/gi";
import CarePlus from "../assets/branding/CarePlus.svg";
import missoes from "../assets/home/missoes.svg";
import { readAuthenticatedUser } from "../features/auth/authStorage";
import { getUserMission, getUserPoints, startTokenCollection } from "../lib/api";
import "./MissionsPage.css";

const TOKEN_DEVICE_ID = "careplus-token-001";

const dailyMissions = [
  {
    title: "Caminhe 4 mil passos",
    description: "Movimente-se todos os dias",
    progress: "0/1",
    percent: 0,
    points: 10,
    Icon: Footprints,
    complete: false,
  },
  {
    title: "Tomar 2,5 L de água",
    description: "Hidrate seu corpo e sua mente",
    progress: "0/1",
    percent: 0,
    points: 10,
    Icon: Droplets,
    complete: false,
  },
  {
    title: "Alimentação equilibrada",
    description: "Faça 1 refeição saudável",
    progress: "0/1",
    percent: 0,
    points: 10,
    Icon: Apple,
    complete: false,
  },
  {
    title: "Dormir 7 horas",
    description: "Uma boa noite de sono",
    progress: "0/1",
    percent: 0,
    points: 10,
    Icon: Moon,
    complete: false,
  },
];

const monthlyMissions = [
  {
    title: "Agendar uma consulta",
    description: "Cuide da sua saúde",
    progress: "0/1",
    percent: 0,
    points: 25,
    Icon: CalendarCheck,
  },
  {
    title: "Resgatar exames",
    description: "Acompanhe seus resultados",
    progress: "0/1",
    percent: 0,
    points: 25,
    Icon: ClipboardCheck,
  },
  {
    title: "Praticar atividade física",
    description: "Exercite-se 10 vezes",
    progress: "0/10",
    percent: 0,
    points: 25,
    Icon: HeartPulse,
  },
];

const initialMissionStats = {
  points: 0,
  streakDays: 0,
  weeklyCompleted: 0,
  weeklyTotal: 7,
  weeklyPercent: 0,
  levelLabel: "Bronze I",
  userLevel: "Nível 1",
  rewards: [
    { label: "Baús", count: 0, Icon: GiChest },
    { label: "Troféus", count: 0, Icon: Trophy },
    { label: "Medalhas", count: 0, Icon: Medal },
  ],
};

const upcomingMissions = [
  { title: "Meditar 5 minutos", Icon: UserRound },
  { title: "Ler um artigo de saúde", Icon: ClipboardCheck },
  { title: "Convidar um amigo", Icon: UsersRound },
];

const sidebarItems = [
  { label: "Início", Icon: Home, to: "/" },
  { label: "Missões", Icon: Target, to: "/missoes", active: true },
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
    return userId || user?.email?.split("@")[0] || "Usuário não identificado";
  }

  return fullName.split(/\s+/)[0];
}

function resolveDisplayName(user, userId) {
  return user?.full_name?.trim() || userId || user?.email?.trim() || "Usuário não identificado";
}

function resolveUserInitial(displayName) {
  return displayName.trim().charAt(0).toUpperCase() || "C";
}

function normalizePoints(value) {
  const points = Number(value);

  if (!Number.isFinite(points) || points < 0) {
    return 0;
  }

  return Math.floor(points);
}

function MissionCard({ mission }) {
  const Icon = mission.Icon;

  return (
    <article className="mission-card">
      <span className="mission-card__icon" aria-hidden="true">
        <Icon size={26} />
      </span>

      <div className="mission-card__content">
        <div className="mission-card__header">
          <h3>{mission.title}</h3>
          <span className="mission-card__points">+{mission.points}</span>
        </div>

        <p>{mission.description}</p>

        <div
          className={`mission-progress ${mission.complete ? "is-complete" : ""}`}
          aria-label={`Progresso ${mission.progress}`}
        >
          <span className="mission-progress__bar">
            <span style={{ width: `${mission.percent}%` }} />
          </span>
          <strong>{mission.progress}</strong>
        </div>
      </div>

      <span
        className={`mission-card__reward ${mission.complete ? "is-open" : ""}`}
        aria-hidden="true"
      >
        <GiChest size={24} />
      </span>
    </article>
  );
}

function MissionsPage() {
  const [authenticatedUser, setAuthenticatedUser] = useState(() => readAuthenticatedUser());
  const [missionPoints, setMissionPoints] = useState(initialMissionStats.points);
  const [tokenMission, setTokenMission] = useState(null);

  const hasStartedCollection = useRef(false);
  const userId = resolveUserId(authenticatedUser);
  const activeUserIdRef = useRef(userId);

  const firstName = resolveFirstName(authenticatedUser, userId);
  const displayName = resolveDisplayName(authenticatedUser, userId);
  const userInitial = resolveUserInitial(displayName);

  const missionStats = {
    ...initialMissionStats,
    points: missionPoints,
  };

  const weekDays = ["S", "T", "Q", "Q", "S", "S", "D"];

  const tokenMissionCard = {
    title: tokenMission?.title || "Coletar Token CarePlus",
    description:
      tokenMission?.status === "concluida"
        ? "Token coletado com sucesso pelo totem."
        : "Aperte o botão no totem ESP32 para confirmar a coleta.",
    progress: tokenMission?.status === "concluida" ? "1/1" : "0/1",
    percent: tokenMission?.status === "concluida" ? 100 : 0,
    points: tokenMission?.reward_points || 50,
    Icon: Target,
    complete: tokenMission?.status === "concluida",
  };

  useEffect(() => {
    document.title = "Care Plus | Missões";
  }, []);

  useEffect(() => {
    function syncAuthenticatedUser() {
      const nextAuthenticatedUser = readAuthenticatedUser();
      const nextUserId = resolveUserId(nextAuthenticatedUser);

      if (nextUserId !== activeUserIdRef.current) {
        activeUserIdRef.current = nextUserId;
        hasStartedCollection.current = false;
        setMissionPoints(0);
        setTokenMission(null);
      }

      setAuthenticatedUser(nextAuthenticatedUser);
    }

    const refreshUserIntervalId = window.setInterval(syncAuthenticatedUser, 1000);

    window.addEventListener("storage", syncAuthenticatedUser);
    window.addEventListener("focus", syncAuthenticatedUser);

    return () => {
      window.clearInterval(refreshUserIntervalId);
      window.removeEventListener("storage", syncAuthenticatedUser);
      window.removeEventListener("focus", syncAuthenticatedUser);
    };
  }, []);

  useEffect(() => {
    let shouldIgnoreResult = false;

    if (!userId) {
      return undefined;
    }

    async function loadMissionData() {
      try {
        const pointsResponse = await getUserPoints(userId);
        const missionResponse = await getUserMission(userId);

        if (!shouldIgnoreResult) {
          setMissionPoints(normalizePoints(pointsResponse?.points));
          setTokenMission(missionResponse?.mission);
        }
      } catch (error) {
        console.error("Erro ao carregar dados da missão:", error);

        if (!shouldIgnoreResult) {
          setMissionPoints(0);
        }
      }
    }

    async function startCollectionIfNeeded() {
      try {
        const missionResponse = await getUserMission(userId);
        const currentMission = missionResponse?.mission;

        if (!shouldIgnoreResult) {
          setTokenMission(currentMission);
        }

        if (currentMission?.status === "concluida") {
          return;
        }

        if (hasStartedCollection.current) {
          return;
        }

        hasStartedCollection.current = true;

        await startTokenCollection({
          user_id: userId,
          device_id: TOKEN_DEVICE_ID,
        });
      } catch (error) {
        console.error("Erro ao iniciar coleta do token:", error);
      }
    }

    async function initMission() {
      await startCollectionIfNeeded();
      await loadMissionData();
    }

    initMission();

    const refreshIntervalId = window.setInterval(loadMissionData, 2000);

    return () => {
      shouldIgnoreResult = true;
      window.clearInterval(refreshIntervalId);
    };
  }, [userId]);

  return (
    <main className="missions-page">
      <aside className="missions-sidebar" aria-label="Navegação das missões">
        <Link
          to="/"
          className="missions-sidebar__brand"
          aria-label="Ir para a home Care Plus"
        >
          <img src={CarePlus} alt="Care Plus" />
        </Link>

        <nav className="missions-sidebar__nav">
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
                  className={`missions-sidebar__link ${
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
                className={`missions-sidebar__link ${
                  item.active ? "is-active" : ""
                }`}
              >
                {content}
              </Link>
            );
          })}
        </nav>

        <div className="missions-level">
          <Medal size={34} aria-hidden="true" />
          <div>
            <span>Seu nível</span>
            <strong>{missionStats.levelLabel}</strong>
          </div>
          <ChevronRight size={18} aria-hidden="true" />
        </div>

        <section className="missions-tip" aria-label="Dica do dia">
          <span>Dica do dia</span>
          <p>Beba água e cuide da sua saúde todos os dias.</p>
        </section>
      </aside>

      <section className="missions-content" aria-labelledby="missions-title">
        <header className="missions-topbar">
          <div className="missions-greeting">
            <span className="missions-avatar" aria-hidden="true">
              <UserRound size={30} />
            </span>
            <div>
              <p>
                Olá, <strong>{firstName}!</strong>
              </p>
              <span>Que bom te ver por aqui.</span>
            </div>
          </div>

          <nav className="missions-tabs" aria-label="Áreas de recompensas">
            <Link to="/missoes" className="is-active">
              <Target size={18} aria-hidden="true" />
              Missões
            </Link>
            <a href="#">
              <ShoppingBag size={18} aria-hidden="true" />
              Loja
            </a>
            <a href="#">
              <UsersRound size={18} aria-hidden="true" />
              Comunidade
            </a>
          </nav>

          <div className="missions-user-actions">
            <button type="button" aria-label="Notificações">
              <Bell size={21} />
            </button>
            <span className="missions-points-pill">
              <Trophy size={17} aria-hidden="true" />
              <strong>{missionStats.points}</strong>
              pontos
            </span>
            <div className="missions-user-card">
              <span className="missions-user-photo" aria-hidden="true">
                {userInitial}
              </span>
              <div>
                <strong>{displayName}</strong>
                <span>{missionStats.userLevel}</span>
              </div>
              <ChevronDown size={18} aria-hidden="true" />
            </div>
          </div>
        </header>

        <div className="missions-main-grid">
          <div className="missions-primary-column">
            <section className="missions-hero">
              <div>
                <h1 id="missions-title">Missões</h1>
                <p>Complete as missões para ganhar recompensas.</p>
              </div>
              <span className="missions-hero__trophy" aria-hidden="true">
                <Trophy size={94} />
              </span>
            </section>

            <section
              className="missions-section"
              aria-labelledby="daily-missions-title"
            >
              <div className="missions-section__header">
                <div>
                  <h2 id="daily-missions-title">Missões do dia</h2>
                  <span>Atualiza em 05h 12m</span>
                </div>
                <a href="#">Ver todas</a>
              </div>

              <div className="missions-grid is-daily">
                <MissionCard mission={tokenMissionCard} />

                {dailyMissions.map((mission) => (
                  <MissionCard key={mission.title} mission={mission} />
                ))}
              </div>
            </section>

            <section
              className="missions-section"
              aria-labelledby="monthly-missions-title"
            >
              <div className="missions-section__header">
                <div>
                  <h2 id="monthly-missions-title">Missões do mês</h2>
                  <span>Atualiza em 20 dias</span>
                </div>
                <a href="#">Ver todas</a>
              </div>

              <div className="missions-grid is-monthly">
                {monthlyMissions.map((mission) => (
                  <MissionCard key={mission.title} mission={mission} />
                ))}
              </div>
            </section>

            <section
              className="missions-section upcoming-section"
              aria-labelledby="upcoming-missions-title"
            >
              <div className="missions-section__header">
                <div>
                  <h2 id="upcoming-missions-title">Vem aí</h2>
                  <span>Descubra em breve novas missões.</span>
                </div>
              </div>

              <div className="upcoming-missions">
                {upcomingMissions.map((mission) => {
                  const Icon = mission.Icon;

                  return (
                    <article className="upcoming-card" key={mission.title}>
                      <span aria-hidden="true">
                        <Icon size={26} />
                      </span>
                      <div>
                        <h3>{mission.title}</h3>
                        <p>Em breve</p>
                      </div>
                      <Lock size={20} aria-hidden="true" />
                    </article>
                  );
                })}
              </div>
            </section>
          </div>

          <aside className="missions-aside" aria-label="Resumo de recompensas">
            <section className="missions-points-card">
              <span>
                <Trophy size={18} aria-hidden="true" />
                Seus pontos
              </span>
              <strong>{missionStats.points}</strong>
              <p>
                Complete sua primeira missão para começar a conquistar
                recompensas.
              </p>
            </section>

            <section className="missions-small-panel">
              <div className="missions-small-panel__title">
                <span>
                  <Flame size={18} aria-hidden="true" />
                  Sequência atual
                </span>
                <Info size={19} aria-hidden="true" />
              </div>
              <strong className="missions-streak">
                {missionStats.streakDays} dias
              </strong>
              <p>Complete sua primeira missão para iniciar uma sequência.</p>
              <div className="missions-week">
                {weekDays.map((day, index) => {
                  const isComplete = index < missionStats.streakDays;

                  return (
                    <span
                      key={`${day}-${index}`}
                      className={isComplete ? "is-complete" : ""}
                    >
                      {day}
                      {isComplete ? (
                        <CheckCircle2 size={18} aria-hidden="true" />
                      ) : (
                        <Circle size={18} aria-hidden="true" />
                      )}
                    </span>
                  );
                })}
              </div>
            </section>

            <section className="missions-small-panel">
              <div className="missions-small-panel__title">
                <span>Progresso semanal</span>
                <BarChart3 size={19} aria-hidden="true" />
              </div>
              <p>
                {missionStats.weeklyCompleted}/{missionStats.weeklyTotal}{" "}
                missões concluídas
              </p>
              <div className="missions-side-progress">
                <span>
                  <span style={{ width: `${missionStats.weeklyPercent}%` }} />
                </span>
                <strong>{missionStats.weeklyPercent}%</strong>
              </div>
            </section>

            <section className="missions-small-panel">
              <div className="missions-small-panel__title">
                <span>Recompensas conquistadas</span>
                <a href="#">Ver todas</a>
              </div>
              <div className="missions-rewards">
                {missionStats.rewards.map((reward) => {
                  const Icon = reward.Icon;

                  return (
                    <span
                      key={reward.label}
                      className={reward.count > 0 ? "has-reward" : "is-empty"}
                      aria-label={`${reward.count} ${reward.label}`}
                    >
                      <Icon size={30} aria-hidden="true" />
                      <strong>{reward.count}</strong>
                    </span>
                  );
                })}
              </div>
            </section>

            <section className="missions-wellness-card">
              <div>
                <h2>Pequenas escolhas, grandes conquistas.</h2>
                <p>
                  Cada missão aproxima você de uma vida mais saudável e
                  equilibrada.
                </p>
              </div>
              <img
                src={missoes}
                alt="Pessoa em atendimento de saúde Care Plus"
              />
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default MissionsPage;
