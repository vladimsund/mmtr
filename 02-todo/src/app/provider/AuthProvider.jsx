import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { refreshAuth, isAuth } from "@/entities/user";
import { ROUTES } from "@/shared";

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const isUserAuth = useSelector(isAuth);

  useEffect(() => {
    function sync() {
      dispatch(refreshAuth());
    }

    window.addEventListener("storage", sync);
  }, [dispatch]);

  if (!isUserAuth) {
    return <Navigate to={ROUTES.AUTH} replace />;
  }

  return children;
}
