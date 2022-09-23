import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';

const Main = styled.main``;

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<Main>
				{ children }
			</Main>
			<Footer />
		</>
	)
};

export default Layout;