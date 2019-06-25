import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [countryInput, setCountryInput] = useState('');
  const [countriesData, setCountriesData] = useState([]);
  const [filteredCountriesData, setfilteredCountriesData] = useState([]);
  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountriesData(response.data))
      .catch(error => console.warn(error));
  }, []);

  const handleCountryInput = e => {
    setCountryInput(e.target.value);

    const regex = RegExp(e.target.value, 'i');

    if (e.target.value === '') {
      setfilteredCountriesData([]);
    } else {
      setfilteredCountriesData(
        countriesData.filter(country => {
          return regex.test(country.name);
        })
      );
    }
  };

  const displayCountries = () => {
    if (filteredCountriesData.length === 1) {
      const country = filteredCountriesData[0];
      const endpoint = `https://api.apixu.com/v1/current.json?key=db9480c2996f483490d75047192506&q=${
        country.capital
      }`;
      axios.get(endpoint).then(response => setWeather(response.data.current));
      return (
        <section>
          <h1>{country.name}</h1>
          <p>capital {country.capital}</p>
          <p>population {country.population}</p>

          <h2>languages</h2>
          <ul>
            {country.languages.map(language => (
              <li key={language.name}>{language.name}</li>
            ))}
          </ul>
          <img
            style={{ width: '7.5rem' }}
            src={country.flag}
            alt={'Flag of ' + country.name}
          />
          <h2>Weather in {country.capital}</h2>
          <p>temperature: {weather.temp_c} Celsius</p>
          <p>
            wind: {weather.wind_kph} kph direction {weather.wind_dir}
          </p>
        </section>
      );
    } else if (filteredCountriesData.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else {
      return (
        <ul>
          {filteredCountriesData.map(country => (
            <li key={country.name}>
              {country.name}{' '}
              <button onClick={() => setSingleCountry(country)}>show</button>
            </li>
          ))}
        </ul>
      );
    }
  };

  const setSingleCountry = passedCountry => {
    setfilteredCountriesData(
      countriesData.filter(country => country.name === passedCountry.name)
    );
  };

  return (
    <>
      <div>
        <label>
          find countries{' '}
          <input value={countryInput} onChange={handleCountryInput} />
        </label>
      </div>

      {filteredCountriesData !== [] && displayCountries()}
    </>
  );
};

export default App;
