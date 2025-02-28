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


  const addDiary = (event: SyntheticEvent) => {
    event.preventDefault();
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
