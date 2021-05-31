const API_KEY = '21833182-c50b5ade5b44b638c37fcd74e';
const BASE_URL = 'https://pixabay.com/api';
const options = {
  headers: {
    Authorization: API_KEY,
    mode: 'cors',
  },
};

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages(search) {
    // console.log(this);
    const parameters = [
      'image_type=photo',
      'orientation=horizontal',
      'per_page=12',
      `key=${API_KEY}`,
      `page=${this.page}`,
      `q=${search}`,
    ];
    const url = `${BASE_URL}/?${parameters.join('&')}`;
    alert(url);
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
