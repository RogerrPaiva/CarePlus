import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CalendarDays, CreditCard, Eye, EyeOff, Lock, Mail, ShieldCheck, Smartphone, User } from "lucide-react";
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    document.title = "Care Plus | Cadastro";
  }, []);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    const nextValue = type === "checkbox" ? checked : normalizeValue(name, value);
    const nextValues = {
      ...values,
      [name]: nextValue,
    };

    setValues(nextValues);

    if (touched[name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: validateField(name, nextValues),
      }));
    }

    if (name === "password" && touched.confirmPassword) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        confirmPassword: validateField("confirmPassword", nextValues),
      }));
    }
  }

  function handleBlur(event) {
    const { name } = event.target;

    setTouched((currentTouched) => ({
      ...currentTouched,
      [name]: true,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: validateField(name, values),
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validateForm(values);

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
                    <p>
                      Abra sua conta para seguir com consentimentos, preferencias e sua jornada de cuidado com revisao clara
                      de permissoes.
                    </p>

                    <div className="signup-hero__highlights" aria-label="Pilares do cadastro">
                      <article className="signup-hero__highlight">
                        <strong>Essencial agora</strong>
                        <span>Nome, contato, CPF e acesso seguro para comecar com clareza.</span>
                      </article>
                      <article className="signup-hero__highlight">
                        <strong>Consentimentos depois</strong>
                        <span>LGPD, permissoes e dados mais sensiveis entram no onboarding guiado.</span>
                      </article>
                      <article className="signup-hero__highlight">
                        <strong>Jornada mais transparente</strong>
                        <span>Voce revisa tudo antes de conectar recursos e preferencias de saude.</span>
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
                  <p>Abra sua conta para seguir com consentimentos, preferencias e sua jornada de cuidado.</p>
                </div>

                <form className="signup-form" noValidate onSubmit={handleSubmit}>
                  <section className="signup-section" aria-labelledby="signup-section-dados">
                    <div className="signup-section__header">
                      <h3 id="signup-section-dados">Seus dados</h3>
                      <p>Somente o necessario para abrir sua conta com seguranca.</p>
                    </div>

                    <div className="signup-form-grid">
                      <div className={`signup-field signup-field--full ${errors.fullName && touched.fullName ? "is-error" : ""}`}>
                        <label htmlFor="fullName">Nome completo</label>
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
                            aria-invalid={errors.fullName && touched.fullName ? "true" : "false"}
                            aria-describedby={errors.fullName && touched.fullName ? "fullName-error" : undefined}
                          />
                        </div>
                        {errors.fullName && touched.fullName ? (
                          <p className="signup-field__error" id="fullName-error" role="alert">
                            {errors.fullName}
                          </p>
                        ) : null}
                      </div>

                      <div className={`signup-field ${errors.email && touched.email ? "is-error" : ""}`}>
                        <label htmlFor="email">E-mail</label>
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
                            aria-invalid={errors.email && touched.email ? "true" : "false"}
                            aria-describedby={errors.email && touched.email ? "email-error" : undefined}
                          />
                        </div>
                        {errors.email && touched.email ? (
                          <p className="signup-field__error" id="email-error" role="alert">
                            {errors.email}
                          </p>
                        ) : null}
                      </div>

                      <div className={`signup-field ${errors.phone && touched.phone ? "is-error" : ""}`}>
                        <label htmlFor="phone">Celular</label>
                        <div className="signup-input">
                          <Smartphone size={18} aria-hidden="true" />
                          <input
                            id="phone"
                            name="phone"
                            type="text"
                            placeholder="(11) 91234-5678"
                            autoComplete="tel"
                            inputMode="numeric"
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={errors.phone && touched.phone ? "true" : "false"}
                            aria-describedby={errors.phone && touched.phone ? "phone-error" : undefined}
                          />
                        </div>
                        {errors.phone && touched.phone ? (
                          <p className="signup-field__error" id="phone-error" role="alert">
                            {errors.phone}
                          </p>
                        ) : null}
                      </div>

                      <div className={`signup-field ${errors.cpf && touched.cpf ? "is-error" : ""}`}>
                        <label htmlFor="cpf">CPF</label>
                        <div className="signup-input">
                          <CreditCard size={18} aria-hidden="true" />
                          <input
                            id="cpf"
                            name="cpf"
                            type="text"
                            placeholder="000.000.000-00"
                            autoComplete="off"
                            inputMode="numeric"
                            value={values.cpf}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={errors.cpf && touched.cpf ? "true" : "false"}
                            aria-describedby={errors.cpf && touched.cpf ? "cpf-error" : undefined}
                          />
                        </div>
                        {errors.cpf && touched.cpf ? (
                          <p className="signup-field__error" id="cpf-error" role="alert">
                            {errors.cpf}
                          </p>
                        ) : null}
                      </div>

                      <div className={`signup-field ${errors.birthDate && touched.birthDate ? "is-error" : ""}`}>
                        <label htmlFor="birthDate">Data de nascimento</label>
                        <div className="signup-input">
                          <CalendarDays size={18} aria-hidden="true" />
                          <input
                            id="birthDate"
                            name="birthDate"
                            type="text"
                            placeholder="DD/MM/AAAA"
                            autoComplete="bday"
                            inputMode="numeric"
                            value={values.birthDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={errors.birthDate && touched.birthDate ? "true" : "false"}
                            aria-describedby={errors.birthDate && touched.birthDate ? "birthDate-error" : undefined}
                          />
                        </div>
                        {errors.birthDate && touched.birthDate ? (
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
                      <div className={`signup-field signup-field--full ${errors.password && touched.password ? "is-error" : ""}`}>
                        <label htmlFor="password">Senha</label>
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
                            aria-invalid={errors.password && touched.password ? "true" : "false"}
                            aria-describedby={errors.password && touched.password ? "password-error" : undefined}
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
                        {errors.password && touched.password ? (
                          <p className="signup-field__error" id="password-error" role="alert">
                            {errors.password}
                          </p>
                        ) : null}
                      </div>

                      <div className={`signup-field signup-field--full ${errors.confirmPassword && touched.confirmPassword ? "is-error" : ""}`}>
                        <label htmlFor="confirmPassword">Confirmar senha</label>
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
                            aria-invalid={errors.confirmPassword && touched.confirmPassword ? "true" : "false"}
                            aria-describedby={
                              errors.confirmPassword && touched.confirmPassword ? "confirmPassword-error" : undefined
                            }
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
                        {errors.confirmPassword && touched.confirmPassword ? (
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
                      <p>Os consentimentos e permissoes de saude ficam para a proxima etapa.</p>
                    </div>

                    <div className="signup-consent-list">
                      <div className={`signup-checkbox ${errors.acceptTerms && touched.acceptTerms ? "is-error" : ""}`}>
                        <label>
                          <input
                            id="acceptTerms"
                            name="acceptTerms"
                            type="checkbox"
                            checked={values.acceptTerms}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={errors.acceptTerms && touched.acceptTerms ? "true" : "false"}
                            aria-describedby={errors.acceptTerms && touched.acceptTerms ? "acceptTerms-error" : undefined}
                          />
                          <span>Aceito os Termos de Uso.</span>
                        </label>
                        {errors.acceptTerms && touched.acceptTerms ? (
                          <p className="signup-field__error" id="acceptTerms-error" role="alert">
                            {errors.acceptTerms}
                          </p>
                        ) : null}
                      </div>

                      <div className={`signup-checkbox ${errors.acceptPrivacy && touched.acceptPrivacy ? "is-error" : ""}`}>
                        <label>
                          <input
                            id="acceptPrivacy"
                            name="acceptPrivacy"
                            type="checkbox"
                            checked={values.acceptPrivacy}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={errors.acceptPrivacy && touched.acceptPrivacy ? "true" : "false"}
                            aria-describedby={
                              errors.acceptPrivacy && touched.acceptPrivacy ? "acceptPrivacy-error" : undefined
                            }
                          />
                          <span>Aceito a Politica de Privacidade.</span>
                        </label>
                        {errors.acceptPrivacy && touched.acceptPrivacy ? (
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
