import styles from './CityItem.module.css';

import { CityType } from '../../App.tsx';
import { Link } from 'react-router-dom';

type CityItemProps = {
  city: CityType;
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));

function CityItem({ city }: CityItemProps) {
  const { emoji, cityName, date, id } = city;
  return (
    <li>
      <Link className={styles.cityItem} to={`${id}`}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
