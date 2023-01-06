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

const HeaderIntro = ({ description }) => {
	return (
		<HeaderIntroWrapper>
			{description && (
				<HeaderDescriptionWrapper>
					<RichText data={description} />
				</HeaderDescriptionWrapper>
			)}
			<HeaderWeather />
		</HeaderIntroWrapper>
	);
};

export default HeaderIntro;
