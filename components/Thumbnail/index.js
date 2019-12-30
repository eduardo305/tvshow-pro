import ThumbnailStyles from './styles';

const Thumbnail = ({
	imageUrl = 'https://via.placeholder.com/210x295?text=?',
	caption
}) => {
	return (
		<div className="thumbnail">
			<img src={imageUrl} className="thumbnail__image" />
			<div className="thumbnail__caption">{caption}</div>

			<style jsx>{ThumbnailStyles}</style>
		</div>
	);
};

export default Thumbnail;
