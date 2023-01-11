import Header from './Header';
import styled from 'styled-components';
import Cursor from '../elements/Cursor';

const Main = styled.main`
	position: relative;
	z-index: 1;
`;

const Layout = ({
	children,
	data,
	cursorRefresh,
	cursorLoading,
	setFaviconTheme 
}) => {
	return (
		<>
			{data && (
				<Header
					data={data}
					cursorRefresh={cursorRefresh}
					setFaviconTheme={setFaviconTheme}
				/>
			)}
			<Main>
				{ children }
			</Main>
			{/* {data && <Footer />} */}
			<Cursor
				cursorRefresh={cursorRefresh}
				cursorLoading={cursorLoading}
			/>
		</>
	)
};

export default Layout;