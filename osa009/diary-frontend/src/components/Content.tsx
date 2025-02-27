import { Weather, Visibility } from '../types';

interface ContentProps {
  diaries: { 
    id: string; 
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment?: string;
  }[];
}

const Content = ({ diaries }: ContentProps) => {
  return (
    <div>
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

export default Content;

