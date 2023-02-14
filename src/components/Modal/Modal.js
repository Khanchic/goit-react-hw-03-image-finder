import { Component } from 'react';
import PropTypes from 'prop-types';


import styles from '../Modal/Modal.module.css';


export class Modal extends Component { 

 
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyClose);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyClose);
    }

    handleKeyClose = event => {
        if (event.code === 'Escape') {
        this.props.onClose();
        }
    };



    render() {
        const { largeImage, tags, onClose} = this.props;
        return (
            <div className={styles.Overlay} onClick={onClose}>
            <div className={styles.Modal}>
                <img src={largeImage} alt={tags} />
            </div>
            </div>
        )
}


}


Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    largeImage: PropTypes.string.isRequired,
    tags: PropTypes.string,

}

