import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import changeColourTheme from '../../../utils/changeColourTheme';
import HeaderThemeSwatches from './HeaderThemeSwatches';
import moment from "moment-timezone";

const HeaderWeatherWrapper = styled.div`
	text-align: right;

	transition: all var(--transition-speed-fast) ease;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}
`;

const Location = styled.p``;

const Weather = styled.p``;

const LoadingWrapper = styled(motion.div)`
	display: flex;
	align-items: center;
`;

const Icon = styled(motion.div)`
	background: var(--colour-intro-fore);
	height: 7px;
	width: 7px;
	border-radius: 100%;
	margin-right: 9px;
`;

const MotionWrapper = styled(motion.div)``;

const wrapperVariants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.2,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.2,
			ease: 'easeInOut'
		}
	}
};

const HeaderWeather = ({ cursorRefresh, setFaviconTheme }) => {
	const [time, setTime] = useState(false);
	const [weather, setWeather] = useState(false);
	const [temp, setTemp] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [themeSwatchesIsActive, setThemeSwatchesIsActive] = useState(true);

	const startTime = (location) => {
		let h = 0;
		let m = 0;
		let s = 0;
		let session = "AM"
	
		if (location != 'London') {
			let date = new Date();
		
			h = date.getHours(); // 0 - 23
			m = date.getMinutes(); // 0 - 59
			s = date.getSeconds(); // 0 - 59
			session = "AM";
		} else {
			const time = moment().tz('Europe/London');
			h = time.format('HH');
			m = time.format('mm');
			s = time.format('ss');
		}

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
		cursorRefresh();
	}, [themeSwatchesIsActive])
	

	useEffect(() => {
		const timer = setTimeout(() => {
			const t = theme.colours;
			switch (weather) {
				case 'Clear':
					changeColourTheme(
						t.backClear,
						t.backClearEngaged,
						t.foreClear
					);
					setFaviconTheme('clear');
					break;
				case 'Rain':
					changeColourTheme(
						t.backRain,
						t.backRainEngaged,
						t.foreRain
					);
					setFaviconTheme('rain');
					break;
				case 'Drizzle':
					changeColourTheme(
						t.backRain,
						t.backRainEngaged,
						t.foreRain
					);
					setFaviconTheme('rain');
					break;
				case 'Clouds':
					changeColourTheme(
						t.backClouds,
						t.backCloudsEngaged,
						t.foreClouds
					);
					setFaviconTheme('clouds');
					break;
				case 'Mist':
					changeColourTheme(
						t.backClouds,
						t.backCloudsEngaged,
						t.foreClouds
					);
					setFaviconTheme('clouds');
					break;
				case 'Thunderstorm':
					changeColourTheme(
						t.backClouds,
						t.backCloudsEngaged,
						t.foreClouds
					);
					setFaviconTheme('thunder');
					break;
			
				default:
					changeColourTheme(
						t.backThunder,
						t.backThunderEngaged,
						t.foreThunder
					);
					setFaviconTheme('thunder');
					break;
			}
		}, 750);

		return () => {
			clearTimeout(timer);
		}
	}, [weather, isLoading])

	useEffect(() => {
		const timerId = setInterval(startTime('London'), 1000);

		fetch('/api/fetchWeather', {
			method: 'GET'
		})
			.then((response) => response.json())
			.then((data) => {
				setWeather(data?.weather[0]?.main)
				setTemp(Math.floor(data?.main?.temp - 273.15));
				setIsLoading(false);
			})

		const sneakSwatchesTimer = setTimeout(() => {
			setThemeSwatchesIsActive(false);
		}, 5000);

		return function cleanup() {
			clearInterval(timerId);
			clearTimeout(sneakSwatchesTimer);
		};
	}, []);

	return (
		<HeaderWeatherWrapper
			onMouseOver={() => setThemeSwatchesIsActive(true)}
			onMouseOut={() => setThemeSwatchesIsActive(false)}
		>
			<AnimatePresence exitBeforeEnter>
				{isLoading ? (
					<LoadingWrapper
						variants={wrapperVariants}
						initial='hidden'
						animate='visible'
						exit='hidden'
						id="1"
					>
						<Icon
							variants={wrapperVariants}
							initial="hidden"
							animate="visible"
							exit="hidden"
						/>
						<Location>Loading</Location>
					</LoadingWrapper>
				) : (
					<MotionWrapper
						variants={wrapperVariants}
						initial='hidden'
						animate='visible'
						exit='hidden'
						id="2"
					>
						{time && (
							<Location>London - {time}</Location>
						)}
						<Weather>{weather && weather} {temp && temp}°</Weather>
						<HeaderThemeSwatches
							isActive={themeSwatchesIsActive}
							setFaviconTheme={setFaviconTheme}
						/>
					</MotionWrapper>
				)}
			</AnimatePresence>
		</HeaderWeatherWrapper>
	);
};

export default HeaderWeather;
