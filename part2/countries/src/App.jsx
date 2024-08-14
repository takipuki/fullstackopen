import { useState, useEffect } from 'react';
import axios from 'axios';


const API_COUNTRY = 'https://studies.cs.helsinki.fi/restcountries/api/';
const API_WEATHER = `https://api.openweathermap.org/data/2.5/weather?appid=${import.meta.env.VITE_API_KEY}&q=`;
const API_WEATHER_ICONS = 'https://openweathermap.org/img/wn/';


function App() {
	const [countries, setCountries] = useState([]);
	useEffect(() => {
		axios
			.get(API_COUNTRY + 'all/')
			.then(res => {
				setCountries(res.data);
				setSelected(res.data);
			})
	}, []);

	const [selected, setSelected] = useState(countries);

	return (
		<>
			<p>
				filter: <input onChange={e => {
					setSelected(
						countries.filter(v =>
							v.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
					)
				}}/>
			</p>

			<Content selected={selected} setSelected={setSelected} />
		</>
	);
}


function Content({selected, setSelected}) {
	if (selected.length == 1)
		return <Country country={selected[0]} />;

	return (
		<ul>
			{selected.map((v, i) =>
				<li key={i}>
					{v.name.common}
					<button
						onClick={() => setSelected([v])}
					>show</button>
				</li>
			)}
		</ul>
	);
}


function Country({country}) {
	return (
		<>
			<h1>{country.name.common}</h1>
			<p>capital {country.capital[0]}</p>
			<p>area {country.area} km<sup>2</sup></p>

			<h3>languages</h3>
			<ul>
				{
					Object
						.entries(country.languages)
						.map((pair, i) => <li key={i}>{pair[1]}</li>)
				}
			</ul>

			<h3>flag</h3>
			<img src={country.flags.png} alt={country.flags.alt} />

			<h3>weather in {country.capital[0]}</h3>
			<Weather country={country} />
		</>
	);
}


function Weather({country}) {
	const [weather, setWeather] = useState(null);

	useEffect(() => {
		axios
			.get(API_WEATHER + country.capital[0])
			.then(res => setWeather(res.data));
	}, [country]);

	if (!weather) return <></>;

	return (
		<>
			<p>temperature {(weather.main.temp - 273.15).toFixed(2)} °C</p>
			<img
				src={API_WEATHER_ICONS + weather.weather[0].icon + '@2x.png'}
				alt={weather.weather[0].description}
			/>
			<p>wind {weather.wind.speed} m/s</p>
		</>
	)
}


export default App
