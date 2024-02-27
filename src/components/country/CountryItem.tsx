import styles from './CountryItem.module.css';

interface Country {
  country: string;
  emoji: string;
  id: string | null;
}

type CountryItemProps = {
  country: Country;
};

function CountryItem({ country }: CountryItemProps) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
