import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const HeaderWeatherWrapper = styled.div`
	text-align: right;

	transition: all var(--transition-speed-fast) ease;
`;

const Location = styled.p``;

const Weather = styled.p``;

const LoadingWrapper = styled.div`
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

const wrapperVariants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.3,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: [1, 0],
		transition: {
			duration: 0.6,
			ease: 'linear',
			repeat: 'Infinity',
			repeatType: "reverse",
		}
	}
};

const HeaderWeather = () => {
	const [time, setTime] = useState(false);
	const [weather, setWeather] = useState(false);
	const [temp, setTemp] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

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

		setTimeout(() => {
			setIsLoading(false);
		}, 1500);

		return function cleanup() {
			clearInterval(timerId);
		};
	}, []);

	return (
		<HeaderWeatherWrapper>
			{isLoading ? (
				<LoadingWrapper>
					<Icon
						variants={wrapperVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
					/>
					<Location>Loading weather</Location>
				</LoadingWrapper>
			) : (
				<>
					{time && (
						<Location>Melbourne - {time}</Location>
					)}
					<Weather>{weather && weather} {temp && temp}°</Weather>
				</>
			)}
		</HeaderWeatherWrapper>
	);
};

export default HeaderWeather;
