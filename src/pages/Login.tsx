import { FormEvent, useEffect, useState } from 'react';

import styles from './Login.module.css';
import MainNavigation from '../components/layout/MainNavigation';
import Button from '../components/UI/Button';
import { useAuthContext } from '../contexts/useAuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('jack@example.com');
  const [password, setPassword] = useState('qwerty');

  const { login, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (email && password) login(email, password);
  }

  useEffect(() => {
    if (isAuthenticated) navigate('/app', { replace: true }); // replace => replace the login page with app page in the history stack so the user can't go back to login
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <MainNavigation />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor='email'>Email address</label>
          <input
            type='email'
            id='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button btntype='primary'>Login</Button>
        </div>
      </form>
    </main>
  );
}

export default Login;
