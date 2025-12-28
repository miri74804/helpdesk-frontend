import { Children, type ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading)
        return <div>טוען...</div>;

    if (!isAuthenticated)
        return <Navigate to="/login" />;

    return <>{children}</>;
};

export default ProtectedRoute;