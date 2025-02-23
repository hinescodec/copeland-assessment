import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { getWeather } from '../services/weatherService';
import React from 'react';

jest.mock('../services/weatherService');

describe('Weather App', () => {
  it('renders the app and allows city search', async () => {
    const mockWeatherData = {
      name: 'New York',
      sys: { country: 'US' },
      weather: [{ description: 'Clear sky' }],
      main: { temp: 25, humidity: 60 },
    };

    // Mock the resolved value of getWeather
    (getWeather as jest.Mock).mockResolvedValue(mockWeatherData);

    render(<App />);

    // Simulate user interaction: entering city name
    fireEvent.change(screen.getByPlaceholderText('Enter city, zip, or coordinates'), {
      target: { value: 'New York' },
    });

    // Select "Search by City" from the dropdown
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'city' },
    });

    // Click the search button
    fireEvent.click(screen.getByText('Search'));

    // Wait for the weather information to appear on the screen
    await waitFor(() => {
      expect(screen.getByText(/New York/)).toBeInTheDocument();
      expect(screen.getByText(/Clear sky/)).toBeInTheDocument();
      expect(screen.getByText(/25°C/)).toBeInTheDocument();
      expect(screen.getByText(/60%/)).toBeInTheDocument();
    });
  });

  it('renders the app and allows zip search', async () => {
    const mockWeatherData = {
      name: 'New York',
      sys: { country: 'US' },
      weather: [{ description: 'Clear sky' }],
      main: { temp: 25, humidity: 60 },
    };

    // Mock the resolved value of getWeather
    (getWeather as jest.Mock).mockResolvedValue(mockWeatherData);

    render(<App />);

    // Simulate user interaction: entering zip code
    fireEvent.change(screen.getByPlaceholderText('Enter city, zip, or coordinates'), {
      target: { value: '10001' },
    });

    // Select "Search by Zip Code" from the dropdown
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'zip' },
    });

    // Click the search button
    fireEvent.click(screen.getByText('Search'));

    // Wait for the weather information to appear on the screen
    await waitFor(() => {
      expect(screen.getByText(/New York/)).toBeInTheDocument();
      expect(screen.getByText(/Clear sky/)).toBeInTheDocument();
      expect(screen.getByText(/25°C/)).toBeInTheDocument();
      expect(screen.getByText(/60%/)).toBeInTheDocument();
    });
  });

  it('renders the app and allows coordinates search', async () => {
    const mockWeatherData = {
      name: 'New York',
      sys: { country: 'US' },
      weather: [{ description: 'Clear sky' }],
      main: { temp: 25, humidity: 60 },
    };

    // Mock the resolved value of getWeather
    (getWeather as jest.Mock).mockResolvedValue(mockWeatherData);

    render(<App />);

    // Simulate user interaction: entering coordinates (latitude,longitude)
    fireEvent.change(screen.getByPlaceholderText('Enter city, zip, or coordinates'), {
      target: { value: '40.7128,-74.0060' }, // Coordinates for New York City
    });

    // Select "Search by Coordinates" from the dropdown
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'coordinates' },
    });

    // Click the search button
    fireEvent.click(screen.getByText('Search'));

    // Wait for the weather information to appear on the screen
    await waitFor(() => {
      expect(screen.getByText(/New York/)).toBeInTheDocument();
      expect(screen.getByText(/Clear sky/)).toBeInTheDocument();
      expect(screen.getByText(/25°C/)).toBeInTheDocument();
      expect(screen.getByText(/60%/)).toBeInTheDocument();
    });
  });
});
