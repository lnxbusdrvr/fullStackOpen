import Languages from './Languages'
import Flag from './Flag'
import WeatherComponent from './WeatherComponent'


const OneCountry = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>
        capital {country.capital[0]} <br />
        area {country.area}
      </div>
      <Languages languages={country.languages} />
      <Flag country={country} />
      <WeatherComponent city={country.capital[0]}/>
    </div>
  )
}
/*
*/

export default OneCountry;
