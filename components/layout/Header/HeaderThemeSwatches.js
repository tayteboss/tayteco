import { AnimatePresence, motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { theme } from '../../../styles/theme';
import changeColourTheme from '../../../utils/changeColourTheme';

const HeaderThemeSwatchesWrapper = styled(motion.div)`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	margin-top: 10px;
`;

const iconCss = css`
	height: 10px;
	width: 10px;
	border-radius: 100%;
	border: 1px solid var(--colour-intro-fore);

	&:not(:last-child) {
		margin-right: 8px;
	}
`;

const ClearIcon = styled.button`
	${iconCss}
	background: ${(props) => props.theme.colours.backClear};
`;

const CloudyIcon = styled.button`
	${iconCss}
	background: ${(props) => props.theme.colours.backClouds};
`;

const RainIcon = styled.button`
	${iconCss}
	background: ${(props) => props.theme.colours.backRain};
`;

const ThunderIcon = styled.button`
	${iconCss}
	background: ${(props) => props.theme.colours.backThunder};
`;

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

const HeaderThemeSwatches = ({ isActive }) => {
	const handleThemeChange = (weather) => {
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
	}

	return (
		<>
			<AnimatePresence>
				{isActive && (
					<HeaderThemeSwatchesWrapper
						variants={wrapperVariants}
						initial='hidden'
						animate='visible'
						exit='hidden'
					>
						<ClearIcon
							onMouseOver={() => handleThemeChange('Clear')}
							className="cursor-link"
						/>
						<CloudyIcon
							onMouseOver={() => handleThemeChange('Clouds')}
							className="cursor-link"
						/>
						<RainIcon
							onMouseOver={() => handleThemeChange('Rain')}
							className="cursor-link"
						/>
						<ThunderIcon
							onMouseOver={() => handleThemeChange('Thunderstorm')}
							className="cursor-link"
						/>
					</HeaderThemeSwatchesWrapper>
				)}
			</AnimatePresence>
		</>
	);
};

export default HeaderThemeSwatches;
