import styled from 'styled-components';

const Wrapper = styled.div`
	margin: 0 auto;
	width: ${props => props.theme.layout.innerWrapper};
	padding-left: 16px;
	padding-right: 16px;
`;

const InnerWrapper = (props) => {
	return (
		<Wrapper className="inner-wrapper">
			{props.children}
		</Wrapper>
	)
};

export default InnerWrapper;