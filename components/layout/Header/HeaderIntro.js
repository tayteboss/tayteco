import styled from 'styled-components';
import RichText from '../../common/RichText';
import HeaderWeather from './HeaderWeather';

const HeaderIntroWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

const HeaderDescriptionWrapper = styled.div`
	max-width: 800px;
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
