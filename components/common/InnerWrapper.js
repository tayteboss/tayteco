import styled from 'styled-components';

const Wrapper = styled.div`
	margin: 0 auto;
	padding: 0 16px;
`;

const InnerWrapper = (props) => {
	return (
		<Wrapper className="inner-wrapper">
			{props.children}
		</Wrapper>
	)
};

export default InnerWrapper;