import { useRouter } from "next/router";
import React, { useEffect } from "react";
import AppContextProvider from "../../contexts/AppContextProvider";
import { useAuth } from "../../contexts/AuthContextProvider";

const PrivateRoute = ({ children }) => {
  const { authState } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!authState.isAuthReady) {
      return;
    }
    if (!authState.user) {
      router.push("/login");
    }
  }, [authState.isAuthReady, authState.user, router]);

  return (
    <div>
      {authState.isAuthReady && authState.user && (
        <AppContextProvider>{children}</AppContextProvider>
      )}
    </div>
  );
};

export default PrivateRoute;
