import { useState, ChangeEvent, FormEvent, useEffect } from 'react';

import styles from './Form.module.css';
import Button from '../UI/Button';
import BackButton from '../UI/BackButton';
import { useUrlPosition } from '../../hooks/useUrlPosition';
import { getFlagEmoji } from '../../utils/convert-to-emoji';
import Message from '../UI/Message';
import Spinner from '../UI/Spinner';

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

function Form() {
  const [cityName, setCityName] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [emoji, setEmoji] = useState<string>('');
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState<boolean>(false);
  const [geoCodingError, setGeoCodingError] = useState<string>('');
  const [lat, lng] = useUrlPosition();

  useEffect(() => {
    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true);
        setGeoCodingError('');
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if (!data.countryCode)
          throw new Error(
            "👋That doesn't seem to be a city. Click somewhere else.😊"
          );
        setCityName(data.city || data.locality || '');
        setCountry(data.countryName);
        setEmoji(getFlagEmoji(data.countryCode));
      } catch (error: unknown) {
        if (error instanceof Error) setGeoCodingError(error.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }

    fetchCityData();
  }, [lat, lng]);

  const handleCityNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleNotesChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // You can handle form submission here
  };

  if (isLoadingGeocoding) return <Spinner />;

  if (geoCodingError) return <Message message={geoCodingError} />;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor='cityName'>City name</label>
        <input
          id='cityName'
          type='text'
          value={cityName}
          onChange={handleCityNameChange}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor='date'>When did you go to {cityName}?</label>
        <input id='date' type='date' value={date} onChange={handleDateChange} />
      </div>

      <div className={styles.row}>
        <label htmlFor='notes'>Notes about your trip to {cityName}</label>
        <textarea id='notes' value={notes} onChange={handleNotesChange} />
      </div>

      <div className={styles.buttons}>
        <Button btntype='primary'>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
