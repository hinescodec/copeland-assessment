import React, { useState } from 'react';
import { getWeather } from './services/weatherService';
import WeatherDisplay from './components/WeatherDisplay';
import './App.css';
const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [type, setType] = useState<'city' | 'zip' | 'coordinates'>('city');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    
    setWeatherData(null);
    setError(null);
    const data = await getWeather(query, type);
    if (data) {
      setWeatherData(data);
      setError(null);
    } else {
      setWeatherData(null);
      setError('Weather data not found');
    }
  };

  return (
    <div className="app-container">
      <div className="row d-flex justify-content-center p-5">
        <div className="col-md-8 col-lg-6 bg-white p-3 glossy-div">
          <div className="mb-4">
            <h3 className='text-center'>Check the weather around the GLOBE!</h3>
          </div>
          <div className="d-flex justify-content-center align-items-center mb-4">
            <input
              className="form-group m-2 fixed-height"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter city, zip, or coordinates"
            />
            <select
              className="form-group m-2 fixed-height"
              value={type}
              onChange={(e) => setType(e.target.value as 'city' | 'zip' | 'coordinates')}
            >
              <option value="city">Search by City</option>
              <option value="zip">Search by Zip Code</option>
              <option value="coordinates">Search by Coordinates</option>
            </select>
            <button className="btn btn-primary m-2 fixed-height" onClick={() => handleSearch()}>Search</button>
          </div>
        </div>
      </div>

      
      {error && 
        <div className='row d-flex justify-content-center'>
        <h3 className='col-md-5 col-lg-4 bg-white text-center p-3 glossy-div' >{error}</h3>
        </div>
        }
      {weatherData && (
        <WeatherDisplay
          city={weatherData.name}
          country={weatherData.sys.country}
          description={weatherData.weather[0].description}
          temp={weatherData.main.temp}
          humidity={weatherData.main.humidity}
        />
      )}
    </div>
  );
};

export default App;