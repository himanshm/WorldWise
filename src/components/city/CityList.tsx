import styles from './CityList.module.css';
import Spinner from '../UI/Spinner.tsx';
import CityItem from './CityItem.tsx';
import Message from '../Message.tsx';
import { useCitiesContext } from '../../contexts/useCitiesContext.ts';

function CityList() {
  const { isLoading, cities } = useCitiesContext();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message='Add your first city by clicking on a city on the map!' />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
