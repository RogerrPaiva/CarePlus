import { Crown, Heart, Star } from "lucide-react";

export const comparisonRows = [
  "Frequencia de acompanhamento",
  "Lembretes inteligentes",
  "Conteudos para sua rotina",
  "Suporte ampliado",
  "Relatorios de progresso",
  "Beneficios exclusivos",
];

export const plans = [
  {
    key: "essencial",
    title: "Essencial",
    description: "Para organizar a rotina de cuidado com lembretes e acompanhamento mensal.",
    price: "R$29",
    cycle: "/mes",
    icon: Heart,
    values: ["Mensal", true, false, false, "Visao basica", false],
  },
  {
    key: "equilibrio",
    title: "Equilibrio",
    description: "Para evoluir com metas personalizadas, suporte semanal e conteudos de bem-estar.",
    price: "R$59",
    cycle: "/mes",
    icon: Star,
    values: ["Semanal", true, true, true, "Detalhados", false],
    recommended: true,
  },
  {
    key: "integral",
    title: "Integral",
    description: "Para quem quer acompanhamento completo, relatorios avancados e beneficios extras.",
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
