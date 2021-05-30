const API_KEY = '21833182-c50b5ade5b44b638c37fcd74e';
const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';
const options = {
  headers: {
    Authorization: API_KEY,
  },
};

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal
      &q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;

    return fetch(url, options)
      .then(response => response.json())
      .then(({ images }) => {
        this.incrementPage();
        return images;
      });
  }

  incrementPage() {
    this.page++;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuerry) {
    this.searchQuery = newQuerry;
  }
}
