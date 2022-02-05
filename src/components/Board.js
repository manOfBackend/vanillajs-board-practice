import { Component } from '../modules/MyReact.js';
import { convertDate } from '../utils/time.js';
import './Board.css';

class Board extends Component {
  constructor(props) {
    super(props);
    this.container = document.createDocumentFragment();
  }

  // 컨텐츠 테이블 생성
  makeTable(data, headers, order) {
    const table = document.createElement('table');
    table.className = 'dashboard-table-container';
    const thead = document.createElement('thead');
    const theadTr = document.createElement('tr');

    for (const [id, content] of Object.entries(headers)) {
      const th = document.createElement('th');
      th.innerText = content.title;
      th.dataset.id = id;
      if ('order' in content) {
        const { headerId } = content.order;
        th.className = 'orderable';
        if (id === order.headerId) {
          th.classList.add('ordered');
        }
      }
      theadTr.appendChild(th);
    }
    thead.appendChild(theadTr);

    const tbody = document.createElement('tbody');

    for (const c of Array.from(data)) {
      const { category, content, id, created_at } = c;
      const tr = document.createElement('tr');
      tr.dataset.id = id;
      const tdId = document.createElement('td');
      tdId.innerText = id;
      const tdCategory = document.createElement('td');
      tdCategory.innerText = category;
      const tdContent = document.createElement('td');
      tdContent.innerText = content;
      if (c.recommend >= 10) {
        const hot = document.createElement('span');
        hot.className = 'hot';
        hot.innerText = 'HOT';
        tdContent.appendChild(hot);
      }
      const tdCreated = document.createElement('td');
      tdCreated.innerText = convertDate(created_at);
      const tdLike = document.createElement('td');
      tdLike.innerText = c.recommend;

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
    const makePageLink = (pageNum, innerText) => {
      const link = document.createElement('a');
      // link.href = `/pages/${pageNum}`;
      link.dataset.pageNum = pageNum;
      link.innerText = innerText;
      return link;
    };

    // |<, < 아이콘 출력
    if (pageNum > 1) {
      const prevprev = makePageLink(1, '|<');
      const prev = makePageLink(pageNum - 1, '<');
      navigation.appendChild(prevprev);
      navigation.appendChild(prev);
    }

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
    if (pageNum < maxPageNum) {
      const next = makePageLink(pageNum + 1, '>');
      const nextnext = makePageLink(maxPageNum, '>|');

      navigation.appendChild(next);
      navigation.appendChild(nextnext);
    }
    return navigation;
  }

  addEvents(onHeaderClick, onPageClick, onContentClick) {
    const thead = this.container.querySelector(
      '.dashboard-table-container > thead'
    );
    thead.addEventListener('click', onHeaderClick);

    const navigation = this.container.querySelector('.navigation-container');
    navigation.addEventListener('click', onPageClick);

    const tbody = this.container.querySelector(
      '.dashboard-table-container > tbody'
    );
    tbody.addEventListener('click', onContentClick, { capture: true });
  }

  render() {
    this.container.innerHTML = '';

    const {
      contents,
      pageNum,
      maxPageNum,
      onHeaderClick,
      onPageClick,
      order,
      onContentClick,
    } = this.props;

    if (!contents) return this.container;
    const headers = {
      id: {
        title: `ID${
          order.headerId === 'id' && order.orderType === 1 ? '▲' : '▼'
        }`,
        order: order.headerId === 'id' ? order.orderType : 1,
      },
      content: {
        title: '내용',
      },
      category: { title: '카테고리' },
      created: {
        title: `생성날짜${
          order.headerId === 'created' && order.orderType === 1 ? '▲' : '▼'
        }`,
        order: order.headerId === 'created' ? order.orderType : 1,
      },
      recommend: {
        title: '추천',
      },
    };

    const table = this.makeTable(contents, headers, order);
    const navigation = this.makeNavigation(pageNum, maxPageNum);
    this.container.appendChild(table);
    this.container.appendChild(navigation);
    this.addEvents(onHeaderClick, onPageClick, onContentClick);
    return this.container;
  }
}

export default Board;
