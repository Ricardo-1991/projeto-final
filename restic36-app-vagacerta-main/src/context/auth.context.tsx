import React, { useState, createContext, useEffect, useCallback } from "react";
import {jwtDecode, JwtPayload } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";
import api from "../services/api";

interface UserProps {
  id?: string;
  name: string;
  email: string;
  password?: string;
}

interface AuthError {
  message: string;
  code: string;
}

interface AuthContextData {
  token: string | null;
  user: UserProps | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  update: (updatedUser: UserProps) => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
  error: AuthError | null;
}

interface CustomJwtPayload extends JwtPayload {
  exp: number;
  sub: string;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);

  const isAuthenticated = !!token;

  const logout = useCallback(async () => {
    setToken(null);
    setUser(null);
    setError(null); 
    await AsyncStorage.removeItem("@auth_token");
    await AsyncStorage.removeItem("@user_data");
    delete api.defaults.headers.common["Authorization"];
  }, []);

  const update = async (updatedUser: UserProps) => {
    setUser(updatedUser);
    await AsyncStorage.setItem("@user_data", JSON.stringify(updatedUser));
  };

  const isTokenExpired = useCallback((token: string): boolean => {
    try {
      const decoded = jwtDecode<CustomJwtPayload>(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime;
    } catch (error) {
      throw new Error("Erro ao decodificar o token.");
    }
  }, []);

  useEffect(() => {
    const loadStoredData = async () => {
      const storedToken = await AsyncStorage.getItem("@auth_token");
      const storedUser = await AsyncStorage.getItem("@user_data");

      if (storedToken && storedUser) {
        if (isTokenExpired(storedToken)) {
          setError({
            message: "Sua sessão expirou.",
            code: "SESSION_EXPIRED",
          });
          Alert.alert("Sessão Expirada", "Por favor, faça login novamente.");
          logout();
          return;
        }

        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      }
    };

    loadStoredData();
  }, [isTokenExpired, logout]);

  async function login(email: string, password: string) {
    try {
      setLoading(true);
      const response = await api.post("/auth", { email, password });
      const { token, user } = response.data;
      console.log(user)
      setToken(token);
      setUser(user);

      await AsyncStorage.setItem("@auth_token", token);
      await AsyncStorage.setItem("@user_data", JSON.stringify(user));

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        switch (status) {
          case 401:
            setError({
              message: "Falha ao realizar login. Verifique suas credenciais.",
              code: "INVALID_CREDENTIALS",
            });
            Alert.alert("Erro", "Falha ao realizar login. Verifique suas credenciais.");
            break;

          case 422:
            setError({
              message: "Dados inválidos. Verifique as informações inseridas.",
              code: "VALIDATION_ERROR",
            });
            Alert.alert("Erro", "Dados inválidos. Verifique as informações inseridas.");
            break;
          
            case 404:
              setError({
                message: "Usuário não encontrado. Verifique as informações inseridas.",
                code: "USER_NOT_FOUND",
              });
              Alert.alert("Erro", "Usuário não encontrado. Verifique as informações inseridas.");
              break;

          default:
            if (!error.response) {
              setError({
                message: "Erro de conexão. Verifique sua internet.",
                code: "NETWORK_ERROR",
              });
              Alert.alert("Erro", "Erro de conexão. Verifique sua internet.");
            }
            break;
        }
      } else {
        setError({
          message: "Erro inesperado.",
          code: "UNKNOWN_ERROR",
        });
        Alert.alert("Erro", "Erro inesperado.");
      }

      setToken(null);
      setUser(null);
      await AsyncStorage.removeItem("@auth_token");
      await AsyncStorage.removeItem("@user_data");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout, update, isAuthenticated, error, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
