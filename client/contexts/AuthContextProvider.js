import { useRouter } from "next/router";
import React from "react";
import axiosInstance from "../configs/axios";

const AuthContext = React.createContext();
const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = React.useState({
    user: null,
    isAuthReady: false,
  });
  const [authError, setAuthError] = React.useState(null);
  const [onLogin, setOnLogin] = React.useState(false);
  const router = useRouter();

  const { redirectLink } = router.query;
  const login = async (formData) => {
    try {
      setAuthError(null);
      const { data } = await axiosInstance.post("/auth/login", formData);
      const { token } = data;
      console.log(token);
      localStorage.setItem("token", token);
      // router.push("/");
      router.push(redirectLink || "/");
      setAuthState({ isAuthReady: true, user: data.user });
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
      setAuthError(error.response.data.msg);
      setAuthState({ isAuthReady: true, user: null });
      setOnLogin(false);
    }
  };

  const register = async (formData) => {
    try {
      setAuthError(null);
      const { data } = await axiosInstance.post("/auth/signup", formData);
      const { token } = data;
      localStorage.setItem("token", token);
      // router.push("/");
      console.log(data);
      setAuthState({ isAuthReady: true, user: data.user });
      router.push(redirectLink || "/");
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
      setAuthError(error.response.data.msg);
      setAuthState({ isAuthReady: true, user: null });
      // setOnLogin(false);
    }
  };
  const getCurrentUser = async () => {
    try {
      if (!localStorage.getItem("token")) {
        setAuthState({ isAuthReady: true, user: null });
        return;
      }
      const { data } = await axiosInstance.get("/auth/me", {
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        // },
      });
      console.log(data);
      setAuthState({ isAuthReady: true, user: data });
    } catch (error) {
      console.log(error);
      setAuthState({ isAuthReady: true, user: null });
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setAuthState({ isAuthReady: true, user: null });
    // setOnLogin(false);
    // router.push("/login");
  };
  React.useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, authState, authError, logOut, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  return context;
};
