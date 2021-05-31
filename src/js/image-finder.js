import PixabayClient from './pixabay-client.js';
import templatePrint from '../templates/card-image.hbs';

export default class ImageFinder {
  constructor(resultsPerPage, resultSelector, loadMoreBtnSelector) {
    this.pixabayClient = new PixabayClient(resultsPerPage);
    this.refs = {
      result: document.querySelector(resultSelector),
      loadMoreBtn:  document.querySelector(loadMoreBtnSelector),
    }
    this.refs.loadMoreBtn.addEventListener('click', this.loadMore.bind(this));
  }

  async findImages(query) {
    this.clear();
    this.show(await this.pixabayClient.findImages(query),
              this.pixabayClient.canLoadMore());
  }

  async loadMore() {
    this.show(await this.pixabayClient.getNextPage(),
              this.pixabayClient.canLoadMore());
  }

  show(data, canLoadMore) {
    if(canLoadMore){
      this.refs.loadMoreBtn.classList.add("is-hidden");
    }
    else{
      this.refs.loadMoreBtn.classList.remove("is-hidden");
    }

    const html =  templatePrint(data);
    this.refs.result.insertAdjacentHTML('beforeend', html);
  }

  clear() {
    this.refs.result.innerHTML = '';
  }
}
