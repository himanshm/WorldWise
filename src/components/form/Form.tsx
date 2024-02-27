import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import styles from './Form.module.css';
import Button from '../UI/Button';
import BackButton from '../UI/BackButton';
import { useUrlPosition } from '../../hooks/useUrlPosition';
import { getFlagEmoji } from '../../utils/convert-to-emoji';
import Message from '../UI/Message';
import Spinner from '../UI/Spinner';
import { CityType } from '../../contexts/CitiesContext';
import { useCitiesContext } from '../../contexts/useCitiesContext';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

function Form() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlPosition();
  const { createCity, isLoading } = useCitiesContext();
  const [cityName, setCityName] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [date, setDate] = useState<Date | null>(new Date());
  const [notes, setNotes] = useState<string>('');
  const [emoji, setEmoji] = useState<string>('');
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState<boolean>(false);
  const [geoCodingError, setGeoCodingError] = useState<string>('');

  useEffect(() => {
    if (!lat && !lng) return;

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

  const handleDateChange = (date: Date | null) => {
    setDate(date);
  };

  const handleNotesChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity: CityType = {
      cityName: cityName,
      country: country,
      emoji: emoji,
      date: date,
      notes: notes,
      position: { lat: +lat!, lng: +lng! },
    };

    await createCity(newCity);
    navigate('/app');
  };

  if (isLoadingGeocoding) return <Spinner />;

  if (!lat && !lng)
    return <Message message='Start by clicking somewhere on the map!' />;

  if (geoCodingError) return <Message message={geoCodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ''}`}
      onSubmit={handleSubmit}
    >
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

        <DatePicker
          id='date'
          selected={date}
          onChange={handleDateChange}
          dateFormat='dd/MM/yyyy'
        />
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
