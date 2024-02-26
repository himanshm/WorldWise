import styles from './CountryList.module.css';
import Spinner from '../UI/Spinner.tsx';
import CountryItem from './CountryItem.tsx';
import Message from '../Message.tsx';

import { type CitiesState, type City } from '../../App.tsx';

type CountryListProps = {
  cities: CitiesState;
  isLoading: boolean;
};

function CountryList({ cities, isLoading }: CountryListProps) {
  const uniqueCountries: string[] = Array.from(
    new Set(cities.map((city: City) => city.country))
  );

  const countries: { country: string; emoji: string; id: string | null }[] =
    uniqueCountries.map((countryName: string) => {
      const city = cities.find((c: City) => c.country === countryName);
      console.log(city);
      return {
        country: countryName,
        emoji: city ? city.emoji : '',
        id: city ? city.id : null,
      };
    });
  console.log(countries);

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message='Add your first city by clicking on a city on the map!' />
    );
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.id} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
