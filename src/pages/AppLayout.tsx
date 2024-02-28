import Map from '../components/app/Map';
import Sidebar from '../components/app/Sidebar';
import styles from './AppLayout.module.css';
import User from '../components/User';

function AppLayoutPage() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayoutPage;
