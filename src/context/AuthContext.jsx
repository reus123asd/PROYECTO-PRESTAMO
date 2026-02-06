import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = async (credentials) => {
    const res = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });


    if (!res.ok) throw new Error("Credenciales incorrectas");


    const data = await res.json();


    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));


    setUser(data.user);
    setToken(data.token);


    navigate("/Home");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const register = async (dataForm) => {
    const res = await fetch("http://localhost:4000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataForm),
    });


    if (!res.ok) throw new Error("Error al registrar");


    await res.json();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
