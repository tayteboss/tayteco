import styled from 'styled-components';
import RichText from '../../common/RichText';
import HeaderWeather from './HeaderWeather';

const HeaderIntroWrapper = styled.div`
	display: flex;
	justify-content: space-between;

	transition: all var(--transition-speed-fast) ease;
`;

const HeaderDescriptionWrapper = styled.div`
	max-width: 800px;

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
