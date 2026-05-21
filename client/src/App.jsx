

import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CandidatesPage from "./pages/CandidatesPage";
import AddCandidatePage from "./pages/AddCandidatePage";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      
      <Route path="/login" element={<LoginPage />} />

     
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/candidates"
        element={
          <ProtectedRoute>
            <CandidatesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-candidate"
        element={
          <ProtectedRoute>
            <AddCandidatePage />
          </ProtectedRoute>
        }
      />

     
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}