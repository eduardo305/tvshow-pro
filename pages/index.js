import Router from 'next/router';
import cookies from 'nookies';

const Home = () => null;

Home.getInitialProps = context => {
	const { defaultCountry } = cookies.get(context);
	const country = context.query.country || defaultCountry || 'us';

	process.browser
		? Router.replace('/[country]', `${country}`)
		: context.res.writeHead(302, { Location: `/${country}` });

	context.res.end();
};

export default Home;
