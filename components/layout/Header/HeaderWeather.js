import { useEffect, useState } from 'react';
import styled from 'styled-components';

const HeaderWeatherWrapper = styled.div`
	text-align: right;
`;

const Location = styled.p``;

const Weather = styled.p``;

const HeaderWeather = () => {
	const [time, setTime] = useState(false);
	const [weather, setWeather] = useState(false);
	const [temp, setTemp] = useState(false);

	const startTime = () => {
		let date = new Date();
		let h = date.getHours(); // 0 - 23
		let m = date.getMinutes(); // 0 - 59
		let s = date.getSeconds(); // 0 - 59
		let session = "AM";
		
		if(h == 0){
			h = 12;
		}
		
		if(h > 12){
			h = h - 12;
			session = "PM";
		}
		
		h = (h < 10) ? "0" + h : h;
		m = (m < 10) ? "0" + m : m;
		s = (s < 10) ? "0" + s : s;
		
		let time = h + ":" + m + ":" + s + " " + session;

		setTime(time);
	};

	useEffect(() => {
		const timerId = setInterval(startTime, 1000);

		fetch('/api/fetchWeather', {
			method: 'GET'
		})
			.then((response) => response.json())
			.then((data) => {
				setWeather(data?.weather[0]?.main)
				setTemp(Math.floor(data?.main?.temp - 273.15));
			})

		return function cleanup() {
			clearInterval(timerId);
		};
	}, []);

	return (
		<HeaderWeatherWrapper>
			{time && (
				<Location>Melbourne - {time}</Location>
			)}
			<Weather>{weather && weather} {temp && temp}°</Weather>
		</HeaderWeatherWrapper>
	);
};

export default HeaderWeather;
