import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import OnboardingPlaceholder from "../pages/OnboardingPlaceholder";
import PlansPage from "../pages/PlansPage";
import SignupPage from "../pages/SignupPage";

function AppRoutes() {
  const location = useLocation();
  const hasOnboardingFlowAccess = location.state?.origin === "login" || location.state?.origin === "signup";
  const hasOnboardingAccess = import.meta.env.DEV || hasOnboardingFlowAccess;

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/planos" element={<PlansPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<SignupPage />} />
      <Route
        path="/onboarding"
        element={hasOnboardingAccess ? <OnboardingPlaceholder /> : <Navigate to="/login" replace />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
