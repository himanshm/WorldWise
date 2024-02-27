import styles from './CountryList.module.css';
import Spinner from '../UI/Spinner.tsx';
import CountryItem from './CountryItem.tsx';
import Message from '../Message.tsx';
import { useCitiesContext } from '../../contexts/useCitiesContext.ts';
import { CityType } from '../../contexts/CitiesContext.tsx';

function CountryList() {
  const { cities, isLoading } = useCitiesContext();
  const uniqueCountries: string[] = Array.from(
    new Set(cities.map((city: CityType) => city.country))
  );

  const countries: { country: string; emoji: string; id: number | null }[] =
    uniqueCountries.map((countryName: string) => {
      const city = cities.find((c: CityType) => c.country === countryName);
      return {
        country: countryName,
        emoji: city ? city.emoji : '',
        id: city ? city.id : null,
      };
    });

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
