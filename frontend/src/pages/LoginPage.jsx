import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Flame,
  Info,
  Lock,
  Mail,
  ShieldCheck,
  Target,
  TrendingUp,
} from "lucide-react";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import ProductLayout from "../layouts/product/ProductLayout";
import "./login-page.css";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const initialValues = {
  email: "",
  password: "",
};

const valueCards = [
  {
    icon: Flame,
    title: "Streak de cuidado",
    description: "Volte no seu ritmo para manter sua consistencia sem pressao.",
  },
  {
    icon: Target,
    title: "Missoes com proposito",
    description: "Receba proximos passos simples para transformar intencao em rotina.",
  },
  {
    icon: TrendingUp,
    title: "Evolucao que aparece",
    description: "Acompanhe o que avancou e o que merece atencao, sem excesso de informacao.",
  },
];

function validateField(name, value) {
  if (name === "email") {
    if (!value.trim()) {
      return "Informe seu e-mail para continuar.";
    }

    if (!emailPattern.test(value)) {
      return "Digite um e-mail valido, como nome@exemplo.com.";
    }
  }

  if (name === "password") {
    if (!value.trim()) {
      return "Informe sua senha para entrar.";
    }

    if (value.trim().length < 8) {
      return "Sua senha precisa ter pelo menos 8 caracteres.";
    }
  }

  return "";
}

function validateForm(values) {
  const nextErrors = {};

  Object.entries(values).forEach(([name, value]) => {
    const error = validateField(name, value);

    if (error) {
      nextErrors[name] = error;
    }
  });

  return nextErrors;
}

function LoginPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [helperMessage, setHelperMessage] = useState(null);

  useEffect(() => {
    document.title = "Care Plus | Login";
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    const nextValues = {
      ...values,
      [name]: value,
    };

    setValues(nextValues);

    if (touched[name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: validateField(name, value),
      }));
    }
  }

  function handleBlur(event) {
    const { name, value } = event.target;

    setTouched((currentTouched) => ({
      ...currentTouched,
      [name]: true,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: validateField(name, value),
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validateForm(values);

    setTouched({
      email: true,
      password: true,
    });
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setHelperMessage({
        tone: "error",
        title: "Revise os campos para continuar.",
        text: "Preencha ou corrija os campos destacados para entrar com seguranca no Care Plus.",
      });
      return;
    }

    navigate("/onboarding", {
      state: {
        email: values.email,
      },
    });
  }

  function showTemporaryMessage(message) {
    setHelperMessage({
      tone: "info",
      text: message,
    });
  }

  return (
    <ProductLayout contextLabel="Entrada do app" compactMobileHeader>
      <section className="login-page">
        <div className="container-fluid custom-container">
          <div className="login-grid">
            <div className="login-hero">
              <span className="section-eyebrow">Por que voltar ao Care Plus</span>
              <h1>Seu cuidado continua de onde voce parou.</h1>
              <p>
                Retome habitos leves com missoes discretas, sequencia de cuidado e evolucao facil
                de acompanhar no seu ritmo.
              </p>

              <div className="login-hero__cards">
                {valueCards.map((card) => {
                  const IconComponent = card.icon;

                  return (
                    <article className="login-hero__card" key={card.title}>
                      <span className="login-hero__icon">
                        <IconComponent size={18} aria-hidden="true" />
                      </span>
                      <div>
                        <strong>{card.title}</strong>
                        <p>{card.description}</p>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="login-hero__trust">
                <ShieldCheck size={18} aria-hidden="true" />
                <span>Dados de saude continuam opcionais ate voce revisar e autorizar cada conexao.</span>
              </div>
            </div>

            <div className="login-card">
              <div className="login-card__header">
                <span className="login-card__eyebrow">Entrar no Care Plus</span>
                <h2>
                  <span className="login-card__title-desktop">Acesse seu espaco no Care Plus</span>
                  <span className="login-card__title-mobile">Entre no Care Plus</span>
                </h2>
                <p>Entre com sua conta para revisar missoes, sequencia de cuidado e preferencias de privacidade.</p>
              </div>

              <div className="login-socials">
                <button
                  type="button"
                  className="login-socials__button"
                  onClick={() =>
                    showTemporaryMessage("A autenticacao com Google sera conectada na proxima etapa. Por agora, siga com seu e-mail.")
                  }
                >
                  <FcGoogle size={20} aria-hidden="true" />
                  <span>Continuar com Google</span>
                </button>

                <button
                  type="button"
                  className="login-socials__button"
                  onClick={() =>
                    showTemporaryMessage("A autenticacao com Apple tambem entra na proxima etapa. Neste prototipo, use seu e-mail.")
                  }
                >
                  <FaApple size={18} aria-hidden="true" />
                  <span>Continuar com Apple</span>
                </button>
              </div>

              {helperMessage ? (
                <div
                  className={`login-helper-message is-${helperMessage.tone}`}
                  aria-live={helperMessage.tone === "error" ? "assertive" : "polite"}
                  role={helperMessage.tone === "error" ? "alert" : undefined}
                >
                  <span className="login-helper-message__icon" aria-hidden="true">
                    {helperMessage.tone === "error" ? <AlertCircle size={18} /> : <Info size={18} />}
                  </span>
                  <div>
                    {helperMessage.title ? <strong>{helperMessage.title}</strong> : null}
                    <p>{helperMessage.text}</p>
                  </div>
                </div>
              ) : null}

              <div className="login-divider">
                <span>ou entre com seu e-mail</span>
              </div>

              <form className="login-form" noValidate onSubmit={handleSubmit}>
                <div className={`login-field ${errors.email && touched.email ? "is-error" : ""}`}>
                  <label htmlFor="email">E-mail</label>
                  <div className="login-input">
                    <Mail size={18} aria-hidden="true" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="voce@exemplo.com"
                      autoComplete="email"
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      aria-invalid={errors.email && touched.email ? "true" : "false"}
                      aria-describedby={errors.email && touched.email ? "email-error" : undefined}
                    />
                  </div>
                  {errors.email && touched.email ? (
                    <p className="login-field__error" id="email-error" role="alert">
                      {errors.email}
                    </p>
                  ) : null}
                </div>

                <div className={`login-field ${errors.password && touched.password ? "is-error" : ""}`}>
                  <label htmlFor="password">Senha</label>
                  <div className="login-input">
                    <Lock size={18} aria-hidden="true" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Minimo de 8 caracteres"
                      autoComplete="current-password"
                      value={values.password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      aria-invalid={errors.password && touched.password ? "true" : "false"}
                      aria-describedby={errors.password && touched.password ? "password-error" : undefined}
                    />

                    <button
                      type="button"
                      className="login-input__toggle"
                      onClick={() => setShowPassword((currentValue) => !currentValue)}
                      aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    >
                      {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
                    </button>
                  </div>
                  {errors.password && touched.password ? (
                    <p className="login-field__error" id="password-error" role="alert">
                      {errors.password}
                    </p>
                  ) : null}
                </div>

                <button type="submit" className="login-submit">
                  Entrar no Care Plus
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              </form>

              <div className="login-secondary-actions">
                <button
                  type="button"
                  className="login-text-button"
                  onClick={() =>
                    showTemporaryMessage("A recuperacao de senha entra na proxima etapa. Neste prototipo, use qualquer senha valida para seguir.")
                  }
                >
                  Esqueci minha senha
                </button>

                <Link to="/cadastro" className="login-text-button">
                  Criar conta
                </Link>
              </div>

              <div className="login-trust-block">
                <div className="login-trust-block__icon">
                  <ShieldCheck size={18} aria-hidden="true" />
                </div>
                <div>
                  <strong className="login-trust-block__desktop-copy">Conexoes de saude so entram com sua escolha.</strong>
                  <strong className="login-trust-block__mobile-copy">Voce decide suas conexoes.</strong>
                  <p className="login-trust-block__desktop-copy">
                    Nada e conectado automaticamente. Voce revisa cada permissao antes de ativar dados de saude e pode voltar a esse controle depois.
                  </p>
                  <p className="login-trust-block__mobile-copy">Nada conecta sem sua revisao e consentimento.</p>
                </div>
              </div>

              <p className="login-card__footer">
                Depois do login, voce entra primeiro na sua base inicial. Consentimentos aparecem com contexto, conexoes seguem opcionais e suas proximas missoes ficam organizadas no mesmo fluxo.
              </p>

              <Link className="login-back-link" to="/">
                Voltar para a home institucional-produto
              </Link>
            </div>
          </div>
        </div>
      </section>
    </ProductLayout>
  );
}

export default LoginPage;
