import { Component, renderComponent } from '../modules/MyReact.js';
import Board from '../components/Board/Board.js';
import { asyncInitState, asyncHandler } from '../modules/asyncHandler.js';
import { fetchPages } from '../services/pages.js';
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '../utils/localStorage.js';
import Pagination from '../components/pagination/pagination.js';

class DashboardPage extends Component {
  constructor(props) {
    super(props);

    this.container = document.createElement('div');
    this.container.className = 'DashboardPage';
    const { match } = props;
    const recommendInfo = getLocalStorageItem('recommendInfo');

    this.state = {
      contents: asyncInitState,
      order: {
        headerId: '',
        orderType: 1,
      },
      pageNum: match.params.pageNum ? Number(match.params.pageNum) : 1,
      recommendInfo,
    };
    this.initState();
  }

  initState() {
    this.fetch();
  }

  fetch = async () => {
    asyncHandler.setLoading.call(this, 'contents');
    const { isError, data } = await fetchPages();
    if (!isError) {
      asyncHandler.setData.call(this, 'contents', data);
    } else {
      asyncHandler.setError.call(this, 'contents', data);
    }
  };
  changeOrder = (headerId, orderType) => {
    const {
      contents: { data },
    } = this.state;

    const compareData = (f, b) => {
      if (headerId === 'id') {
        if (orderType === 1) {
          return f.id - b.id;
        } else {
          return b.id - f.id;
        }
      } else if (headerId === 'created') {
        const fDate = new Date(f.created_at),
          bDate = new Date(b.created_at);
        if (orderType === 1) {
          return fDate - bDate;
        } else {
          return bDate - fDate;
        }
      }
    };

    if (data) {
      const ordered = [...data].sort(compareData);
      this.setState({
        contents: {
          ...this.state.contents,
          data: ordered,
        },
        order: {
          headerId,
          orderType,
        },
      });
    }
  };

  handleHeaderClick = (e) => {
    const headerId = e.target.dataset.id;

    if (headerId === 'id' || headerId === 'created') {
      const {
        order: { orderType },
      } = this.state;
      this.changeOrder(headerId, orderType * -1);
    }
  };

  handlePageClick = (e) => {
    const { pageNum } = e.target.dataset;
    const { history } = this.props;
    if (pageNum) {
      history.push(`/pages/${pageNum}`);
      this.setState({
        pageNum: Number(pageNum),
      });
    }
  };

  // 추천 기능
  handleContentClick = (e) => {
    const { id } = e.target.closest('tr').dataset;
    const { recommendInfo } = this.state;
    if (id) {
      const _recommendInfo = {
        ...recommendInfo,
        [id]: {
          recommend:
            recommendInfo && recommendInfo[id]
              ? Number(recommendInfo[id].recommend) + 1
              : 1,
        },
      };
      setLocalStorageItem('recommendInfo', _recommendInfo);
      this.setState({
        recommendInfo: _recommendInfo,
      });
    }
  };
  render() {
    this.container.innerHTML = '';
    const { history } = this.props;
    const { contents, order, pageNum, recommendInfo } = this.state;

    if (contents.loading) {
      // render loading component
    }

    if (contents.isError) {
      // render error component
    }

    if (contents.data) {
      const contentsCount = contents.data.length;
      const maxPageNum = Math.ceil(contentsCount / 10);
      const start = (pageNum - 1) * 10;
      const mergedData = contents.data.map((d) => ({
        ...d,
        recommend:
          recommendInfo && recommendInfo[d.id]
            ? recommendInfo[d.id].recommend
            : 0,
      }));
      // 게시판 출력
      renderComponent(
        Board,
        {
          contents: mergedData.slice(start, start + 10),
          maxPageNum,
          history,
          order,
          pageNum,
          onHeaderClick: this.handleHeaderClick,
          onPageClick: this.handlePageClick,
          onContentClick: this.handleContentClick,
        },
        this.container
      );
      // 하단 페이지네이션 컴포넌트 출력
      renderComponent(
        Pagination,
        {
          maxPageNum,
          pageNum,
          onPageClick: this.handlePageClick,
        },
        this.container
      );
    }
    return this.container;
  }
}

export default DashboardPage;
