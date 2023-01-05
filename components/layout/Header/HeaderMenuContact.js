import styled from 'styled-components';

const HeaderMenuContactWrapper = styled.div`
	grid-column: span 6;
`;

const List = styled.ul`
	&:not(:last-child) {
		margin-bottom: 16px;
	}
`;

const Item = styled.li`
	list-style: none;
	padding: 0;
`;

const Link = styled.a`
	color: var(--colour-intro-fore);
	text-decoration: underline;
`;

const HeaderMenuContact = ({ igLink, arLink, liLink }) => {
	return (
		<HeaderMenuContactWrapper>
			<List>
				<Item>
					<Link href={arLink} target="_blank">Arena</Link>
				</Item>
				<Item>
					<Link href={igLink} target="_blank">Instagram</Link>
				</Item>
				<Item>
					<Link href={liLink} target="_blank">LinkedIn</Link>
				</Item>
			</List>
			<List>
				<Item>
					<Link href="mailto:speakto@tayte.co" target="_blank">speakto@tayte.co</Link>
				</Item>
				<Item>
					<Link href="tel:+61430533698" target="_blank">[+61] 430-533-698</Link>
				</Item>
			</List>
		</HeaderMenuContactWrapper>
	);
};

export default HeaderMenuContact;
