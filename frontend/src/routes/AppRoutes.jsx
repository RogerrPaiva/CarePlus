import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import OnboardingPlaceholder from "../pages/OnboardingPlaceholder";
import SignupPage from "../pages/SignupPage";

function AppRoutes() {
  const location = useLocation();
  const hasOnboardingAccess = location.state?.origin === "login" || location.state?.origin === "signup";

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
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
