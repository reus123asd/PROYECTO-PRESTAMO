import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import MainLayout from "./layout/MainLayout";
import PrivateRoute from "./routes/PrivateRoute";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      <Route
        path="/home"
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      />
      {/* Redirección por defecto para el perfil si es una ruta hija de home o similar si existe */}
    </Routes>
  );
}

export default App;
