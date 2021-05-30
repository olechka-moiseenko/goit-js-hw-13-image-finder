import './sass/main.scss';
import './api-servise.js';

const refs = {
  searchForm: document.querySelector('#search-form'),
  imageGallerey: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};
const service = new ApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefaut();
  searchQuery = e.currentTarget.elements.query.value;
  service.fetchImages(searchQuery);
}

function onLoadMore() {
  service.fetchImages();
}
