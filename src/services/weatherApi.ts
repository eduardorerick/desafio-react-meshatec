
interface CityData {
  name: string;
  temp: number;
  genre: string;
}

function pickGenre(temp: number) {

  const result = temp > 32 ? 'Rock'
    : temp > 24 ? 'Pop'
      : temp > 16 ? 'Classica' : 'Lofi'

  return result;
}

export const getWeather = async (city: string): Promise<CityData> => {
  const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`);
  const data = await response.json();
  const results = {
    name: data.name,
    temp: Math.round((data.main.temp - 273)),
    genre: pickGenre(Math.round((data.main.temp - 273)))
  }
  return results
}