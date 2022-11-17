import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';

const Main = styled.main``;

const Layout = ({ children, data }) => {
	return (
		<>
			{data && <Header data={data} />}
			<Main>
				{ children }
			</Main>
			{data && <Footer />}
		</>
	)
};

export default Layout;