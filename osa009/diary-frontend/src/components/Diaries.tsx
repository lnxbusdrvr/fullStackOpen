import { Weather, Visibility } from '../types';

interface DiariesProps {
  diaries: { 
    id: string; 
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment?: string;
  }[];
}

const Diaries = ({ diaries }: DiariesProps) => {
  return (
    <div>
      <h2>Diary entries</h2>
      <table>
        <tbody>
          <tr>
            <th>date</th>
            <th>weather</th>
            <th>visibility</th>
          </tr>
          {diaries.map(d => (
            <tr key={d.id}>
              <td>{d.date}</td>
              <td>{d.weather}</td>
              <td>{d.visibility}</td>
            </tr>
          ))}
        </tbody>
    </table>
    </div>
  );
};

export default Diaries;

