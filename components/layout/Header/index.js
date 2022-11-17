import styled from 'styled-components';
import HeaderIntro from './HeaderIntro';
import HeaderMain from './HeaderMain';
import InnerWrapper from '../../common/InnerWrapper';

const HeaderWrapper = styled.header`
	background: var(--colour-intro-back);
	color: var(--colour-intro-fore);
	height: 98vh;
	padding: 16px 0;

	.inner-wrapper {
		height: 100%;
	}
`;

const HeaderInner = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
`;

const Header = ({ data }) => {
	return (
		<HeaderWrapper>
			<InnerWrapper>
				<HeaderInner>
					<HeaderIntro description={data.description} />
					<HeaderMain />
				</HeaderInner>
			</InnerWrapper>
		</HeaderWrapper>
	)
};

export default Header;
