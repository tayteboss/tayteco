import styled from 'styled-components';
import Marquee from "react-fast-marquee";

const HeaderMenuBottomWrapper = styled.div`
	padding-bottom: 16px;
`;

const TickerWrapper = styled.div``;

const Aoc = styled.p``;

const HeaderMenuBottom = ({ aoc }) => {
	return (
		<HeaderMenuBottomWrapper>
			<TickerWrapper>
				{aoc && (
					<Marquee
						gradient={false}
					>
						<Aoc>{aoc}</Aoc>
					</Marquee>
				)}
			</TickerWrapper>
		</HeaderMenuBottomWrapper>
	);
};

export default HeaderMenuBottom;
