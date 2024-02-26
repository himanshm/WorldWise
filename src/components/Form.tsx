import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Form.module.css';
import Button from './UI/Button';

function Form() {
  const [cityName, setCityName] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const navigate = useNavigate();

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
        {/* <span className={styles.flag}>{emoji}</span> */}
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
        <Button btntype='back' onClick={() => navigate(-1)}>
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
