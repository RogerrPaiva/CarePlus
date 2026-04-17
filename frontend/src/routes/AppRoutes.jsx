import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import OnboardingPlaceholder from "../pages/OnboardingPlaceholder";
import SignupPage from "../pages/SignupPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<SignupPage />} />
      <Route path="/onboarding" element={<OnboardingPlaceholder />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;
