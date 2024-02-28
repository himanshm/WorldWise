import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/useAuthContext';
import styles from './User.module.css';

function User() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  function handleClick(): void {
    logout();
    navigate('/');
  }

  if (user)
    return (
      <div className={styles.user}>
        <img src={user.avatar} alt={user.name} />
        <span>Welcome, {user.name}</span>
        <button onClick={handleClick}>Logout</button>
      </div>
    );
}

export default User;
