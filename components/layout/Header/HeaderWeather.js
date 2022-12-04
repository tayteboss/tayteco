import { useEffect, useState } from 'react';
import styled from 'styled-components';

const HeaderWeatherWrapper = styled.div`
	text-align: right;
`;

const Location = styled.p``;

const Weather = styled.p``;

const HeaderWeather = () => {
	const [time, setTime] = useState(false);

	useEffect(() => {
		const startTime = () => {
			let today = new Date().toLocaleString("en-US", {timeZone: "Australia/Sydney"});
			console.log('today', today);
			var h = today.getHours();
			var m = today.getMinutes();
			var s = today.getSeconds();
			m = checkTime(m);
			s = checkTime(s);
			setTime(h + ":" + m + ":" + s);

			var t = setTimeout(startTime, 500);
		};

		const checkTime = (i) => {
			if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
			return i;
		};

		fetch('/api/fetchWeather', {
			method: 'GET'
		})
			.then((response) => response.json())
			.then((data) => {
				// console.log('weatherData', data);
			})
	}, []);

	return (
		<HeaderWeatherWrapper>
			{time && (
				<Location>Melbourne - {time}</Location>
			)}
			<Weather>Overcast 20°</Weather>
		</HeaderWeatherWrapper>
	);
};

export default HeaderWeather;
