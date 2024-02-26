import { Outlet } from 'react-router-dom';
import AppNavigation from '../layout/AppNavigation';
import Footer from '../layout/Footer';
import Logo from '../UI/Logo';
import styles from './Sidebar.module.css';

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNavigation />

      <Outlet />

      <Footer />
    </div>
  );
}

export default Sidebar;
