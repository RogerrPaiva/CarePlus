import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Bell,
  Check,
  ChevronDown,
  Clock3,
  Droplets,
  Info,
  LockKeyhole,
  Mail,
  MessageCircle,
  Moon,
  PencilLine,
  Pill,
  Save,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Sun,
  SunMedium,
  User,
  X,
} from "lucide-react";
import CarePlus from "../../../assets/branding/CarePlus.svg";
import { getPlanByKey } from "../../plans/planCatalog";
import { readOnboardingFlowContext, writeOnboardingFlowContext } from "../flowStorage";
import "../styles/OnboardingPage.css";

const onboardingSteps = [
  {
    number: 1,
    title: "Permissões e ajustes iniciais",
    heroTitle: "Falta pouco para personalizar seu cuidado.",
    heroDescription: "Só falta revisar algumas permissões para preparar sua experiência.",
    heading: "Permissões e ajustes iniciais",
    description: "Para começar, revise e confirme as permissões abaixo.",
    estimatedDuration: "3 a 4 min",
    nextStepLabel: "Próxima etapa",
    nextStepValue: "Preferências de cuidado",
    primaryActionLabel: "Iniciar primeira etapa",
    items: [
      {
        icon: Bell,
        title: "Notificações e lembretes",
        description: "Você define como e quando deseja receber comunicações.",
        detail:
          "Ao revisar este bloco, você confirma que os avisos iniciais do Care Plus podem usar notificações do app e lembretes essenciais. Isso pode ser ajustado depois nas configurações.",
      },
      {
        icon: User,
        title: "Personalização inicial do cuidado",
        description: "Conte sobre seus objetivos e preferências de cuidado.",
        detail:
          "Aqui o Care Plus entende melhor como priorizar sua jornada inicial de cuidado. O foco é deixar a experiência mais útil sem exigir configuração pesada agora.",
      },
      {
        icon: Activity,
        title: "Conexão com dados de saúde e atividade",
        description: "Conecte seus dados para uma visão mais completa da sua saúde.",
        detail:
          "Esta etapa explica como sinais de atividade, rotina e saúde podem ser usados para enriquecer o acompanhamento. A conexão continua opcional e revisável depois.",
      },
    ],
  },
  {
    number: 2,
    title: "Preferências de cuidado",
    heroTitle: "Agora vamos ajustar seu cuidado.",
    heroDescription: "Defina seu ritmo, lembretes e canais preferidos para receber o suporte ideal no seu dia a dia.",
    heading: "Preferências de cuidado",
    description: "Ajuste o ritmo de acompanhamento, os lembretes e os canais para receber comunicações do Care Plus.",
    estimatedDuration: "2 min",
    nextStepLabel: "Próxima etapa",
    nextStepValue: "confirmação final",
    primaryActionLabel: "Salvar e continuar",
    nextCardDescription: "Ajuste ritmo, lembretes e acompanhamento.",
  },
  {
    number: 3,
    title: "Confirmação final",
    heroTitle: "Tudo pronto para começar.",
    heroDescription: "Revise o resumo ao lado e conclua sua configuração. Estamos prontos para cuidar de você.",
    heading: "Confirmação final",
    description: "Revise os pontos essenciais da sua configuração antes de começar.",
    estimatedDuration: "30 seg",
    nextStepLabel: "Pronto para concluir",
    nextStepValue: "Tudo certo para iniciarmos sua jornada de cuidado.",
    primaryActionLabel: "Concluir configuração",
    nextCardDescription: "Revise e confirme suas escolhas.",
  },
];

const flowJourneySteps = [
  ...onboardingSteps.map(({ number, title }) => ({ number, title })),
  { number: 4, title: "Planos" },
];

const cadenceOptions = [
  {
    key: "leve",
    label: "Leve",
    support: "Menos interações",
    icon: Sparkles,
  },
  {
    key: "equilibrado",
    label: "Equilibrado",
    support: "Recomendado",
    icon: ShieldCheck,
  },
  {
    key: "intensivo",
    label: "Intensivo",
    support: "Mais interações",
    icon: Activity,
  },
];

const reminderOptions = [
  {
    key: "hidratacao",
    label: "Hidratação",
    support: "Hora beber água",
    icon: Droplets,
  },
  {
    key: "atividade",
    label: "Atividade física",
    support: "Movimente-se e mantenha a constância",
    icon: Activity,
  },
  {
    key: "sono",
    label: "Sono",
    support: "Rotina de sono e qualidade do descanso",
    icon: Moon,
  },
  {
    key: "medicacao",
    label: "Medicação",
    support: "Horários e reposição de medicamentos",
    icon: Pill,
  },
];

const channelOptions = [
  {
    key: "app",
    label: "App",
    icon: Smartphone,
  },
  {
    key: "email",
    label: "E-mail",
    icon: Mail,
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    icon: MessageCircle,
  },
];

const timeSlotOptions = [
  {
    key: "manha",
    label: "Manhã",
    support: "07h - 11h",
    icon: SunMedium,
  },
  {
    key: "tarde",
    label: "Tarde",
    support: "12h - 17h",
    icon: Sun,
  },
  {
    key: "noite",
    label: "Noite",
    support: "18h - 21h",
    icon: Moon,
  },
];

