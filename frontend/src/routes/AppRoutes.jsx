import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { hasSavedOnboardingFlowAccess } from "../features/onboarding/flowStorage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import OnboardingPlaceholder from "../pages/OnboardingPlaceholder";
import PlansPage from "../pages/PlansPage";
import SignupPage from "../pages/SignupPage";

function AppRoutes() {
  const location = useLocation();
  const hasStoredFlowAccess = hasSavedOnboardingFlowAccess();
  const hasOnboardingFlowAccess =
    location.state?.origin === "login" || location.state?.origin === "signup" || hasStoredFlowAccess;
  const hasOnboardingAccess = import.meta.env.DEV || hasOnboardingFlowAccess;
  const hasPlansAccess = import.meta.env.DEV || hasOnboardingFlowAccess;

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/planos" element={hasPlansAccess ? <PlansPage /> : <Navigate to="/login" replace />} />
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
