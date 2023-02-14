import axios from 'axios';

export function FetchImagesByQuery(searchQuery, page) {
    
  const response = axios.get(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=31339711-72da964270697c18a030d30f9&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response;
}



