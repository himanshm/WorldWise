import AppNavigation from './AppNavigation';
import Footer from './Footer';
import Logo from './Logo';
import styles from './Sidebar.module.css';

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNavigation />

      <p>List of Cities</p>

      <Footer />
    </div>
  );
}

export default Sidebar;
