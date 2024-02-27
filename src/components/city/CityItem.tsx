import { Link } from 'react-router-dom';

import styles from './CityItem.module.css';
import { CityType } from '../../contexts/CitiesContext';
import { formatDate, optionsObject } from '../../utils/format-date';
import { useCitiesContext } from '../../contexts/useCitiesContext';

type CityItemProps = {
  city: CityType;
};
const options: optionsObject = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};
function CityItem({ city }: CityItemProps) {
  const { currentCity } = useCitiesContext();
  const { emoji, cityName, date, id, position } = city;
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles['cityItem--active'] : ''
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date, options)})</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
