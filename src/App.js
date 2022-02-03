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
  }

  render() {
    this.container.innerHTML = '';

    const { path } = this.state;

    renderComponent(
      BrowserRouter,
      {
        path,
        routes: [
          {
            path: '/',
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
