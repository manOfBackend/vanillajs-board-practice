import { Component } from '../../modules/MyReact.js';
import { convertDate } from '../../utils/time.js';
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

    const colgroup = document.createElement('colgroup');

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

      const col = document.createElement('col');
      col.setAttribute('width', content.width);
      colgroup.appendChild(col);
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
      const contentDiv = document.createElement('div');
      contentDiv.className = 'content';
      contentDiv.innerText = content;
      tdContent.appendChild(contentDiv);
      if (c.recommend >= 10) {
        const hot = document.createElement('div');
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

    table.appendChild(colgroup);
    table.appendChild(thead);
    table.appendChild(tbody);
    return table;
  }

  addEvents(onHeaderClick, onContentClick) {
    const thead = this.container.querySelector(
      '.dashboard-table-container > thead'
    );
    thead.addEventListener('click', onHeaderClick);

    const tbody = this.container.querySelector(
      '.dashboard-table-container > tbody'
    );
    tbody.addEventListener('click', onContentClick, { capture: true });
  }

  render() {
    this.container.innerHTML = '';

    const { contents, onHeaderClick, order, onContentClick } = this.props;

    if (!contents) return this.container;
    const headers = {
      id: {
        title: `ID${
          order.headerId === 'id' && order.orderType === 1 ? '▲' : '▼'
        }`,
        order: order.headerId === 'id' ? order.orderType : 1,
        width: '10%',
      },
      content: {
        title: '내용',
        width: '65%',
      },
      category: { title: '카테고리', width: '15%' },
      created: {
        title: `생성날짜${
          order.headerId === 'created' && order.orderType === 1 ? '▲' : '▼'
        }`,
        order: order.headerId === 'created' ? order.orderType : 1,
        width: '20%',
      },
      recommend: {
        title: '추천',
        width: '5%',
      },
    };

    const table = this.makeTable(contents, headers, order);
    this.container.appendChild(table);
    this.addEvents(onHeaderClick, onContentClick);
    return this.container;
  }
}

export default Board;
