import { useState, useEffect } from 'react';
import diaryService from './services/diaries';
import { Diary, NewDiary } from "./types";

import Header from './components/Header';
import Diaries from './components/Diaries';
import NewDiaryForm from './components/NewDiaryForm';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      try {
        const diaries = await diaryService.getAll(); 
        setDiaries(diaries);
      } catch {
        console.log('backend won\'t work');
        setPatients([]);
      };
    };
    void fetchDiaryEntries();
  }, []);

  const submitNewDiary = async (newDiaryValues: NewDiary) => {
    try {
      const diary = await diaryService.create(newDiaryValues);
      setDiaries( diaries.concat(diary) );
    } catch {
      console.log('error accured on add new data');
    };
  };


  return (
    <div>
      <Header name={'diary app'} />
      <NewDiaryForm onSubmit={submitNewDiary} />
      <Diaries diaries={diaries} />
    </div>
  )
}

export default App
