import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import type { RootState } from '../redux/store';

export default function ProtectedRoute() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    // Agar user logged in nahi hai, toh login page par redirect karein
    return <Navigate to="/login" replace />;
  }

  // Agar user logged in hai, toh dashboard dikhayein
  return <Outlet />;
}


