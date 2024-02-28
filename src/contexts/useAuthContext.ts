import { useContext } from 'react';
import { AuthContext } from './FakeAuthContext';

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (context === null)
    throw new Error('Auth context was used outside AuthProvider!');

  return context;
}
