import PixabayClient from './apiService.js';
import templatePrint from '../templates/card-image.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

export default class ImageFinder {
  constructor(resultsPerPage, resultSelector, loadMoreBtnSelector) {
    this.pixabayClient = new PixabayClient(resultsPerPage);
    this.refs = {
      result: document.querySelector(resultSelector),
      loadMoreBtn: document.querySelector(loadMoreBtnSelector),
    };
    this.refs.result.addEventListener('click', this.onCardClick.bind(this));
    this.refs.loadMoreBtn.addEventListener('click', this.loadMore.bind(this));
  }

  async findImages(query) {
    this.clear();
    this.show(await this.pixabayClient.findImages(query), this.pixabayClient.canLoadMore());
  }

  async loadMore() {
    this.show(await this.pixabayClient.getNextPage(), this.pixabayClient.canLoadMore());
    setTimeout(this.scrollToEnd.bind(this), 1000);
  }

  scrollToEnd() {
    document.body.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }

  show(data, canLoadMore) {
    if (canLoadMore) {
      this.refs.loadMoreBtn.classList.remove('is-hidden');
    } else {
      this.refs.loadMoreBtn.classList.add('is-hidden');
    }

    const html = templatePrint(data);
    this.refs.result.insertAdjacentHTML('beforeend', html);
  }
  showModal(imgUrl) {
    const changeModalImage = `<img src=${imgUrl} alt="icon"/>`;
    const instance = basicLightbox.create(changeModalImage);
    instance.show();
  }

  onCardClick(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    this.showModal(e.target.dataset.source);
  }

  clear() {
    this.refs.result.innerHTML = '';
  }
}
