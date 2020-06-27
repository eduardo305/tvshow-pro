const CustomError = ({ statusCode }) => {
	if (statusCode === 404) {
		return <h1>The resource was not found...</h1>;
	}

	return <h1>Oops! Something went wrong...</h1>;
};

CustomError.getServerSideProps = ({ err, res }) => {
	return {
		props: {
			statusCode: 404,
		},
	};
};

export default CustomError;
