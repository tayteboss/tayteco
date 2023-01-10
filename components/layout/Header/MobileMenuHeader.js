import styled from 'styled-components';

const MobileMenuHeaderWrapper = styled.div`
	display: none;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: flex;
		justify-content: space-between;
		align-items: center;
		grid-column: 1 / -1;
		margin-bottom: 32px;
	}
`;

const Logo = styled.div`
	grid-column: 1 / 7;

	transition: all var(--transition-speed-fast) ease;
`;

const MobileMenuTrigger = styled.button`
	display: none !important;
	
	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: block !important;
		color: var(--colour-intro-fore);
		text-decoration: underline;
	
		transition: all var(--transition-speed-fast) ease;
	}
`;

const MobileMenuHeader = ({ setMenuIsOpen }) => {
	return (
		<MobileMenuHeaderWrapper>
			<Logo>tayte.co</Logo>
			<MobileMenuTrigger
				className="type-p"
				onClick={() => setMenuIsOpen(false)}
			>
				Close information
			</MobileMenuTrigger>
		</MobileMenuHeaderWrapper>
	);
};

export default MobileMenuHeader;
