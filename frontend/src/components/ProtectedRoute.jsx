import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <div className='flex items-center justify-center py-10 text-slate-600'>
        Checking session...
      </div>
    );
  }

  if (!token) {
    return <Navigate to='/login' replace />;
  }

  return children;
};

export default ProtectedRoute;
