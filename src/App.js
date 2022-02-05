import BrowserRouter from './modules/BrowserRouter.js';
import { Component, renderComponent } from './modules/MyReact.js';
import DashboardPage from './pages/DashboardPage.js';
import './App.css';
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      path: location.pathname,
    };

    this.container = document.querySelector('.App');
    window.addEventListener('popstate', this.handlePopState);
  }
  push = (path) => {
    history.pushState({ path }, '', path);
  };

  goBack = () => {
    history.back();
  };

  handlePopState = (e) => {
    this.setState({
      path: location.pathname,
    });
  };

  render() {
    this.container.innerHTML = '';

    const { path } = this.state;

    renderComponent(
      BrowserRouter,
      {
        path,
        history: {
          push: this.push,
          goBack: this.goBack,
        },
        routes: [
          {
            path: '/',
            Component: DashboardPage,
          },
          {
            path: '/dashboard',
            Component: DashboardPage,
          },
          {
            path: '/pages/:pageNum',
            Component: DashboardPage,
          },
        ],
      },
      this.container
    );

    return this.container;
  }
}

export default App;
