// import styles from './City.module.css';
// import { type CityType } from '../../App';

import { useParams } from 'react-router-dom';

// const formatDate = (date: string) =>
//   new Intl.DateTimeFormat('en', {
//     day: 'numeric',
//     month: 'long',
//     year: 'numeric',
//     weekday: 'long',
//   }).format(new Date(date));

function City() {
  const { id } = useParams();
  // const [searchParams, setSearchParams] = useSearchParams();

  // const currentCity: CityType = {
  //   cityName: 'Bengaluru',
  //   country: 'India',
  //   emoji: '🇮🇳',
  //   date: '2027-02-12T09:24:11.863Z',
  //   notes: 'Amazing 😃',
  //   position: {
  //     lat: 12.983387414687364,
  //     lng: 77.57393525916173,
  //   },
  //   id: 36417395,
  // };

  // const { cityName, emoji, date, notes } = currentCity;

  return (
    <>
      <h1>City{id}</h1>
      <h1></h1>
    </>
  );

  // return (
  //   <div className={styles.city}>
  //     <div className={styles.row}>
  //       <h6>City name</h6>
  //       <h3>
  //         <span>{emoji}</span> {cityName}
  //       </h3>
  //     </div>

  //     <div className={styles.row}>
  //       <h6>You went to {cityName} on</h6>
  //       <p>{formatDate(date)}</p>
  //     </div>

  //     {notes && (
  //       <div className={styles.row}>
  //         <h6>Your notes</h6>
  //         <p>{notes}</p>
  //       </div>
  //     )}

  //     <div className={styles.row}>
  //       <h6>Learn more</h6>
  //       <a
  //         href={`https://en.wikipedia.org/wiki/${cityName}`}
  //         target='_blank'
  //         rel='noreferrer'
  //       >
  //         Check out {cityName} on Wikipedia &rarr;
  //       </a>
  //     </div>

  //     <div>{/* <ButtonBack /> */}</div>
  //   </div>
  // );
}

export default City;
