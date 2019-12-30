import Thumbnail from '../Thumbnail';

const Cast = ({ cast }) => {
	const renderCast = () => {
		return cast.map((castItem, index) => {
			const { image, name } = castItem.person;

			return (
				<li key={index}>
					<Thumbnail
						imageUrl={(image && image.medium) || undefined}
						caption={name}
						small
					></Thumbnail>
				</li>
			);
		});
	};

	return (
		<div className="cast">
			<h3>Cast</h3>
			<ul className="cast__list">{renderCast()}</ul>

			<style jsx>{`
				.cast__list {
					display: flex;
					overflow-x: scroll;
				}

				.cast__list > :global(li) {
					margin-right: 10px;
				}
			`}</style>
		</div>
	);
};

export default Cast;
