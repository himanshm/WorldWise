import { ReactNode, createContext, useReducer } from 'react';

interface User {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

const FAKE_USER: User = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

type AuthContextType = AuthState & {
  login: (email: string, password: string) => void;
  logout: () => void;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

type loginAction = {
  type: 'login';
  payload: User;
};

type logoutAction = {
  type: 'logout';
};

type AuthAction = loginAction | logoutAction;

export const AuthContext = createContext<AuthContextType | null>(null);

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'logout':
      return { ...state, user: null, isAuthenticated: false };

    default:
      return { ...state };
  }
}

function AuthProvider({ children }: AuthContextProviderProps) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    authReducer,
    initialState
  );

  function login(email: string, password: string) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: 'login', payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: 'logout' });
  }

  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
