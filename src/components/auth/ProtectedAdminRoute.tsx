import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useUser } from "@/contexts/UserContext";

interface Props {
  children: ReactNode;
}

const ProtectedAdminRoute = ({ children }: Props) => {
  const { loading, isLoggedIn, isAdmin } = useUser();

  if (loading) return <div>Loading...</div>;

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  if (!isAdmin) return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default ProtectedAdminRoute;
