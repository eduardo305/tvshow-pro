import axios from 'axios';
import parse from 'html-react-parser';
import Cast from '../../components/Cast';

const ShowDetails = ({ show }) => {
	const { name, image, summary, _embedded } = show;

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

ShowDetails.getInitialProps = async ({ query }) => {
	const { showId } = query;
	const response = await axios.get(
		`http://api.tvmaze.com/shows/${showId}?embed=cast`
	);

	return {
		show: response.data
	};
};

export default ShowDetails;
