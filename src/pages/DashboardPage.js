import { Component, renderComponent } from '../modules/MyReact.js';
import Board from '../components/Board.js';
import { asyncInitState, asyncHandler } from '../modules/asyncHandler.js';
import { fetchPages } from '../services/pages.js';

class DashboardPage extends Component {
  constructor(props) {
    super(props);

    this.container = document.createElement('div');
    this.container.className = 'DashboardPage';
    this.state = {
      contents: asyncInitState,
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

  render() {
    this.container.innerHTML = '';
    const { history, match } = this.props;
    const { contents } = this.state;
    const pageNum = match.params.pageNum ? Number(match.params.pageNum) : 1;

    if (contents.loading) {
      // render loading component
    }

    if (contents.isError) {
      // return error component
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
          pageNum: pageNum,
          onPageClick: this.handlePageClick,
        },
        this.container
      );
    }
    // this.addEvents();
    return this.container;
  }
}

export default DashboardPage;
