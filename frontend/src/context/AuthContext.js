import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
  } from "react";
  import { loginUser, registerUser } from "../services/auth";
  
  const AuthContext = createContext(null);
  
  export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const savedToken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");
      if (savedToken && savedUser) {
        setToken(savedToken);
        try {
          setUser(JSON.parse(savedUser));
        } catch (_err) {
          localStorage.removeItem("user");
        }
      }
      setLoading(false);
    }, []);
  
    const handleAuth = (data) => {
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    };
  
    const login = async (credentials) => {
      setError(null);
      const data = await loginUser(credentials);
      handleAuth(data);
    };
  
    const register = async (payload) => {
      setError(null);
      const data = await registerUser(payload);
      handleAuth(data);
    };
  
    const logout = () => {
      setToken(null);
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    };
  
    const value = useMemo(
      () => ({
        user,
        token,
        loading,
        error,
        login,
        register,
        logout,
        setError,
      }),
      [user, token, loading, error]
    );
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  };
  
  export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
      throw new Error("useAuth must be used inside AuthProvider");
    }
    return ctx;
  };
  