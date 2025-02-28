import { useState } from 'react';
import { Weather, Visibility, NewDiary } from "../types";

interface Props {
  onSubmit: (values: NewDiary) => void;
}


const NewDiaryForm = ({ onSubmit }: Props) => {
  const [date, setDate] = useState<string>('');
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Good);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const isValidDateInput = (date: string): boolean => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD
    /*                 isit YYYY-MM-DD      and isit Date  */
    return datePattern.test(date) && !isNaN(Date.parse(date));
  };

  const addDiary = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!isValidDateInput(date)) {
      setError(`Error: Incorrect date format: '${date}'. Use YYYY-MM-DD.`);
      setTimeout(() => {
        setError('');
      }, 5000);
    };

    if (!Object.values(Weather).includes(weather as Weather)) {
      setError(`Error: Incorrect weather: '${weather}'`);
      setTimeout(() => {
        setError('');
      }, 5000);
      return;
    }

    if (!Object.values(Visibility).includes(visibility as Visibility)) {
      setError(`Error: Incorrect visibility: '${visibility}'`);
      setTimeout(() => {
        setError('');
      }, 5000);
      return;
    };

    onSubmit({
      date,
      weather,
      visibility,
      comment
    });
  };


  return (
    <div>
      <h3>Add new entry</h3>
      {error && <div style={{ color: 'red', paddingBottom: '15px' }}>{error}</div>}
      <form onSubmit={addDiary}>
        <div>
          date<input label='date' value={date} onChange={() => setDate(event.target.value)}/>
        </div>
        <div>
          weather<input label='weather' value={weather} onChange={() => setWeather(event.target.value)}/>
        </div>
        <div>
          visibility<input label='visibility' value={visibility} onChange={() => setVisibility(event.target.value)}/>
        </div>
        <div>
          comment<input label='comment' value={comment} onChange={() => setComment(event.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};


export default NewDiaryForm; 
