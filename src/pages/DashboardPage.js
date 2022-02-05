import { Component, renderComponent } from '../modules/MyReact.js';
import Board from '../components/Board.js';
import { asyncInitState, asyncHandler } from '../modules/asyncHandler.js';
import { fetchPages } from '../services/pages.js';

class DashboardPage extends Component {
  constructor(props) {
    super(props);

    this.container = document.createElement('div');
    this.container.className = 'DashboardPage';
    const { match } = props;
    this.state = {
      contents: asyncInitState,
      order: {
        headerId: '',
        orderType: 1,
      },
      pageNum: match.params.pageNum ? Number(match.params.pageNum) : 1,
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
      console.log('change order', orderType, ordered);
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
  render() {
    this.container.innerHTML = '';
    const { history } = this.props;
    const { contents, order, pageNum } = this.state;

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
      renderComponent(
        Board,
        {
          contents: contents.data.slice(start, start + 10),
          maxPageNum,
          history,
          order,
          pageNum,
          onHeaderClick: this.handleHeaderClick,
          onPageClick: this.handlePageClick,
        },
        this.container
      );
    }
    return this.container;
  }
}

export default DashboardPage;