const stepOneDataFieldConfig = [
  { key: "fullName", label: "Nome", icon: User, autoComplete: "name" },
  { key: "email", label: "E-mail", icon: Mail, autoComplete: "email", type: "email" },
  { key: "phone", label: "Celular", icon: Smartphone, autoComplete: "tel", inputMode: "numeric" },
  { key: "cpf", label: "CPF", icon: ShieldCheck, inputMode: "numeric" },
  { key: "birthDate", label: "Nascimento", icon: Clock3, inputMode: "numeric" },
];

const finalDataFieldConfig = [
  { key: "fullName", label: "Nome", icon: User, autoComplete: "name" },
  { key: "email", label: "E-mail", icon: Mail, autoComplete: "email", type: "email" },
  { key: "phone", label: "Celular", icon: Smartphone, autoComplete: "tel", inputMode: "numeric" },
];

const fallbackLoginAccount = {
  fullName: "Maria Clara Souza",
  email: "maria.clara@careplus.com",
  phone: "(11) 98765-5678",
  cpf: "529.982.247-25",
  birthDate: "14/08/1994",
};

const defaultCarePreferences = {
  cadence: "equilibrado",
  reminders: {
    hidratacao: true,
    atividade: true,
    sono: false,
    medicacao: true,
  },
  channels: {
    app: true,
    email: true,
    whatsapp: false,
  },
  idealWindow: "manha",
};

function createCarePreferencesSnapshot(preferences = defaultCarePreferences) {
  return {
    cadence: preferences.cadence ?? defaultCarePreferences.cadence,
    reminders: {
      hidratacao: preferences.reminders?.hidratacao ?? defaultCarePreferences.reminders.hidratacao,
      atividade: preferences.reminders?.atividade ?? defaultCarePreferences.reminders.atividade,
      sono: preferences.reminders?.sono ?? defaultCarePreferences.reminders.sono,
      medicacao: preferences.reminders?.medicacao ?? defaultCarePreferences.reminders.medicacao,
    },
    channels: {
      app: preferences.channels?.app ?? defaultCarePreferences.channels.app,
      email: preferences.channels?.email ?? defaultCarePreferences.channels.email,
      whatsapp: preferences.channels?.whatsapp ?? defaultCarePreferences.channels.whatsapp,
    },
    idealWindow: preferences.idealWindow ?? defaultCarePreferences.idealWindow,
  };
}

function normalizeOnboardingStepNumber(value) {
  const parsedValue = Number(value);

  if (!Number.isFinite(parsedValue)) {
    return 1;
  }

  return Math.min(Math.max(Math.trunc(parsedValue), 1), onboardingSteps.length);
}

function buildFlowContext(navigationState, storedContext) {
  return {
    origin: navigationState?.origin ?? storedContext?.origin ?? null,
    account: navigationState?.account ?? storedContext?.account ?? null,
    email: navigationState?.email ?? storedContext?.email ?? "",
    currentStepNumber: normalizeOnboardingStepNumber(
      navigationState?.currentStepNumber ?? storedContext?.currentStepNumber ?? 1,
    ),
    preferences: createCarePreferencesSnapshot(navigationState?.preferences ?? storedContext?.preferences),
    selectedPlan: navigationState?.selectedPlan ?? storedContext?.selectedPlan ?? null,
  };
}

function maskEmail(value) {
  if (!value) {
    return "";
  }

  const [localPart, domain] = value.split("@");

  if (!localPart || !domain) {
    return value;
  }

  const visible = localPart.slice(0, Math.min(2, localPart.length));

  return `${visible}****@${domain}`;
}

function maskPhone(value) {
  const digits = value?.replace(/\D/g, "") ?? "";

  if (digits.length < 10) {
    return value ?? "";
  }

  const areaCode = digits.slice(0, 2);
  const firstDigit = digits.length === 11 ? digits.slice(2, 3) : "";
  const lastFour = digits.slice(-4);

  return digits.length === 11 ? `(${areaCode}) ${firstDigit}****-${lastFour}` : `(${areaCode}) ****-${lastFour}`;
}

function maskCpf(value) {
  const digits = value?.replace(/\D/g, "") ?? "";

  if (digits.length !== 11) {
    return value ?? "";
  }

  return `${digits.slice(0, 3)}.***.***-${digits.slice(-2)}`;
}

function maskBirthDate(value) {
  if (!value) {
    return "";
  }

  const digits = value.replace(/\D/g, "");

  if (digits.length === 8) {
    return `**/**/${digits.slice(-4)}`;
  }

  if (value.includes("/")) {
    const parts = value.split("/");

    if (parts.length === 3) {
      return `**/**/${parts[2]}`;
    }
  }

  return value;
}

