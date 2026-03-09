import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../state/auth';

export default function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname + location.search,
          reason: 'Please login to continue.',
        }}
      />
    );
  }

  return children;
}

