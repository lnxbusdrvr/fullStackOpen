import { useState } from 'react';
import OneCountry from './OneCountry'

const Countries = ({ filterCountries }) => {
  const [showCountry, setShowCountry] = useState(null);

  const handleShowCountry = ( country ) => {
    setShowCountry(country);
  }

  if (filterCountries.length > 0) {
    if (filterCountries.length > 10) {
      return (
        <div>
          Too many matches, specify another filter
        </div>
      )
    }
    if (filterCountries.length === 1) {
      return (
        <OneCountry country={filterCountries[0]} />
      )
    }
    return (
      <div>
        {filterCountries.map(c => (
          <div key={c.cca3}>
            {c.name.common}
            <button onClick={() => handleShowCountry(c)}>Show</button>
          </div>
        ))}
        {showCountry && <OneCountry country={showCountry} />}
      </div>
    )
  }

}


export default Countries;
