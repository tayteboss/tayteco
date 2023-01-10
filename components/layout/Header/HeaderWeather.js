import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import changeColourTheme from '../../../utils/changeColourTheme';
import HeaderThemeSwatches from './HeaderThemeSwatches';

const HeaderWeatherWrapper = styled.div`
	text-align: right;

	transition: all var(--transition-speed-fast) ease;
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

const HeaderWeather = ({ cursorRefresh }) => {
	const [time, setTime] = useState(false);
	const [weather, setWeather] = useState(false);
	const [temp, setTemp] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [themeSwatchesIsActive, setThemeSwatchesIsActive] = useState(true);

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
		if (!isLoading) return;
		cursorRefresh();

		const timer = setTimeout(() => {
			const t = theme.colours;
			switch (weather) {
				case 'Clear':
					changeColourTheme(
						t.backClear,
						t.backClearEngaged,
						t.foreClear
					);
					break;
				case 'Rain':
					changeColourTheme(
						t.backRain,
						t.backRainEngaged,
						t.foreRain
					);
					break;
				case 'Drizzle':
					changeColourTheme(
						t.backRain,
						t.backRainEngaged,
						t.foreRain
					);
					break;
				case 'Thunderstorm':
					changeColourTheme(
						t.backThunder,
						t.backThunderEngaged,
						t.foreThunder
					);
					break;
				case 'Clouds':
					changeColourTheme(
						t.backClouds,
						t.backCloudsEngaged,
						t.foreClouds
					);
					break;
			
				default:
					changeColourTheme(
						t.backThunder,
						t.backThunderEngaged,
						t.foreThunder
					);
					break;
			}
		}, 750);

		return () => {
			clearTimeout(timer);
		}
	}, [weather, isLoading])

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

		const loadingDelayTimer = setTimeout(() => {
			setIsLoading(false);
		}, 1500);

		const sneakSwatchesTimer = setTimeout(() => {
			setThemeSwatchesIsActive(false);
		}, 3000);

		return function cleanup() {
			clearInterval(timerId);
			clearTimeout(loadingDelayTimer);
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
							<Location>Melbourne - {time}</Location>
						)}
						<Weather>{weather && weather} {temp && temp}°</Weather>
						<HeaderThemeSwatches isActive={themeSwatchesIsActive} />
					</MotionWrapper>
				)}
			</AnimatePresence>
		</HeaderWeatherWrapper>
	);
};

export default HeaderWeather;
