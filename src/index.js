import './sass/main.scss';
import ApiService from './api-servise.js';
import imgTpl from './templates/card-image.hbs';
const refs = {
  searchForm: document.querySelector('#search-form'),
  imageGallerey: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};
const apiservice = new ApiService();
// console.log(apiservice);

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefaut();

  const search = e.currentTarget.elements.query.value;

  if (search === '') {
    return alert('Введите правильный запрос');
  }
  apiservice.resetPage();
  apiservice.fetchImages(search).then(images => {
    clearimageGallerey();
    appendImagesMarkup(images);
  });
}

function onLoadMore() {
  apiservice.fetchImages().then(appendImagesMarkup);
}

function appendImagesMarkup(images) {
  refs.imageGallerey.insertAdjacentElement('beforeend', imgTpl(images));
}

function clearImageGallerey() {
  refs.imageGallerey.innerHTML = '';
}
