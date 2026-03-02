import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

const API = import.meta.env.VITE_API_URL || "https://backend-inicial-proyecto-prestamo.onrender.com/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Wake up server - silent fetch to root
    fetch(`${API.replace('/api', '')}/`)
      .catch(() => { });

    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      if (isTokenExpired(storedToken)) {
        logout();
        toast.error("Sesión expirada, por favor inicia sesión nuevamente");
      } else {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
    }
  }, []);

  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch (error) {
      return true;
    }
  };

  useEffect(() => {
    if (user) {
      const theme = localStorage.getItem("theme");
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      }
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [user]);

  const login = async (credentials) => {
    try {
      const res = await fetch(
        `${API}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
      setToken(data.token);

      toast.success(`Bienvenido, ${data.user.nombres}`);
      navigate("/Home");
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("theme");

    document.documentElement.classList.remove('dark');

    setUser(null);
    setToken(null);

    navigate("/");
  };

  const register = async (dataForm) => {
    const res = await fetch(`${API}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataForm),
    });


    if (!res.ok) throw new Error("Error al registrar");


    await res.json();
  };

  const forgotPassword = async (email) => {
    const res = await fetch(`${API}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
  };

  const resetPassword = async (token, newPassword) => {
    const res = await fetch(`${API}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
  };

  const loginWithGoogle = async () => {
    try {
      const { auth, googleProvider, signInWithPopup } = await import("../utils/firebase");
      const result = await signInWithPopup(auth, googleProvider);
      const userGoogle = result.user;

      // Enviamos el token o datos mínimos al backend para validar/crear usuario
      const res = await fetch(`${API}/auth/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: userGoogle.uid,
          email: userGoogle.email,
          username: userGoogle.displayName,
          photoURL: userGoogle.photoURL,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al iniciar con Google");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
      setToken(data.token);

      toast.success(`Bienvenido, ${data.user.nombres}`);
      navigate("/Home");
    } catch (error) {
      toast.error(error.message || "Error al autenticar con Google");
      throw error;
    }
  };

  const updateUser = (newUser) => {
    const updatedUser = { ...user, ...newUser };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{
      user, token, login, logout, register,
      loginWithGoogle, forgotPassword, resetPassword, updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
