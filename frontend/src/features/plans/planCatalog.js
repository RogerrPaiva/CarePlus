import { Crown, Heart, Star } from "lucide-react";

export const comparisonRows = [
  "Frequencia de acompanhamento",
  "Lembretes inteligentes",
  "Conteudos personalizados",
  "Suporte ampliado",
  "Relatorios de progresso",
  "Beneficios exclusivos",
];

export const plans = [
  {
    key: "essencial",
    title: "Essencial",
    description: "Acompanhamento basico, lembretes e visao da rotina.",
    price: "R$29",
    cycle: "/mes",
    icon: Heart,
    values: ["Mensal", true, false, false, "Visao basica", false],
  },
  {
    key: "equilibrio",
    title: "Equilibrio",
    description: "Metas personalizadas, acompanhamento mais frequente e conteudos de bem-estar.",
    price: "R$59",
    cycle: "/mes",
    icon: Star,
    values: ["Semanal", true, true, true, "Detalhados", false],
    recommended: true,
  },
  {
    key: "integral",
    title: "Integral",
    description: "Experiencia completa, acompanhamento ampliado e beneficios extras.",
    price: "R$89",
    cycle: "/mes",
    icon: Crown,
    values: ["Ilimitada", true, true, true, "Avancados", true],
  },
];

export function getRecommendedPlan() {
  return plans.find((plan) => plan.recommended) ?? plans[0];
}

export function getPlanByKey(planKey) {
  return plans.find((plan) => plan.key === planKey) ?? null;
}
