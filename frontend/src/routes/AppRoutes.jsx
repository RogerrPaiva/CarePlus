import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import SignupPage from "../features/auth/pages/SignupPage";
import HomePage from "../features/home/pages/HomePage";
import { hasSavedOnboardingFlowAccess } from "../features/onboarding/flowStorage";
import OnboardingPage from "../features/onboarding/pages/OnboardingPage";
import PlansPage from "../features/plans/pages/PlansPage";
import MissionsPage from "../pages/MissionsPage";

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
      <Route path="/missoes" element={<MissionsPage />} />
      <Route path="/planos" element={hasPlansAccess ? <PlansPage /> : <Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<SignupPage />} />
      <Route
        path="/onboarding"
        element={hasOnboardingAccess ? <OnboardingPage /> : <Navigate to="/login" replace />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
