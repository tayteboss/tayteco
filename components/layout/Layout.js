import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';
import Cursor from '../elements/Cursor';

const Main = styled.main``;

const Layout = ({ children, data, cursorRefresh }) => {
	return (
		<>
			{data && <Header data={data} cursorRefresh={cursorRefresh} />}
			<Main>
				{ children }
			</Main>
			{data && <Footer />}
			<Cursor cursorRefresh={cursorRefresh} />
		</>
	)
};

export default Layout;