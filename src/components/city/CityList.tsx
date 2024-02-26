import styles from './CityList.module.css';
import { type CitiesState } from '../../App.tsx';
import Spinner from '../UI/Spinner.tsx';
import CityItem from './CityItem.tsx';
import Message from '../Message.tsx';

type CityListProps = {
  cities: CitiesState;
  isLoading: boolean;
};

function CityList({ cities, isLoading }: CityListProps) {
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
