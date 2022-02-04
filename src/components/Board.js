import { Component } from '../modules/MyReact.js';
import { convertDate } from '../utils/time.js';
import './Board.css';

class Board extends Component {
  constructor(props) {
    super(props);
    this.container = document.createDocumentFragment();

    this.headers = ['ID', '내용', '카테고리', '생성날짜', '추천'];
  }

  // 컨텐츠 테이블 생성
  makeTable(data) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const theadTr = document.createElement('tr');

    for (const header of this.headers) {
      const th = document.createElement('th');
      th.innerText = header;
      theadTr.appendChild(th);
    }
    thead.appendChild(theadTr);

    const tbody = document.createElement('tbody');

    for (const c of Array.from(data)) {
      const { category, content, id, created_at } = c;
      const tr = document.createElement('tr');
      const tdId = document.createElement('td');
      tdId.innerText = id;
      const tdCategory = document.createElement('td');
      tdCategory.innerText = category;
      const tdContent = document.createElement('td');
      tdContent.innerText = content;
      const tdCreated = document.createElement('td');
      tdCreated.innerText = convertDate(created_at);
      const tdLike = document.createElement('td');
      tdLike.innerText = '0';

      tr.appendChild(tdId);
      tr.appendChild(tdContent);
      tr.appendChild(tdCategory);
      tr.appendChild(tdCreated);
      tr.appendChild(tdLike);
      tbody.appendChild(tr);
    }

    table.appendChild(thead);
    table.appendChild(tbody);
    return table;
  }

  // 하단 페이지 네비게이션바 출력
  makeNavigation(pageNum, maxPageNum) {
    const navigation = document.createElement('div');
    navigation.className = 'navigation-container';

    if (pageNum > 1) {
      const prevprev = document.createElement('a');
      prevprev.href = `/pages/1`;
      prevprev.innerText = '|<';

      const prev = document.createElement('a');
      prev.href = `/pages/${pageNum - 1}`;
      prev.innerText = '<';

      navigation.appendChild(prevprev);
      navigation.appendChild(prev);
    }

    const offset = Math.floor(pageNum / 11) * 10 + 1;
    for (let p = offset; p < offset + 10 && p <= maxPageNum; p++) {
      const ahref = document.createElement('a');
      ahref.href = `/pages/${p}`;
      ahref.innerText = p;
      if (p === pageNum) {
        ahref.classList.add('on');
      }
      navigation.appendChild(ahref);
    }

    if (pageNum < maxPageNum) {
      const next = document.createElement('a');
      next.href = `/pages/${pageNum + 1}`;
      next.innerText = '>';
      const nextnext = document.createElement('a');
      nextnext.href = `/pages/${maxPageNum}`;
      nextnext.innerText = '>|';

      navigation.appendChild(next);
      navigation.appendChild(nextnext);
    }
    return navigation;
  }

  render() {
    this.container.innerHTML = '';

    const { contents, pageNum, maxPageNum } = this.props;

    if (!contents) return this.container;

    const table = this.makeTable(contents);
    const navigation = this.makeNavigation(pageNum, maxPageNum);
    this.container.appendChild(table);
    this.container.appendChild(navigation);

    return this.container;
  }
}

export default Board;
