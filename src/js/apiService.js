export default class PixabayClient {
  constructor(perPage) {
    this.BASE_URL = 'https://pixabay.com/api';
    this.API_KEY = '21833182-c50b5ade5b44b638c37fcd74e';
    this.perPage = perPage;
    this._canLoadMore = false;
  }

  async fetch() {
    const url = this.constructUrl();
    const response = await fetch(url);
    const data = await response.json();
    this._canLoadMore =  data.totalHits - (this.perPage * (this.page-1)+data.hits.length) > 0;
    return data.hits;
  }

  canLoadMore() {
    return this._canLoadMore;
  }

  async findImages(query) {
    this.page = 1;
    this.query = query;
    return await this.fetch();
  }

  async getNextPage() {
    this.page++;
    return await this.fetch();
  }

  constructUrl() {
    const parameters = [
      'image_type=photo',
      'orientation=horizontal',
      `per_page=${this.perPage}`,
      `key=${this.API_KEY}`,
      `page=${this.page}`,
      `q=${this.query}`,
    ];
    return `${this.BASE_URL}/?${parameters.join('&')}`;
  }
}