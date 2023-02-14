import styles from '../ImageGallery/ImageGallery.module.css';
import PropTypes from 'prop-types';



export const ImageGalleryItem = ({ imageUrl, tags, index, openModal }) => {
   


    return (
        <li className={styles.ImageGalleryItem}>
            <img className={styles.GalleryImage}
                src={imageUrl}
                alt={tags}
                onClick={() => openModal(index)} />
        </li>
    );
   
}

ImageGalleryItem.propTypes = {
    index: PropTypes.number.isRequired,
    tags: PropTypes.string,
    imageUrl: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired,
};