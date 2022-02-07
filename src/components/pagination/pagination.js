import { Component } from '../../modules/MyReact.js';
import './pagination.css';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.container = document.createDocumentFragment();
  }

  // 하단 페이지 네비게이션바 출력
  makeNavigation(pageNum, maxPageNum) {
    const navigation = document.createElement('div');
    navigation.className = 'navigation-container';
    const makePageLink = (pageNum, innerText, hidden) => {
      const link = document.createElement('a');
      // link.href = `/pages/${pageNum}`;
      link.dataset.pageNum = pageNum;
      link.innerText = innerText;
      if (hidden) {
        link.classList.add('disable');
      }
      return link;
    };

    // |<, < 아이콘 출력
    const prevprev = makePageLink(1, '|<', pageNum <= 1);
    const prev = makePageLink(pageNum - 1, '<', pageNum <= 1);
    navigation.appendChild(prevprev);
    navigation.appendChild(prev);

    // 최대 10개 페이지 출력
    const offset = Math.floor(pageNum / 11) * 10 + 1;
    for (let p = offset; p < offset + 10 && p <= maxPageNum; p++) {
      const ahref = makePageLink(p, p);
      if (p === pageNum) {
        ahref.classList.add('on');
      }
      navigation.appendChild(ahref);
    }

    // >, >\ 아이콘 출력
    const next = makePageLink(pageNum + 1, '>', pageNum >= maxPageNum);
    const nextnext = makePageLink(maxPageNum, '>|', pageNum >= maxPageNum);

    navigation.appendChild(next);
    navigation.appendChild(nextnext);

    return navigation;
  }

  addEvents(onPageClick) {
    const navigation = this.container.querySelector('.navigation-container');
    navigation.addEventListener('click', onPageClick);
  }

  render() {
    this.container.innerHTML = '';

    const { pageNum, maxPageNum, onPageClick } = this.props;

    const navigation = this.makeNavigation(pageNum, maxPageNum);
    this.container.appendChild(navigation);
    this.addEvents(onPageClick);
    return this.container;
  }
}

export default Pagination;
