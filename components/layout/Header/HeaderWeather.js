import { useEffect } from 'react';
import styled from 'styled-components';

const HeaderWeatherWrapper = styled.div`
	text-align: right;
`;

const Location = styled.p``;

const Weather = styled.p``;

const HeaderWeather = () => {
	useEffect(() => {
		fetch('/api/fetchWeather', {
			method: 'GET'
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('weatherData', data);
			})
	}, []);

	return (
		<HeaderWeatherWrapper>
			<Location>Melbourne - 20:43:36</Location>
			<Weather>Overcast 20°</Weather>
		</HeaderWeatherWrapper>
	);
};

export default HeaderWeather;
