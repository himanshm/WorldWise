import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import styles from './City.module.css';
// import { type CityType } from '../../App';

import { useCitiesContext } from '../../contexts/useCitiesContext';
import { formatDate } from '../../utils/format-date';
import Spinner from '../UI/Spinner';
import BackButton from '../UI/BackButton';

function City() {
  const { id } = useParams<{ id: string }>();
  const { getCity, currentCity, isLoading } = useCitiesContext();

  useEffect(() => {
    if (id) getCity(id); // Passing data from child to parent
  }, [id]);

  // const { cityName, emoji, date, notes } = currentCity || {};
  const { cityName, emoji, date, notes } = currentCity;

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target='_blank'
          rel='noreferrer'
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
