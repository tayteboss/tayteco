import styled from 'styled-components';

const HeaderWeatherWrapper = styled.div``;

const HeaderWeather = () => {
	return (
		<HeaderWeatherWrapper>
			<Location>Melbourne - 20:43:36</Location>
			<Weather>Overcast 20°</Weather>
		</HeaderWeatherWrapper>
	);
};

export default HeaderWeather;
