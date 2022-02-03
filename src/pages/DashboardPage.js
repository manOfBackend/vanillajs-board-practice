import { Component, renderComponent } from '../modules/MyReact.js';
import Board from '../components/Board.js';
class DashboardPage extends Component {
  constructor(props) {
    super(props);

    this.container = document.createElement('div');
    this.container.className = 'DashboardPage';
  }

  render() {
    this.container.innerHTML = '';
    const { history } = this.props;
    const { contents } = this.state;
    renderComponent(
      Board,
      {
        contents,
        history,
      },
      this.container
    );

    return this.container;
  }
}

export default DashboardPage;