function resolveDisplayAccount(origin, account, emailFromLogin) {
  if (origin === "signup" && account) {
    return {
      fullName: account.fullName?.trim() || fallbackLoginAccount.fullName,
      email: account.email?.trim() || fallbackLoginAccount.email,
      phone: account.phone || fallbackLoginAccount.phone,
      cpf: account.cpf || fallbackLoginAccount.cpf,
      birthDate: account.birthDate || fallbackLoginAccount.birthDate,
    };
  }

  return {
    ...fallbackLoginAccount,
    email: emailFromLogin?.trim() || fallbackLoginAccount.email,
  };
}

function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (!digits) {
    return "";
  }

  if (digits.length <= 2) {
    return `(${digits}`;
  }

  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }

  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function normalizeDraftValue(name, value) {
  if (name === "phone") {
    return formatPhone(value);
  }

  return value;
}

function formatList(values) {
  if (values.length === 0) {
    return "Nenhum selecionado";
  }

  if (values.length === 1) {
    return values[0];
  }

  if (values.length === 2) {
    return `${values[0]} e ${values[1]}`;
  }

  return `${values.slice(0, -1).join(", ")} e ${values.at(-1)}`;
}

function buildIncomingFlowKey(incomingFlowContext) {
  return JSON.stringify({
    origin: incomingFlowContext.origin,
    account: incomingFlowContext.account,
    email: incomingFlowContext.email,
    currentStepNumber: incomingFlowContext.currentStepNumber,
    preferences: incomingFlowContext.preferences,
    selectedPlan: incomingFlowContext.selectedPlan,
  });
}

