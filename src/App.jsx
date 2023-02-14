import { Component } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import { FetchImagesByQuery } from './services/FetchImagesByQuery';
import { STATUS } from './constants/status.constants';

import { Searchbar } from './components/Searchbar/Searchbar';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { Loder } from './components/Loder/Loder';
import { Button } from './components/Button/Button';
import {Modal } from './components/Modal/Modal';

export class App extends Component {
  state = {
    images: [],
    largeImage: '',
    page: 1,
    query: '',
    isLoading: false,
    imagesPerPage: 12,
    showLoadMoreBtn: false,
    status: STATUS.idle,
    showModal: false,

  };


  componentDidUpdate(_, prevState) {

    const { query, page } = this.state;

    if (
      prevState.page !== page ||
      prevState.query !== query
    ) {
      this.setState({ isLoading: true });
      const response = FetchImagesByQuery(query, page);
      response
        .then(({ data }) => {
          const totalPages = Math.ceil(data.totalHits / this.state.imagesPerPage);
          
            const imagesData = data.hits.map(
            ({ id, webformatURL, largeImageURL,tags}) => ({
              id,
              webformatURL,
              largeImageURL,
              tags,
            })
          );
          this.setState(({ images }) => ({
            images: [...images, ...imagesData],
            totalImages: data.totalHits,
          }));
          if (totalPages === 0) {
            NotificationManager.warning('Sorry, there are no images matching your search query. Please try again') ;
            
          }
          if (totalPages > page) {
            this.setState({ showLoadMoreBtn: true });
           
          } else { this.setState({ showLoadMoreBtn: false }); }
        })
          
        .catch(() => { NotificationManager.error('Oops ...something went wrong') })
        .finally(() => {
          this.setState({ isLoading: false })
        });
    }
  };
    


    
  fetchData = async ({ query = '', page = 1 }) => {
    this.setState({ isLoading: true });
    try {
      const { data } = await FetchImagesByQuery({ query, page });
      const { hits } = data;
      this.setState({ images: hits, status: STATUS.success });
    } catch (error) {
      this.setState({ status: STATUS.error });
    }
  };


    handleUpdateQuery = value => {

      const currentQuery = value.trim().toLowerCase();

      if (currentQuery) {
        this.setState({
          page: 1,
          query: value,
          images: [],
          isLoading: true,
          showLoadMoreBtn: false,
        
        })
      }
    }


    handleLoadMore = () => {
      this.setState(prevState => ({
        page: prevState.page + 1,
        isLoading: true,

       
      }));
    }
  
    openModal = index => {
      this.setState(({ images }) => ({
        showModal: true,
        largeImage: images[index].largeImageURL,
      }));
    };
  
    handleToggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
    };

    render() {

      const { isLoading, images, showModal, largeImage } = this.state;
      const { handleUpdateQuery, handleToggleModal, openModal, handleLoadMore } = this;
    
      return (
        <>
          <Searchbar onSubmit={handleUpdateQuery} />

          {images.length !== 0 && (
          <ImageGallery images={images} openModal={openModal} />
          )}

          {showModal && (
          <Modal onClose={handleToggleModal} largeImage={largeImage} />
          )}

          {isLoading && <Loder />}

          {this.state.showLoadMoreBtn && <Button onClick={handleLoadMore} />}
       
       
          <NotificationContainer />
        </>
    
      );
 
    }
  
}
