import { Navigate } from "react-router-dom";

import { useUser } from "@/entities/user";
import { ROUTES } from "@/shared";

export function AuthProvider({ children }) {
  const { isUserAuth } = useUser();

  if (!isUserAuth) {
    return <Navigate to={ROUTES.AUTH} replace />;
  }

  return children;
}
