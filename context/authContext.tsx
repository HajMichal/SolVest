import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { BASE_URL } from "@env";
import { useRouter } from "expo-router";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (email: string, password: string, name: string, country: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onPinCode?: (pincode: number, userId: number) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const router = useRouter();
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({ token: null, authenticated: null });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync("ACCESS_TOKEN");

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAuthState({
          token: token,
          authenticated: true,
        });
      }
    };
    loadToken();
  }, []);

  const register = async (email: string, password: string, name: string, country: string) => {
    try {
      return await axios.post(`${BASE_URL}/auth/register`, { email, password, country, name });
    } catch (error) {
      return error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(`${BASE_URL}/auth/login`, {
        email: email,
        password: password,
      });

      setAuthState({
        token: result.data.access_token,
        authenticated: true,
      });
      router.push("/auth/pincode");
      // automaticly adds Authorization Bearer token to request
      axios.defaults.headers.common["Authorization"] = `Bearer ${result.data.token}`;
      axios.defaults.headers.common["Content-Type"] = "Application/Json";
      await SecureStore.setItemAsync("ACCESS_TOKEN", result.data.access_token);
      await SecureStore.setItemAsync("REFRESH_TOKEN", result.data.refresh_token);
      return result.data;
    } catch (error) {
      return error;
    }
  };

  const pincode = async (pincode: number, userId: number) => {
    try {
      const result = await axios.post(`${BASE_URL}/auth/pinValidation/${userId}`, {
        pincode: pincode,
      });
      router.push("/home");
      return result;
    } catch (error) {
      return error;
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("ACCESS_TOKEN");
    await SecureStore.deleteItemAsync("REFRESH_TOKEN");

    axios.defaults.headers.common["Authorization"] = null;
    setAuthState({ token: null, authenticated: false });
    router.push("/auth/login");
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onPinCode: pincode,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
