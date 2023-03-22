import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContextProvider";

const PublicRoute = ({ children }) => {
  const { authState } = useAuth();
  const router = useRouter();
  const { redirectLink } = router.query;
  useEffect(() => {
    if (authState.isAuthReady && authState.user) {
      router.push(redirectLink || "/");
    }
  }, [authState, router]);

  return <div>{authState.isAuthReady && !authState.user && children}</div>;
};

export default PublicRoute;
