import PropTypes from 'prop-types';
import styles from '../Button/Button.module.css';


export const Button = ({ onClick, isLoading }) => {
    return (
        <div className={styles.loadMoreBtnArea}>
            <button type="button"
                className={styles.loadMoreBtn}
                onClick={onClick}
                // disabled={isLoading}
            >Load more</button>

        </div>
    )
}


Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};