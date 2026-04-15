import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Award,
  Eye,
  EyeOff,
  Flame,
  Lock,
  Mail,
  ShieldCheck,
  Target,
  TrendingUp,
} from "lucide-react";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import ProductLayout from "../components/ProductLayout";
import "../styles/login.css";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const initialValues = {
  email: "",
  password: "",
};

const valueCards = [
  {
    icon: Flame,
    title: "Streak de cuidado",
    description: "Volte no seu ritmo para manter sua consistência sem pressão.",
  },
  {
    icon: Target,
    title: "Missões com propósito",
    description: "Receba próximos passos simples para transformar intenção em rotina.",
  },
  {
    icon: TrendingUp,
    title: "Evolução que aparece",
    description: "Acompanhe o que avançou e o que merece atenção, sem excesso de informação.",
  },
];

const mobileHighlights = [
  {
    title: "Missões leves",
    description: "Retome o ritmo com passos simples e bem guiados.",
  },
  {
    title: "Progresso claro",
    description: "Veja o que avançou sem sobrecarga visual.",
  },
];

function validateField(name, value) {
  if (name === "email") {
    if (!value.trim()) {
      return "Informe seu e-mail para continuar.";
    }

    if (!emailPattern.test(value)) {
      return "Digite um e-mail válido, como nome@exemplo.com.";
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

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [helperMessage, setHelperMessage] = useState("");

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
      setHelperMessage("Revise os campos destacados para entrar.");
      return;
    }

    navigate("/onboarding", {
      state: {
        email: values.email,
      },
    });
  }

  function showTemporaryMessage(message) {
    setHelperMessage(message);
  }

  return (
    <ProductLayout contextLabel="Entrada do app">
      <section className="login-page">
        <div className="container-fluid custom-container">
          <div className="login-grid">
            <div className="login-hero">
              <span className="section-eyebrow">Por que voltar ao Care Plus</span>
              <h1>Seu cuidado continua de onde você parou.</h1>
              <p>
                Retome hábitos leves com missões discretas, sequência de cuidado e evolução fácil
                de acompanhar no seu ritmo.
              </p>

              <div className="login-hero__summary" aria-label="Resumo do Care Plus">
                {mobileHighlights.map((item) => (
                  <article className="login-hero__summary-item" key={item.title}>
                    <strong>{item.title}</strong>
                    <span>{item.description}</span>
                  </article>
                ))}
              </div>

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
                <span>Seus dados de saúde só serão conectados com seu consentimento.</span>
              </div>
            </div>

            <div className="login-card">
              <div className="login-card__header">
                <span className="login-card__eyebrow">Entrar no Care Plus</span>
                <h2>Acesse seu espaço no Care Plus</h2>
                <p>Entre com sua conta para revisar missões, sequência de cuidado e preferências de privacidade.</p>
              </div>

              <div className="login-socials">
                <button
                  type="button"
                  className="login-socials__button"
                  onClick={() =>
                    showTemporaryMessage("A autenticação com Google será conectada na próxima etapa. Por agora, siga com seu e-mail.")
                  }
                >
                  <FcGoogle size={20} aria-hidden="true" />
                  <span>Continuar com Google</span>
                </button>

                <button
                  type="button"
                  className="login-socials__button"
                  onClick={() =>
                    showTemporaryMessage("A autenticação com Apple também entra na próxima etapa. Neste protótipo, use seu e-mail.")
                  }
                >
                  <FaApple size={18} aria-hidden="true" />
                  <span>Continuar com Apple</span>
                </button>
              </div>

              {helperMessage ? (
                <p className="login-helper-message" aria-live="polite">
                  {helperMessage}
                </p>
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
                      placeholder="Mínimo de 8 caracteres"
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
                    showTemporaryMessage("A recuperação de senha entra na próxima etapa. Neste protótipo, use qualquer senha válida para seguir.")
                  }
                >
                  Esqueci minha senha
                </button>

                <button
                  type="button"
                  className="login-text-button"
                  onClick={() =>
                    showTemporaryMessage("A criação de conta guiada será conectada em seguida. Neste momento, use um e-mail e uma senha válidos para testar o fluxo.")
                  }
                >
                  Criar conta
                </button>
              </div>

              <div className="login-trust-block">
                <div className="login-trust-block__icon">
                  <Award size={18} aria-hidden="true" />
                </div>
                <div>
                  <strong>Privacidade e consentimento com clareza.</strong>
                  <p>Você revisa permissões antes de conectar qualquer dado de saúde ao Care Plus.</p>
                </div>
              </div>

              <p className="login-card__footer">
                Depois do login, você encontra sua base inicial com consentimentos, próximas missões e evolução organizada em um só lugar.
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

export default Login;
