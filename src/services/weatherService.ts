const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY as string;

if (!API_KEY) {
    throw new Error("API key is not defined in the environment variables.");
}
const BASE_URL = process.env.REACT_APP_OPENWEATHER_BASE_URL;
if (!BASE_URL) {
    throw new Error("API base url is not defined in the environment variables.");
}
interface WeatherResponse {
    main: {
        temp : number;
        humidity: number;
    };
    weather: {description: string}[];
    name: string;
    sys: { country: string};
}

export const getWeather = async (data: string, type: 'city' | 'zip' | 'coordinates'): Promise<WeatherResponse | null> => {
    try {
        console.log(API_KEY);
        let url : string = `${BASE_URL}?appid=${API_KEY}&units=metric`;

        if(type === 'city'){
            url += `&q=${data}`;
        }
        else if (type === 'zip'){
            url += `&zip=${data}`;
        }
        else if (type === 'coordinates'){
            const [lat, lon] : string[] = data.split(',');
            url += `&lat=${lat}&lon=${lon}`;
        }

        // Use fetch to make the request
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const weatherData: WeatherResponse = await response.json();
        console.log(url);
        console.log(JSON.stringify(weatherData));
        return weatherData;
    } catch (error) {
        console.error('Error fetching weather data: ', error);
        return null;
    }
};
