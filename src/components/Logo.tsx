import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.png';

import styles from './Logo.module.css';

function Logo() {
  return (
    <Link to='/'>
      <img src={logoImg} alt='WorldWise logo' className={styles.logo} />
    </Link>
  );
}

export default Logo;
