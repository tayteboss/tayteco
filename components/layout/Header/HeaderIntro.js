import styled from 'styled-components';
import RichText from '../../common/RichText';
import HeaderWeather from './HeaderWeather';

const HeaderIntroWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	position: relative;
	z-index: 2;

	transition: all var(--transition-speed-fast) ease;
`;

const HeaderDescriptionWrapper = styled.div`
	max-width: 460px;

	transition: all var(--transition-speed-fast) ease;
`;

const HeaderIntro = ({ description, cursorRefresh, setFaviconTheme }) => {
	return (
		<HeaderIntroWrapper>
			{description && (
				<HeaderDescriptionWrapper>
					<RichText data={description} />
				</HeaderDescriptionWrapper>
			)}
			<HeaderWeather
				cursorRefresh={cursorRefresh}
				setFaviconTheme={setFaviconTheme}
			/>
		</HeaderIntroWrapper>
	);
};

export default HeaderIntro;
