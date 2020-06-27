import axios from 'axios';
import parse from 'html-react-parser';
import Cast from '../../components/Cast';
import Error from 'next/error';
import {
	withAuthorization,
	withAuthServerSideProps,
} from '../../utils/withAuthorization';

const ShowDetails = ({ show = {}, statusCode }) => {
	const { name, image, summary, _embedded } = show;

	if (statusCode) {
		return <Error statusCode={statusCode} />;
	}

	return (
		<div className="show-details">
			<div
				className="show-details__poster"
				style={{ backgroundImage: `url(${image.original})` }}
			></div>
			<h1>{name}</h1>
			{parse(summary)}

			{_embedded.cast.length > 0 && <Cast cast={_embedded.cast} />}

			<style jsx>{`
				.show-details__poster {
					height: 200px;
					background-size: cover;
				}
			`}</style>
		</div>
	);
};

const getComponentServerSideProps = async (props) => {
	try {
		const { showId } = props.query;
		const response = await axios.get(
			`https://api.tvmaze.com/shows/${showId}?embed=cast`
		);

		return {
			props: {
				show: response.data,
			},
		};
	} catch (error) {
		return {
			statusCode: error.response ? error.response.status : 500,
		};
	}
};

export const getServerSideProps = withAuthServerSideProps(
	getComponentServerSideProps
);

export default withAuthorization(ShowDetails);
