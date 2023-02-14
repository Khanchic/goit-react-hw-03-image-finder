import { Component } from 'react';
import PropTypes from 'prop-types';


import styles from '../Searchbar/Searchbar.module.css';


export class Searchbar extends Component {
     state = {
        value: '',
    };

    handleChange = event => {
        const { value } = event.target;
        this.setState({ value: value});
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state.value);
    };

    render() { 
        const { value } = this.state;

        return (
            <>
            <header className = {styles.searchbar} >
                <form className={styles.searchform}  onSubmit={this.handleSubmit}
>                <button type="submit" className={styles.SearchFormBtn}>
                <span className={styles.SearchFormBtnLabel}>Search</span>
                </button>

                <input
                className={styles.SearchFormInput}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                value={value}
                onChange={this.handleChange}
                />
                    </form>

            </header> 
      </>
       
    )

   }
        
        
    
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,

}