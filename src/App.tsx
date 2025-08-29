import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { setUser, clearUser } from './redux/authSlice';
import type { AppDispatch, RootState } from './redux/store';

// Pages aur components import karein
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardLayout from './DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  // App load hone par Firebase auth state check karein
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({ uid: user.uid, email: user.email }));
      } else {
        dispatch(clearUser());
      }
    });
    return () => unsubscribe(); // Subscription cleanup
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <SignupPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardLayout />} />
        </Route>
      </Routes>
    </Router>
  );
}

