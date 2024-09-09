import { useState, useEffect } from 'react';

import Filter from './components/Filter';
import Countries from './components/Countries';

import countryService from './services/CountriesService';


const App = () => {
  const [country, setCountry] = useState([]);
  const [newFilter, setNewFilter] = useState('');

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountry => {
        setCountry(initialCountry);
      });
  }, []);

  const handleFilter = (event) => {
    setNewFilter(event.target.value);
  }

  const filterCountries = country
    .filter(c => c.name.common.toLowerCase().includes(newFilter.toLowerCase()));

  return (
    <div>
      <Filter handleFilter={handleFilter} />
      {newFilter && <Countries filterCountries={filterCountries} />}
    </div>
  );
}


export default App;