function OnboardingFlowScreen({ incomingFlowContext }) {
  const navigate = useNavigate();
  const origin = incomingFlowContext.origin;
  const emailFromLogin = incomingFlowContext.email;
  const isSignupFlow = origin === "signup";
  const authBackRoute = isSignupFlow ? "/cadastro" : "/login";
  const authBackLabel = isSignupFlow ? "Voltar para o cadastro" : "Voltar para o login";
  const [currentStepNumber, setCurrentStepNumber] = useState(() => incomingFlowContext.currentStepNumber);
  const [displayAccount, setDisplayAccount] = useState(() =>
    resolveDisplayAccount(incomingFlowContext.origin, incomingFlowContext.account, incomingFlowContext.email),
  );
  const [draftAccount, setDraftAccount] = useState(() =>
    resolveDisplayAccount(incomingFlowContext.origin, incomingFlowContext.account, incomingFlowContext.email),
  );
  const [isEditingData, setIsEditingData] = useState(false);
  const [expandedPermissionKey, setExpandedPermissionKey] = useState("");
  const [carePreferences, setCarePreferences] = useState(() => createCarePreferencesSnapshot(incomingFlowContext.preferences));
  const selectedPlan = getPlanByKey(incomingFlowContext.selectedPlan?.key) ?? incomingFlowContext.selectedPlan ?? null;

  const currentStep = onboardingSteps.find((step) => step.number === currentStepNumber) ?? onboardingSteps[0];
  const upcomingSteps = onboardingSteps.filter((step) => step.number > currentStepNumber);

  const selectedReminderLabels = useMemo(
    () => reminderOptions.filter((option) => carePreferences.reminders[option.key]).map((option) => option.label.toLowerCase()),
    [carePreferences.reminders],
  );
  const selectedChannelLabels = useMemo(
    () => channelOptions.filter((option) => carePreferences.channels[option.key]).map((option) => option.label),
    [carePreferences.channels],
  );
  const selectedCadence = cadenceOptions.find((option) => option.key === carePreferences.cadence) ?? cadenceOptions[1];
  const selectedTimeSlot = timeSlotOptions.find((option) => option.key === carePreferences.idealWindow) ?? timeSlotOptions[0];

  const stepOneDataItems = [
    { key: "fullName", label: "Nome", icon: User, value: displayAccount.fullName },
    { key: "email", label: "E-mail", icon: Mail, value: maskEmail(displayAccount.email) },
    { key: "phone", label: "Celular", icon: Smartphone, value: maskPhone(displayAccount.phone) },
    { key: "cpf", label: "CPF", icon: ShieldCheck, value: maskCpf(displayAccount.cpf) },
    { key: "birthDate", label: "Nascimento", icon: Clock3, value: maskBirthDate(displayAccount.birthDate) },
  ];

  const finalDataItems = [
    { key: "fullName", label: "Nome", icon: User, value: displayAccount.fullName },
    { key: "email", label: "E-mail", icon: Mail, value: maskEmail(displayAccount.email) },
    { key: "phone", label: "Celular", icon: Smartphone, value: maskPhone(displayAccount.phone) },
  ];

  useEffect(() => {
    document.title = "Care Plus | Onboarding";
  }, []);

  useEffect(() => {
    if (!origin) {
      return;
    }

    writeOnboardingFlowContext({
      origin,
      account: displayAccount,
      email: emailFromLogin,
      currentStepNumber,
      preferences: carePreferences,
      selectedPlan,
    });
  }, [origin, displayAccount, emailFromLogin, currentStepNumber, carePreferences, selectedPlan]);

  function buildFlowState(overrides = {}) {
    return {
      origin,
      account: displayAccount,
      email: emailFromLogin,
      currentStepNumber,
      preferences: carePreferences,
      selectedPlan,
      ...overrides,
    };
  }

  function getTimelineStatus(stepNumber) {
    if (stepNumber < currentStepNumber) {
      return "Concluído";
    }

    if (stepNumber === currentStepNumber) {
      return "Agora";
    }

    if (stepNumber === currentStepNumber + 1) {
      return stepNumber === 4 ? "Próximo passo" : "Próximo";
    }

    return "Depois";
  }

  function handleDraftChange(event) {
    const { name, value } = event.target;

    setDraftAccount((currentDraft) => ({
      ...currentDraft,
      [name]: normalizeDraftValue(name, value),
    }));
  }

  function handleStartEditing() {
    setDraftAccount(displayAccount);
    setIsEditingData(true);
  }

  function handleCancelEditing() {
    setDraftAccount(displayAccount);
    setIsEditingData(false);
  }

  function handleSaveEditing() {
    setDisplayAccount((currentAccount) => ({
      ...currentAccount,
      fullName: draftAccount.fullName.trim() || currentAccount.fullName,
      email: draftAccount.email.trim() || currentAccount.email,
      phone: draftAccount.phone.trim() || currentAccount.phone,
      cpf: draftAccount.cpf.trim() || currentAccount.cpf,
      birthDate: draftAccount.birthDate.trim() || currentAccount.birthDate,
    }));
    setIsEditingData(false);
  }

  function handleStepBack() {
    if (currentStepNumber > 1) {
      setCurrentStepNumber((currentValue) => currentValue - 1);
      setIsEditingData(false);
      return;
    }

    navigate(authBackRoute);
  }

  function navigateToPlans() {
    navigate("/planos", {
      state: buildFlowState({ currentStepNumber: 4 }),
    });
  }

  function handleAdvanceStep() {
    if (currentStepNumber < onboardingSteps.length) {
      setCurrentStepNumber((currentValue) => currentValue + 1);
      setIsEditingData(false);
      return;
    }

    navigateToPlans();
  }

  function handleSelectCadence(nextCadence) {
    setCarePreferences((currentPreferences) => ({
      ...currentPreferences,
      cadence: nextCadence,
    }));
  }

  function handleToggleReminder(reminderKey) {
    setCarePreferences((currentPreferences) => ({
      ...currentPreferences,
      reminders: {
        ...currentPreferences.reminders,
        [reminderKey]: !currentPreferences.reminders[reminderKey],
      },
    }));
  }

  function handleToggleChannel(channelKey) {
    setCarePreferences((currentPreferences) => ({
      ...currentPreferences,
      channels: {
        ...currentPreferences.channels,
        [channelKey]: !currentPreferences.channels[channelKey],
      },
    }));
  }

  function handleSelectTimeSlot(timeSlotKey) {
    setCarePreferences((currentPreferences) => ({
      ...currentPreferences,
      idealWindow: timeSlotKey,
    }));
  }

  function handleTogglePermission(permissionTitle) {
    setExpandedPermissionKey((currentValue) => (currentValue === permissionTitle ? "" : permissionTitle));
  }

  function renderTopbarBackAction() {
    if (currentStepNumber > 1) {
      return (
        <button type="button" className="onboarding-back-button" onClick={handleStepBack}>
          <ArrowLeft size={18} aria-hidden="true" />
          <span>Voltar</span>
        </button>
      );
    }

    return (
      <Link to={authBackRoute} className="onboarding-back-button">
        <ArrowLeft size={18} aria-hidden="true" />
        <span>{authBackLabel}</span>
      </Link>
    );
  }

  function renderStepOne() {
    return (
      <>
        <section className="onboarding-main-section" aria-labelledby="onboarding-section-title">
          <div className="onboarding-main-section__header">
            <h2 id="onboarding-section-title">{currentStep.heading}</h2>
            <p>{currentStep.description}</p>
          </div>

          <div className="onboarding-main-section__layout">
            <div className="onboarding-permissions" aria-label="Permissoes iniciais">
              {currentStep.items.map((item) => {
                const Icon = item.icon;
                const isExpanded = expandedPermissionKey === item.title;

                return (
                  <div key={item.title} className={`onboarding-permission-item ${isExpanded ? "is-expanded" : ""}`}>
                    <button
                      type="button"
                      className="onboarding-permission-row"
                      onClick={() => handleTogglePermission(item.title)}
                      aria-expanded={isExpanded}
                    >
                      <span className="onboarding-permission-row__icon" aria-hidden="true">
                        <Icon size={24} />
                      </span>

                      <div className="onboarding-permission-row__copy">
                        <strong>{item.title}</strong>
                        <p>{item.description}</p>
                      </div>

                      <span className="onboarding-permission-row__chevron" aria-hidden="true">
                        <ChevronDown size={20} />
                      </span>
                    </button>

                    {isExpanded ? (
                      <div className="onboarding-permission-detail">
                        <p>{item.detail}</p>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <aside className="onboarding-side-panel" aria-label="Contexto da etapa atual">
              <div className="onboarding-stage-detail">
                <span className="onboarding-stage-detail__icon" aria-hidden="true">
                  <Clock3 size={24} />
                </span>
                <div>
                  <span className="onboarding-stage-detail__label">Tempo estimado</span>
                  <strong>{currentStep.estimatedDuration}</strong>
                </div>
              </div>

              <div className="onboarding-side-panel__divider" aria-hidden="true" />

              <div className="onboarding-stage-detail">
                <span className="onboarding-stage-detail__icon" aria-hidden="true">
                  <LockKeyhole size={24} />
                </span>
                <div>
                  <span className="onboarding-stage-detail__label">{currentStep.nextStepLabel}</span>
                  <strong>{selectedPlan ? `${selectedPlan.title} pronto para confirmar` : currentStep.nextStepValue}</strong>
                </div>
              </div>

              <button type="button" className="onboarding-primary-button" onClick={handleAdvanceStep}>
                <span>{currentStep.primaryActionLabel}</span>
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </aside>
          </div>
        </section>

        <section className="onboarding-data-section" aria-labelledby="onboarding-data-title">
          <div className="onboarding-data-section__header">
            <h3 id="onboarding-data-title">Seus dados</h3>

            <div className="onboarding-data-section__actions">
              {isEditingData ? (
                <>
                  <button
                    type="button"
                    className="onboarding-data-section__action onboarding-data-section__action--secondary"
                    onClick={handleCancelEditing}
                  >
                    <X size={16} aria-hidden="true" />
                    <span>Cancelar</span>
                  </button>

                  <button type="button" className="onboarding-data-section__action" onClick={handleSaveEditing}>
                    <Save size={16} aria-hidden="true" />
                    <span>Salvar</span>
                  </button>
                </>
              ) : (
                <button type="button" className="onboarding-data-section__action" onClick={handleStartEditing}>
                  <PencilLine size={16} aria-hidden="true" />
                  <span>Editar</span>
                </button>
              )}
            </div>
          </div>

          {isEditingData ? (
            <div className="onboarding-data-form onboarding-data-form--five" role="form" aria-label="Editar dados do cadastro">
              {stepOneDataFieldConfig.map((item) => {
                const Icon = item.icon;

                return (
                  <label key={item.key} className="onboarding-data-field">
                    <span className="onboarding-data-field__label">
                      <Icon size={16} aria-hidden="true" />
                      <span>{item.label}</span>
                    </span>
                    <input
                      name={item.key}
                      type={item.type ?? "text"}
                      inputMode={item.inputMode}
                      autoComplete={item.autoComplete}
                      value={draftAccount[item.key]}
                      onChange={handleDraftChange}
                    />
                  </label>
                );
              })}
            </div>
          ) : (
            <div className="onboarding-data-grid onboarding-data-grid--five" role="list" aria-label="Dados resumidos da conta">
              {stepOneDataItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.key} className="onboarding-data-item" role="listitem">
                    <div className="onboarding-data-item__meta">
                      <Icon size={16} aria-hidden="true" />
                      <span>{item.label}</span>
                    </div>
                    <strong>{item.value}</strong>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section className="onboarding-next-section" aria-labelledby="onboarding-next-title">
          <h3 id="onboarding-next-title">Próximas etapas</h3>

          <div className="onboarding-next-rail">
            {upcomingSteps.map((step) => (
              <button key={step.number} type="button" className="onboarding-next-step" onClick={() => setCurrentStepNumber(step.number)}>
                <span className="onboarding-next-step__number" aria-hidden="true">
                  {step.number}
                </span>

                <div className="onboarding-next-step__copy">
                  <strong>{step.title}</strong>
                  <p>{step.nextCardDescription}</p>
                </div>

                <div className="onboarding-next-step__meta">
                  <span className="onboarding-next-step__time">
                    <Clock3 size={14} aria-hidden="true" />
                    <span>{step.estimatedDuration}</span>
                  </span>
                  <ArrowRight size={14} aria-hidden="true" />
                </div>
              </button>
            ))}
          </div>
        </section>

        <div className="onboarding-privacy-note">
          <span className="onboarding-privacy-note__icon" aria-hidden="true">
            <ShieldCheck size={18} />
          </span>
          <p>Suas informacoes estao protegidas e sao usadas para oferecer um cuidado mais personalizado e seguro.</p>
        </div>
      </>
    );
  }

  function renderStepTwo() {
    return (
      <>
        <section className="onboarding-main-section" aria-labelledby="onboarding-section-title">
          <div className="onboarding-main-section__header">
            <h2 id="onboarding-section-title">{currentStep.heading}</h2>
            <p>{currentStep.description}</p>
          </div>

          <div className="onboarding-main-section__layout onboarding-main-section__layout--care">
            <div className="care-stage">
              <section className="care-stage__section" aria-labelledby="cadence-title">
                <div className="care-stage__intro">
                  <h3 id="cadence-title">1. Ritmo de acompanhamento</h3>
                  <p>Escolha a intensidade com que deseja receber orientacoes e lembretes.</p>
                </div>

                <div className="care-cadence-grid">
                  {cadenceOptions.map((option) => {
                    const Icon = option.icon;
                    const isSelected = carePreferences.cadence === option.key;

                    return (
                      <button
                        key={option.key}
                        type="button"
                        className={`care-choice-card ${isSelected ? "is-selected" : ""}`}
                        onClick={() => handleSelectCadence(option.key)}
                      >
                        <span className="care-choice-card__icon" aria-hidden="true">
                          <Icon size={18} />
                        </span>

                        <span className="care-choice-card__copy">
                          <strong>{option.label}</strong>
                          <span>{option.support}</span>
                        </span>

                        {isSelected ? (
                          <span className="care-choice-card__check" aria-hidden="true">
                            <Check size={14} />
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="care-stage__section" aria-labelledby="reminders-title">
                <div className="care-stage__intro">
                  <h3 id="reminders-title">2. Lembretes</h3>
                  <p>Escolha sobre o que deseja receber lembretes.</p>
                </div>

                <div className="care-reminders-list">
                  {reminderOptions.map((option) => {
                    const Icon = option.icon;
                    const isEnabled = carePreferences.reminders[option.key];

                    return (
                      <div key={option.key} className="care-reminder-row">
                        <div className="care-reminder-row__copy">
                          <span className="care-reminder-row__icon" aria-hidden="true">
                            <Icon size={19} />
                          </span>

                          <div>
                            <strong>{option.label}</strong>
                            <p>{option.support}</p>
                          </div>
                        </div>

                        <button
                          type="button"
                          className={`care-switch ${isEnabled ? "is-active" : ""}`}
                          onClick={() => handleToggleReminder(option.key)}
                          aria-pressed={isEnabled}
                          aria-label={`${isEnabled ? "Desativar" : "Ativar"} lembrete de ${option.label}`}
                        >
                          <span className="care-switch__thumb" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </section>

              <div className="care-stage__preferences-grid">
                <section className="care-stage__section care-stage__section--channels" aria-labelledby="channels-title">
                  <div className="care-stage__intro">
                    <h3 id="channels-title">3. Canais preferidos</h3>
                    <p>Como você prefere receber nossas comunicações.</p>
                  </div>

                  <div className="care-chip-grid">
                    {channelOptions.map((option) => {
                      const Icon = option.icon;
                      const isSelected = carePreferences.channels[option.key];

                      return (
                        <button
                          key={option.key}
                          type="button"
                          className={`care-chip care-chip--channel ${isSelected ? "is-selected" : ""}`}
                          onClick={() => handleToggleChannel(option.key)}
                          aria-pressed={isSelected}
                        >
                          <span className="care-chip__icon" aria-hidden="true">
                            <Icon size={18} />
                          </span>
                          <span className="care-chip__label">{option.label}</span>
                          {isSelected ? (
                            <span className="care-chip__check" aria-hidden="true">
                              <Check size={12} />
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>

                  <div className="care-stage__footnote">
                    <span className="care-stage__footnote-icon" aria-hidden="true">
                      <Info size={14} />
                    </span>
                    <p>Você sempre poderá ajustar seus canais nas configurações.</p>
                  </div>
                </section>

                <section className="care-stage__section care-stage__section--times" aria-labelledby="time-slot-title">
                  <div className="care-stage__intro">
                    <h3 id="time-slot-title">4. Horário ideal</h3>
                    <p>Quando você prefere receber lembretes.</p>
                  </div>

                  <div className="care-chip-grid care-chip-grid--times">
                    {timeSlotOptions.map((option) => {
                      const Icon = option.icon;
                      const isSelected = carePreferences.idealWindow === option.key;

                      return (
                        <button
                          key={option.key}
                          type="button"
                          className={`care-chip care-chip--time ${isSelected ? "is-selected" : ""}`}
                          onClick={() => handleSelectTimeSlot(option.key)}
                          aria-pressed={isSelected}
                        >
                          <span className="care-chip__icon" aria-hidden="true">
                            <Icon size={18} />
                          </span>
                          <span className="care-chip__stack">
                            <strong>{option.label}</strong>
                            <span>{option.support}</span>
                          </span>
                          {isSelected ? (
                            <span className="care-chip__check" aria-hidden="true">
                              <Check size={12} />
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </section>
              </div>
            </div>

            <aside className="onboarding-side-panel" aria-label="Resumo da etapa atual">
              <div className="onboarding-stage-detail">
                <span className="onboarding-stage-detail__icon" aria-hidden="true">
                  <Clock3 size={24} />
                </span>
                <div>
                  <span className="onboarding-stage-detail__label">Tempo estimado</span>
                  <strong>{currentStep.estimatedDuration}</strong>
                </div>
              </div>

              <div className="onboarding-side-panel__divider" aria-hidden="true" />

              <div className="onboarding-stage-detail">
                <span className="onboarding-stage-detail__icon" aria-hidden="true">
                  <LockKeyhole size={24} />
                </span>
                <div>
                  <span className="onboarding-stage-detail__label">{currentStep.nextStepLabel}</span>
                  <strong>{currentStep.nextStepValue}</strong>
                </div>
              </div>

              <button type="button" className="onboarding-primary-button" onClick={handleAdvanceStep}>
                <span>{currentStep.primaryActionLabel}</span>
                <ArrowRight size={18} aria-hidden="true" />
              </button>

              <button type="button" className="onboarding-text-button" onClick={handleStepBack}>
                Voltar
              </button>
            </aside>
          </div>
        </section>

        <section className="onboarding-next-section" aria-labelledby="onboarding-next-title">
          <h3 id="onboarding-next-title">Proximas etapas</h3>

          <button type="button" className="onboarding-next-stage-card" onClick={() => setCurrentStepNumber(3)}>
            <span className="onboarding-next-stage-card__number" aria-hidden="true">
              3
            </span>

            <div className="onboarding-next-stage-card__copy">
              <strong>Confirmação final</strong>
              <p>Revise e confirme suas escolhas.</p>
            </div>

            <span className="onboarding-next-stage-card__meta">
              <Clock3 size={14} aria-hidden="true" />
              <span>30 seg</span>
            </span>
          </button>
        </section>

        <div className="onboarding-privacy-note">
          <span className="onboarding-privacy-note__icon" aria-hidden="true">
            <ShieldCheck size={18} />
          </span>
          <p>Suas informações estão protegidas e são usadas para oferecer um cuidado mais personalizado e seguro.</p>
        </div>
      </>
    );
  }

  function renderStepThree() {
    return (
      <>
        <section className="onboarding-main-section" aria-labelledby="onboarding-section-title">
          <div className="onboarding-main-section__header">
            <h2 id="onboarding-section-title">{currentStep.heading}</h2>
            <p>{currentStep.description}</p>
          </div>

          <div className="onboarding-main-section__layout onboarding-main-section__layout--summary">
            <div className="onboarding-summary-card">
              <h3>Resumo da configuração</h3>

              <div className="onboarding-summary-list">
                <div className="onboarding-summary-row">
                  <span className="onboarding-summary-row__icon" aria-hidden="true">
                    <ShieldCheck size={20} />
                  </span>
                  <span className="onboarding-summary-row__label">Permissões e ajustes</span>
                  <strong>Concluído</strong>
                </div>

                <div className="onboarding-summary-row">
                  <span className="onboarding-summary-row__icon" aria-hidden="true">
                    <User size={20} />
                  </span>
                  <span className="onboarding-summary-row__label">Preferências de cuidado</span>
                  <strong>{selectedCadence.label}</strong>
                </div>

                <div className="onboarding-summary-row">
                  <span className="onboarding-summary-row__icon" aria-hidden="true">
                    <Bell size={20} />
                  </span>
                  <span className="onboarding-summary-row__label">Lembretes ativos</span>
                  <strong>{formatList(selectedReminderLabels)}</strong>
                </div>

                <div className="onboarding-summary-row">
                  <span className="onboarding-summary-row__icon" aria-hidden="true">
                    <MessageCircle size={20} />
                  </span>
                  <span className="onboarding-summary-row__label">Canais preferidos</span>
                  <strong>{formatList(selectedChannelLabels)}</strong>
                </div>

                <div className="onboarding-summary-row">
                  <span className="onboarding-summary-row__icon" aria-hidden="true">
                    <Clock3 size={20} />
                  </span>
                  <span className="onboarding-summary-row__label">Horário ideal</span>
                  <strong>{selectedTimeSlot.label}</strong>
                </div>

                <div className="onboarding-summary-row">
                  <span className="onboarding-summary-row__icon" aria-hidden="true">
                    <Sparkles size={20} />
                  </span>
                  <span className="onboarding-summary-row__label">Plano</span>
                  <strong>{selectedPlan?.title ?? "Ainda nao escolhido"}</strong>
                </div>
              </div>
            </div>

            <aside className="onboarding-side-panel" aria-label="Resumo da etapa final">
              <div className="onboarding-stage-detail">
                <span className="onboarding-stage-detail__icon" aria-hidden="true">
                  <Clock3 size={24} />
                </span>
                <div>
                  <span className="onboarding-stage-detail__label">Tempo estimado</span>
                  <strong>{currentStep.estimatedDuration}</strong>
                </div>
              </div>

              <div className="onboarding-side-panel__divider" aria-hidden="true" />

              <div className="onboarding-stage-detail">
                <span className="onboarding-stage-detail__icon" aria-hidden="true">
                  <ShieldCheck size={24} />
                </span>
                <div>
                  <span className="onboarding-stage-detail__label">{currentStep.nextStepLabel}</span>
                  <strong>{currentStep.nextStepValue}</strong>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="onboarding-data-section" aria-labelledby="onboarding-data-title">
          <div className="onboarding-data-section__header">
            <h3 id="onboarding-data-title">Seus dados</h3>

            <div className="onboarding-data-section__actions">
              {isEditingData ? (
                <>
                  <button
                    type="button"
                    className="onboarding-data-section__action onboarding-data-section__action--secondary"
                    onClick={handleCancelEditing}
                  >
                    <X size={16} aria-hidden="true" />
                    <span>Cancelar</span>
                  </button>

                  <button type="button" className="onboarding-data-section__action" onClick={handleSaveEditing}>
                    <Save size={16} aria-hidden="true" />
                    <span>Salvar</span>
                  </button>
                </>
              ) : (
                <button type="button" className="onboarding-data-section__action" onClick={handleStartEditing}>
                  <PencilLine size={16} aria-hidden="true" />
                  <span>Editar</span>
                </button>
              )}
            </div>
          </div>

          {isEditingData ? (
            <div className="onboarding-data-form" role="form" aria-label="Editar dados principais">
              {finalDataFieldConfig.map((item) => {
                const Icon = item.icon;

                return (
                  <label key={item.key} className="onboarding-data-field">
                    <span className="onboarding-data-field__label">
                      <Icon size={16} aria-hidden="true" />
                      <span>{item.label}</span>
                    </span>
                    <input
                      name={item.key}
                      type={item.type ?? "text"}
                      inputMode={item.inputMode}
                      autoComplete={item.autoComplete}
                      value={draftAccount[item.key]}
                      onChange={handleDraftChange}
                    />
                  </label>
                );
              })}
            </div>
          ) : (
            <div className="onboarding-data-grid" role="list" aria-label="Dados resumidos da conta">
              {finalDataItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.key} className="onboarding-data-item" role="listitem">
                    <div className="onboarding-data-item__meta">
                      <Icon size={16} aria-hidden="true" />
                      <span>{item.label}</span>
                    </div>
                    <strong>{item.value}</strong>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section className="onboarding-final-actions" aria-label="Ações finais da configuração">
          <div className="onboarding-final-note">
            <span className="onboarding-final-note__icon" aria-hidden="true">
              <ShieldCheck size={20} />
            </span>
            <div>
              <strong>Você poderá ajustar essas escolhas depois, no aplicativo.</strong>
              <p>Seu plano de cuidado evolui com você.</p>
            </div>
          </div>

          <button type="button" className="onboarding-text-button" onClick={() => setCurrentStepNumber(2)}>
            Editar preferências
          </button>

          <button type="button" className="onboarding-primary-button" onClick={handleAdvanceStep}>
            <span>{selectedPlan ? "Revisar ou trocar plano" : currentStep.primaryActionLabel}</span>
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </section>

        <button type="button" className="onboarding-next-destination" onClick={navigateToPlans} aria-label="Ir para a tela de planos">
          <span className="onboarding-next-destination__icon" aria-hidden="true">
            <ArrowRight size={20} />
          </span>
          <div className="onboarding-next-destination__copy">
            <strong>Próximo: conhecer os planos e recursos do Care Plus</strong>
            <p>Vamos apresentar as opções disponíveis para você e como podemos ajudar.</p>
          </div>
        </button>
      </>
    );
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        Pular para o conteudo
      </a>

      <main id="main-content" className="product-page onboarding-shell">
        <section className="onboarding-page" aria-labelledby="onboarding-title">
          <div className="container-fluid custom-container">
            <div className="onboarding-stage-grid">
              <aside className="onboarding-hero-panel" aria-label="Resumo da jornada de onboarding">
                <Link to="/" className="onboarding-brand" aria-label="Ir para a home do Care Plus">
                  <img src={CarePlus} alt="Care Plus" className="onboarding-brand__logo" />
                </Link>

                <div className="onboarding-hero-panel__body">
                  <div className="onboarding-hero-panel__copy">
                    <h1 id="onboarding-title">{currentStep.heroTitle}</h1>
                    <p>{currentStep.heroDescription}</p>
                  </div>

                  <div className="onboarding-journey" aria-label="Etapas do onboarding">
                    {flowJourneySteps.map((step) => (
                      <div
                        key={step.number}
                        className={`onboarding-journey__step ${step.number === currentStepNumber ? "is-current" : ""} ${
                          step.number < currentStepNumber ? "is-completed" : ""
                        }`}
                      >
                        <span className="onboarding-journey__marker" aria-hidden="true">
                          {step.number}
                        </span>
                        <div className="onboarding-journey__text">
                          <strong>{step.title}</strong>
                          <span>{getTimelineStatus(step.number)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="onboarding-hero-panel__pulse" aria-hidden="true">
                  <div className="onboarding-hero-panel__pulse-line" />
                  <span className="onboarding-hero-panel__pulse-dot" />
                </div>
              </aside>

              <div className="onboarding-content-panel">
                <header className="onboarding-topbar">
                  <span className="onboarding-step-pill">{`Etapa ${currentStep.number} de ${onboardingSteps.length}`}</span>
                  {renderTopbarBackAction()}
                </header>

                <div className="onboarding-content-panel__inner">
                  {currentStepNumber === 1 ? renderStepOne() : null}
                  {currentStepNumber === 2 ? renderStepTwo() : null}
                  {currentStepNumber === 3 ? renderStepThree() : null}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function OnboardingPage() {
  const location = useLocation();
  const incomingFlowContext = buildFlowContext(location.state, readOnboardingFlowContext());
  const flowResetKey = buildIncomingFlowKey(incomingFlowContext);

  return <OnboardingFlowScreen key={flowResetKey} incomingFlowContext={incomingFlowContext} />;
}

export default OnboardingPage;
