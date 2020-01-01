import axios from 'axios';

const CastMemberDetails = props => {
	return <img src={props.person.image.medium} />;
};

CastMemberDetails.getInitialProps = async ({ query }) => {
	const response = await axios.get(
		`https://api.tvmaze.com/people/${query.personId}`
	);

	return {
		person: response.data
	};
};

export default CastMemberDetails;
