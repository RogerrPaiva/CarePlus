import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Eye, EyeOff, Info, Lock, Mail, ShieldCheck } from "lucide-react";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import CarePlus from "../assets/CarePlus.svg";
import "./Login.css";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const initialValues = {
  email: "",
  password: "",
};

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
      setHelperMessage(null);
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
      text: message,
    });
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        Pular para o conteúdo
      </a>

      <main id="main-content" className="product-page login-shell">
        <section className="login-page" aria-labelledby="login-title">
          <div className="container-fluid custom-container">
            <div className="login-mobile-back">
              <Link to="/" className="login-back-link" aria-label="Voltar para a home do Care Plus" title="Voltar para a home">
                <ArrowLeft size={20} aria-hidden="true" />
                <span>Voltar para a home</span>
              </Link>
            </div>

            <div className="login-grid">
              <div className="login-hero">
                <div className="login-hero__frame">
                  <div className="login-hero__brand">
                    <div className="login-hero__brand-mark">
                      <img src={CarePlus} alt="Care Plus" className="login-hero__logo" />
                    </div>
                  </div>

                  <div className="login-hero__content">
                    <h1>Cuidado contínuo. No seu ritmo.</h1>
                  </div>
                </div>
              </div>

              <div className="login-card">
                <div className="login-card__topbar">
                  <Link to="/" className="login-back-link">
                    <ArrowLeft size={18} aria-hidden="true" />
                    <span>Voltar para a home</span>
                  </Link>
                </div>

                <div className="login-card__header">
                  <h2 id="login-title">
                    <span className="login-card__title-desktop">Acesse o Care Plus</span>
                    <span className="login-card__title-mobile">Entre no Care Plus</span>
                  </h2>
                  <p>
                    <span className="login-card__copy-desktop">Continue com clareza e privacidade.</span>
                    <span className="login-card__copy-mobile">
                      Entre com sua conta para revisar missões, sequência de cuidado e preferências de privacidade.
                    </span>
                  </p>
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
                  <div className="login-helper-message is-info" aria-live="polite">
                    <span className="login-helper-message__icon" aria-hidden="true">
                      <Info size={18} />
                    </span>
                    <div>
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

                  <Link to="/cadastro" className="login-text-button">
                    Criar conta
                  </Link>
                </div>

                <div className="login-trust-block">
                  <div className="login-trust-block__icon">
                    <ShieldCheck size={16} aria-hidden="true" />
                  </div>
                  <div className="login-trust-block__content">
                    <strong className="login-trust-block__desktop-copy">Você revisa permissões antes de conectar.</strong>
                    <p className="login-trust-block__desktop-copy">Dados de saúde seguem opcionais e configuráveis.</p>
                    <strong className="login-trust-block__mobile-copy">Você revisa permissões antes de conectar.</strong>
                    <p className="login-trust-block__mobile-copy">Dados de saúde seguem opcionais e configuráveis.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Login;
