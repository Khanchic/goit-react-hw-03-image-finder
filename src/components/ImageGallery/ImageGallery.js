
import { ImageGalleryItem } from '../ImageGallery/ImageGalleryItem';
import styles from '../ImageGallery/ImageGallery.module.css';
import PropTypes from 'prop-types';



export function ImageGallery ({ images, openModal}) {

  
    return (
        <>
            <ul className={styles.ImageGallery}>
                {images?.map(({ id, webformatURL, tags },index) => (
                 <ImageGalleryItem key={id}
                    imageUrl={webformatURL}
                    tags={tags}
                    index={index}
                    openModal={openModal}

                    />
            ))}
            </ul>
            
        </>
        
        )
    }
   
ImageGallery.propTypes = {
  openModal: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags:PropTypes.string,
    })
  ),
};