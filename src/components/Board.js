import { Component } from '../modules/MyReact.js';
import { convertDate } from '../utils/time.js';
import './Board.css';

class Board extends Component {
  constructor(props) {
    super(props);
    this.container = document.createDocumentFragment();

    this.headers = ['ID', '내용', '카테고리', '생성날짜', '추천'];
  }

  render() {
    this.container.innerHTML = '';
    const {
      contents: { data },
    } = this.props;

    if (!data) return this.container;

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
    this.container.appendChild(table);

    return this.container;
  }
}

export default Board;
