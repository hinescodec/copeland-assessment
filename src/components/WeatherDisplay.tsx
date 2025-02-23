import React from 'react';
import '../App.css';
interface WeatherDisplayProps {
    city: string;
    country : string;
    description : string;
    temp: number;
    humidity: number;
}

const WeatherDisplay : React.FC<WeatherDisplayProps> = ({city, country, description, temp, humidity}) => {
    return (
            <div className="row d-flex justify-content-center">
              <div className='col-md-5 col-lg-4 bg-white p-3 glossy-div'>
                <h5 className='text-center'>{city}, {country}</h5>
                <h1 className='text-center'>{temp}°C</h1>
                <p className='text-center'>{description}</p>
                <p className='text-center'>Humidity: {humidity}%</p>
              </div>
            </div>
      );
}

export default WeatherDisplay;