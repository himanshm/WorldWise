import { ReactNode, useEffect } from 'react';
import { useAuthContext } from '../contexts/useAuthContext';
import { useNavigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: ReactNode;
};
function ProtectedRoutePage({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  // We should not call navigate function from the top level code:

  useEffect(() => {
    if (!isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  return children;
}

export default ProtectedRoutePage;
