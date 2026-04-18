import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Smartphone,
  User,
} from "lucide-react";
import CarePlus from "../assets/CarePlus.svg";
import "./Signup.css";

const NEXT_STEP_ROUTE = "/onboarding";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialValues = {
  fullName: "",
  email: "",
  phone: "",
  cpf: "",
  birthDate: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
  acceptPrivacy: false,
};

function getDigits(value) {
  return value.replace(/\D/g, "");
}

function formatPhone(value) {
  const digits = getDigits(value).slice(0, 11);

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

function formatCpf(value) {
  const digits = getDigits(value).slice(0, 11);

  if (digits.length <= 3) {
    return digits;
  }

  if (digits.length <= 6) {
    return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  }

  if (digits.length <= 9) {
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  }

  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

function formatBirthDate(value) {
  const digits = getDigits(value).slice(0, 8);

  if (digits.length <= 2) {
    return digits;
  }

  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }

  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

function validateCpf(value) {
  const digits = getDigits(value);

  if (digits.length !== 11 || /^(\d)\1+$/.test(digits)) {
    return false;
  }

  let sum = 0;

  for (let index = 0; index < 9; index += 1) {
    sum += Number(digits[index]) * (10 - index);
  }

  let remainder = (sum * 10) % 11;

  if (remainder === 10) {
    remainder = 0;
  }

  if (remainder !== Number(digits[9])) {
    return false;
  }

  sum = 0;

  for (let index = 0; index < 10; index += 1) {
    sum += Number(digits[index]) * (11 - index);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10) {
    remainder = 0;
  }

  return remainder === Number(digits[10]);
}

function parseBirthDate(value) {
  const [day, month, year] = value.split("/");

  if (!day || !month || !year || year.length !== 4) {
    return null;
  }

  const parsedDate = new Date(Number(year), Number(month) - 1, Number(day));

  if (
    Number.isNaN(parsedDate.getTime()) ||
    parsedDate.getDate() !== Number(day) ||
    parsedDate.getMonth() !== Number(month) - 1 ||
    parsedDate.getFullYear() !== Number(year)
  ) {
    return null;
  }

  return parsedDate;
}

function normalizeValue(name, value) {
  if (name === "phone") {
    return formatPhone(value);
  }

  if (name === "cpf") {
    return formatCpf(value);
  }

  if (name === "birthDate") {
    return formatBirthDate(value);
  }

  return value;
}

function hasFieldValue(name, values) {
  const value = values[name];

  if (name === "phone" || name === "cpf" || name === "birthDate") {
    return getDigits(value).length > 0;
  }

  if (name === "acceptTerms" || name === "acceptPrivacy") {
    return value;
  }

  return value.trim().length > 0;
}

function validateField(name, values) {
  const value = values[name];

  if (name === "fullName") {
    const words = value
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (!value.trim()) {
      return "Informe seu nome completo.";
    }

    if (words.length < 2) {
      return "Digite nome e sobrenome.";
    }
  }

  if (name === "email") {
    if (!value.trim()) {
      return "Informe seu e-mail.";
    }

    if (!emailPattern.test(value)) {
      return "Digite um e-mail valido.";
    }
  }

  if (name === "phone") {
    if (!getDigits(value)) {
      return "Informe seu celular.";
    }

    if (getDigits(value).length !== 11) {
      return "Use um celular com DDD.";
    }
  }

  if (name === "cpf") {
    if (!getDigits(value)) {
      return "Informe seu CPF.";
    }

    if (!validateCpf(value)) {
      return "Digite um CPF valido.";
    }
  }

  if (name === "birthDate") {
    if (!value.trim()) {
      return "Informe sua data de nascimento.";
    }

    if (getDigits(value).length !== 8) {
      return "Use o formato DD/MM/AAAA.";
    }

    const parsedDate = parseBirthDate(value);

    if (!parsedDate) {
      return "Digite uma data valida.";
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (parsedDate > today) {
      return "A data nao pode estar no futuro.";
    }
  }

  if (name === "password") {
    if (!value.trim()) {
      return "Crie uma senha para a conta.";
    }

    if (value.trim().length < 8) {
      return "Use pelo menos 8 caracteres.";
    }
  }

  if (name === "confirmPassword") {
    if (!value.trim()) {
      return "Confirme sua senha.";
    }

    if (value !== values.password) {
      return "As senhas precisam ser iguais.";
    }
  }

  if (name === "acceptTerms" && !value) {
    return "Aceite os Termos de Uso para continuar.";
  }

  if (name === "acceptPrivacy" && !value) {
    return "Aceite a Politica de Privacidade para continuar.";
  }

  return "";
}

function validateForm(values) {
  const nextErrors = {};

  Object.keys(values).forEach((fieldName) => {
    const error = validateField(fieldName, values);

    if (error) {
      nextErrors[fieldName] = error;
    }
  });

  return nextErrors;
}

function SignupPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    document.title = "Care Plus | Cadastro";
  }, []);

  function hasFieldError(name) {
    return Boolean(errors[name] && touched[name]);
  }

  function isFieldValid(name) {
    return Boolean(touched[name] && !errors[name] && hasFieldValue(name, values));
  }

  function getFieldStateClass(name) {
    if (hasFieldError(name)) {
      return "is-error";
    }

    if (isFieldValid(name)) {
      return "is-valid";
    }

    return "";
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    const nextValue = type === "checkbox" ? checked : normalizeValue(name, value);
    const nextValues = {
      ...values,
      [name]: nextValue,
    };

    setValues(nextValues);

    if (touched[name]) {
      const nextError = hasSubmitted || hasFieldValue(name, nextValues) ? validateField(name, nextValues) : "";

      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: nextError,
      }));
    }

    if (name === "password" && touched.confirmPassword) {
      const confirmPasswordError =
        hasSubmitted || hasFieldValue("confirmPassword", nextValues) ? validateField("confirmPassword", nextValues) : "";

      setErrors((currentErrors) => ({
        ...currentErrors,
        confirmPassword: confirmPasswordError,
      }));
    }
  }

  function handleBlur(event) {
    const { name } = event.target;

    setTouched((currentTouched) => ({
      ...currentTouched,
      [name]: true,
    }));

    const nextError = hasSubmitted || hasFieldValue(name, values) ? validateField(name, values) : "";

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: nextError,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validateForm(values);

    setHasSubmitted(true);
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      cpf: true,
      birthDate: true,
      password: true,
      confirmPassword: true,
      acceptTerms: true,
      acceptPrivacy: true,
    });
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    navigate(NEXT_STEP_ROUTE, {
      state: {
        origin: "signup",
        account: {
          fullName: values.fullName.trim(),
          email: values.email.trim(),
          phone: values.phone,
          cpf: values.cpf,
          birthDate: values.birthDate,
        },
      },
    });
  }

  function renderFieldStatus(name, label) {
    return (
      <label htmlFor={name}>
        <span>{label}</span>
        {isFieldValid(name) ? (
          <span className="signup-field__status" aria-hidden="true">
            <CheckCircle2 size={14} />
            <span>Conferido</span>
          </span>
        ) : null}
      </label>
    );
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        Pular para o conteudo
      </a>

      <main id="main-content" className="product-page signup-shell">
        <section className="signup-page" aria-labelledby="signup-title">
          <div className="container-fluid custom-container">
            <div className="signup-mobile-back">
              <Link to="/login" className="signup-back-link" aria-label="Voltar para o login do Care Plus">
                <ArrowLeft size={20} aria-hidden="true" />
                <span>Voltar para o login</span>
              </Link>
            </div>

            <div className="signup-grid">
              <div className="signup-hero">
                <div className="signup-hero__frame">
                  <div className="signup-hero__brand">
                    <img src={CarePlus} alt="Care Plus" className="signup-hero__logo" />
                  </div>

                  <div className="signup-hero__content">
                    <span className="signup-hero__eyebrow">Abertura de conta</span>
                    <h1>Sua conta nasce leve. O cuidado evolui na proxima etapa.</h1>
                    <p>Abra sua conta com seguranca agora. O restante do cuidado continua com revisao guiada.</p>

                    <div className="signup-hero__signals" aria-label="Pilares do cadastro">
                      <article className="signup-hero__signal">
                        <strong>Essencial agora</strong>
                        <span>Conta, contato e acesso seguro.</span>
                      </article>
                      <article className="signup-hero__signal">
                        <strong>Consentimentos depois</strong>
                        <span>Saude e permissoes entram no onboarding.</span>
                      </article>
                    </div>
                  </div>
                </div>
              </div>

              <div className="signup-panel">
                <div className="signup-panel__topbar">
                  <Link to="/login" className="signup-back-link">
                    <ArrowLeft size={18} aria-hidden="true" />
                    <span>Ja tenho conta</span>
                  </Link>
                </div>

                <div className="signup-panel__header">
                  <span className="signup-panel__eyebrow">Conta segura</span>
                  <h2 id="signup-title">Crie sua conta no Care Plus</h2>
                  <p>Comece com seus dados essenciais. Consentimentos ficam para a proxima etapa.</p>
                </div>

                <form className="signup-form" noValidate onSubmit={handleSubmit}>
                  <section className="signup-section" aria-labelledby="signup-section-dados">
                    <div className="signup-section__header">
                      <h3 id="signup-section-dados">Seus dados</h3>
                      <p>Somente o necessario para abrir sua conta com seguranca.</p>
                    </div>

                    <div className="signup-form-grid">
                      <div className={`signup-field signup-field--full ${getFieldStateClass("fullName")}`}>
                        {renderFieldStatus("fullName", "Nome completo")}
                        <div className="signup-input">
                          <User size={18} aria-hidden="true" />
                          <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            placeholder="Como voce gostaria de ser identificado"
                            autoComplete="name"
                            value={values.fullName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={hasFieldError("fullName") ? "true" : "false"}
                            aria-describedby={hasFieldError("fullName") ? "fullName-error" : undefined}
                          />
                        </div>
                        {hasFieldError("fullName") ? (
                          <p className="signup-field__error" id="fullName-error" role="alert">
                            {errors.fullName}
                          </p>
                        ) : null}
                      </div>

                      <div className={`signup-field ${getFieldStateClass("email")}`}>
                        {renderFieldStatus("email", "E-mail")}
                        <div className="signup-input">
                          <Mail size={18} aria-hidden="true" />
                          <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="voce@exemplo.com"
                            autoComplete="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={hasFieldError("email") ? "true" : "false"}
                            aria-describedby={hasFieldError("email") ? "email-error" : undefined}
                          />
                        </div>
                        {hasFieldError("email") ? (
                          <p className="signup-field__error" id="email-error" role="alert">
                            {errors.email}
                          </p>
                        ) : null}
                      </div>

                      <div className={`signup-field ${getFieldStateClass("phone")}`}>
                        {renderFieldStatus("phone", "Celular")}
                        <div className="signup-input">
                          <Smartphone size={18} aria-hidden="true" />
                          <input
                            id="phone"
                            name="phone"
                            type="text"
                            placeholder="(11) 91234-5678"
                            autoComplete="tel"
                            inputMode="numeric"
                            maxLength={15}
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={hasFieldError("phone") ? "true" : "false"}
                            aria-describedby={hasFieldError("phone") ? "phone-error" : undefined}
                          />
                        </div>
                        {hasFieldError("phone") ? (
                          <p className="signup-field__error" id="phone-error" role="alert">
                            {errors.phone}
                          </p>
                        ) : null}
                      </div>

                      <div className={`signup-field ${getFieldStateClass("cpf")}`}>
                        {renderFieldStatus("cpf", "CPF")}
                        <div className="signup-input">
                          <CreditCard size={18} aria-hidden="true" />
                          <input
                            id="cpf"
                            name="cpf"
                            type="text"
                            placeholder="000.000.000-00"
                            autoComplete="off"
                            inputMode="numeric"
                            maxLength={14}
                            value={values.cpf}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={hasFieldError("cpf") ? "true" : "false"}
                            aria-describedby={hasFieldError("cpf") ? "cpf-error" : undefined}
                          />
                        </div>
                        {hasFieldError("cpf") ? (
                          <p className="signup-field__error" id="cpf-error" role="alert">
                            {errors.cpf}
                          </p>
                        ) : null}
                      </div>

                      <div className={`signup-field ${getFieldStateClass("birthDate")}`}>
                        {renderFieldStatus("birthDate", "Data de nascimento")}
                        <div className="signup-input">
                          <CalendarDays size={18} aria-hidden="true" />
                          <input
                            id="birthDate"
                            name="birthDate"
                            type="text"
                            placeholder="DD/MM/AAAA"
                            autoComplete="bday"
                            inputMode="numeric"
                            maxLength={10}
                            value={values.birthDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={hasFieldError("birthDate") ? "true" : "false"}
                            aria-describedby={hasFieldError("birthDate") ? "birthDate-error" : undefined}
                          />
                        </div>
                        {hasFieldError("birthDate") ? (
                          <p className="signup-field__error" id="birthDate-error" role="alert">
                            {errors.birthDate}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </section>

                  <section className="signup-section" aria-labelledby="signup-section-seguranca">
                    <div className="signup-section__header">
                      <h3 id="signup-section-seguranca">Seguranca de acesso</h3>
                      <p>Crie uma senha forte para acessar sua conta com privacidade.</p>
                    </div>

                    <div className="signup-form-grid">
                      <div className={`signup-field signup-field--full ${getFieldStateClass("password")}`}>
                        {renderFieldStatus("password", "Senha")}
                        <div className="signup-input">
                          <Lock size={18} aria-hidden="true" />
                          <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Minimo de 8 caracteres"
                            autoComplete="new-password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={hasFieldError("password") ? "true" : "false"}
                            aria-describedby={hasFieldError("password") ? "password-error" : undefined}
                          />
                          <button
                            type="button"
                            className="signup-input__toggle"
                            onClick={() => setShowPassword((currentValue) => !currentValue)}
                            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                          >
                            {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
                          </button>
                        </div>
                        {hasFieldError("password") ? (
                          <p className="signup-field__error" id="password-error" role="alert">
                            {errors.password}
                          </p>
                        ) : null}
                      </div>

                      <div className={`signup-field signup-field--full ${getFieldStateClass("confirmPassword")}`}>
                        {renderFieldStatus("confirmPassword", "Confirmar senha")}
                        <div className="signup-input">
                          <Lock size={18} aria-hidden="true" />
                          <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Repita a senha"
                            autoComplete="new-password"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={hasFieldError("confirmPassword") ? "true" : "false"}
                            aria-describedby={hasFieldError("confirmPassword") ? "confirmPassword-error" : undefined}
                          />
                          <button
                            type="button"
                            className="signup-input__toggle"
                            onClick={() => setShowConfirmPassword((currentValue) => !currentValue)}
                            aria-label={showConfirmPassword ? "Ocultar confirmacao de senha" : "Mostrar confirmacao de senha"}
                          >
                            {showConfirmPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
                          </button>
                        </div>
                        {hasFieldError("confirmPassword") ? (
                          <p className="signup-field__error" id="confirmPassword-error" role="alert">
                            {errors.confirmPassword}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </section>

                  <section className="signup-section signup-section--compact" aria-labelledby="signup-section-aceites">
                    <div className="signup-section__header">
                      <h3 id="signup-section-aceites">Aceites iniciais</h3>
                      <p>Consentimentos de saude ficam para a proxima etapa.</p>
                    </div>

                    <div className="signup-consent-list">
                      <div className={`signup-checkbox ${getFieldStateClass("acceptTerms")}`}>
                        <label htmlFor="acceptTerms">
                          <input
                            id="acceptTerms"
                            name="acceptTerms"
                            type="checkbox"
                            checked={values.acceptTerms}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={hasFieldError("acceptTerms") ? "true" : "false"}
                            aria-describedby={hasFieldError("acceptTerms") ? "acceptTerms-error" : undefined}
                          />
                          <span className="signup-checkbox__copy">Aceito os Termos de Uso.</span>
                          {isFieldValid("acceptTerms") ? (
                            <span className="signup-checkbox__status" aria-hidden="true">
                              <CheckCircle2 size={14} />
                              <span>Ok</span>
                            </span>
                          ) : null}
                        </label>
                        {hasFieldError("acceptTerms") ? (
                          <p className="signup-field__error" id="acceptTerms-error" role="alert">
                            {errors.acceptTerms}
                          </p>
                        ) : null}
                      </div>

                      <div className={`signup-checkbox ${getFieldStateClass("acceptPrivacy")}`}>
                        <label htmlFor="acceptPrivacy">
                          <input
                            id="acceptPrivacy"
                            name="acceptPrivacy"
                            type="checkbox"
                            checked={values.acceptPrivacy}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={hasFieldError("acceptPrivacy") ? "true" : "false"}
                            aria-describedby={hasFieldError("acceptPrivacy") ? "acceptPrivacy-error" : undefined}
                          />
                          <span className="signup-checkbox__copy">Aceito a Politica de Privacidade.</span>
                          {isFieldValid("acceptPrivacy") ? (
                            <span className="signup-checkbox__status" aria-hidden="true">
                              <CheckCircle2 size={14} />
                              <span>Ok</span>
                            </span>
                          ) : null}
                        </label>
                        {hasFieldError("acceptPrivacy") ? (
                          <p className="signup-field__error" id="acceptPrivacy-error" role="alert">
                            {errors.acceptPrivacy}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="signup-trust-note">
                      <div className="signup-trust-note__icon">
                        <ShieldCheck size={16} aria-hidden="true" />
                      </div>
                      <p>Seus consentimentos de saude sao configurados depois, com revisao clara de permissoes.</p>
                    </div>
                  </section>

                  <div className="signup-actions">
                    <button type="submit" className="signup-submit">
                      Criar conta
                      <ArrowRight size={18} aria-hidden="true" />
                    </button>

                    <Link to="/login" className="signup-secondary-link">
                      Ja tenho conta
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default SignupPage;
