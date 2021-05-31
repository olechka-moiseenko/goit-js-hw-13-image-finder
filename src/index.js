import './sass/main.scss';


import ImageFinder from './js/image-finder.js';

const imageFinder = new ImageFinder(12, '#gallery', '#load-more-button');

const refs = {
  searchForm: document.querySelector('#search-form'),
};
refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  const query = e.currentTarget.elements.query.value;
  if (!query.trim()) {
    alert('Введите правильный запрос');
    return;
  }
  imageFinder.findImages(query);
}