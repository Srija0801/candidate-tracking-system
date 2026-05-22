

import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api"; 
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    const checkAuth = async () => {
      try {
       
        const token = localStorage.getItem("token");

       
        if (!token) {
          setUser(null);
          setLoading(false);
          return;
        }

        const response = await api.get("/auth/me");

      
        setUser(response.data.data);
      } catch (error) {
        
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Logout function
  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  return useContext(AuthContext);
}
