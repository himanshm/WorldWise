import Map from '../components/app/Map';
import Sidebar from '../components/app/Sidebar';
import styles from './AppLayout.module.css';

function AppLayoutPage() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
}

export default AppLayoutPage;
