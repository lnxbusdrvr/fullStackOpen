import { useState, useEffect } from 'react'
import diaryService from './services/diaries'
import { Diary } from "./types";

import Header from './components/Header'
import Content from './components/Content'

function App() {
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


  return (
    <div>
      <Header name={'diary app'} />
      <Content diaries={diaries} />
    </div>
  )
}

export default App
