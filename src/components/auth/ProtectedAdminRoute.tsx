import { Navigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

/**
 * Protected route component for Admin-only pages.
 * Redirects non-admin users to the landing page.
 * TODO: Backend integration - verify admin role via API/token validation
 */
const ProtectedAdminRoute = ({ children }: ProtectedAdminRouteProps) => {
  const { isLoggedIn, isAdmin } = useUser();

  // If not logged in, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // If logged in but not admin, redirect to landing page
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;
