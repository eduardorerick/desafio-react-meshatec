
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
  console.log(process.env.OPENWEATHER_API_KEY)
  const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=557d6d87c71881cd50c90312e02cd819`);
  const data = await response.json();
  const results = {
    name: data.name,
    temp: Math.round((data.main.temp - 273)),
    genre: pickGenre(Math.round((data.main.temp - 273)))
  }
  return results
}