import { Component, renderComponent } from './MyReact.js';

class DefaultNotFoundComponent extends Component {
  constructor(props) {
    super(props);
    this.container = document.createElement('div');
  }
  render() {
    this.container.innerHTML = '';

    const message = document.createElement('h3');
    message.innerText =
      '페이지를 찾을 수 없어요. 주소를 정확히 입력했는지 확인 해주세요.';
    this.container.appendChild(message);

    return this.container;
  }
}

class BrowserRouter extends Component {
  constructor(props) {
    super(props);
    this.container = document.createDocumentFragment();
  }

  parseCurrentPath() {
    const { path, routes } = this.props;

    const currentPathTokens = path
      .split('?')[0]
      .split('/')
      .filter((p) => !!p);

    const routePaths = routes.map((r) => r.path);
    let pathKey = '';
    let params = {};
    for (let i = 0; i < routePaths.length; i++) {
      const routePathTokens = routePaths[i].split('/').filter((p) => !!p);

      console.log('routePathTokens', routePathTokens, currentPathTokens);
      let isMatch = true;
      let tempParams = {};
      if (routePathTokens.length !== currentPathTokens.length) {
        isMatch = false;
        continue;
      }

      for (let j = 0; j < currentPathTokens.length; j++) {
        const token = currentPathTokens[j];
        if (
          !routePathTokens[j].startsWith(':') &&
          routePathTokens[j] !== token
        ) {
          isMatch = false;
          break;
        }
        if (routePathTokens[j].startsWith(':')) {
          tempParams[routePathTokens[j].slice(1)] = token;
          isMatch = true;
        }
      }

      if (isMatch) {
        pathKey = routePaths[i];
        params = { ...tempParams };
        break;
      }
    }
    return {
      pathKey,
      params,
    };
  }

  render() {
    this.container.innerHTML = '';

    const { routes, history } = this.props;
    const { pathKey, params } = this.parseCurrentPath();

    const targetRoute = routes.find((route) => route.path === pathKey);

    const route = targetRoute ?? { Component: DefaultNotFoundComponent };
    console.log('target', targetRoute, params);
    const { Component, props } = route;

    renderComponent(
      Component,
      {
        history,
        match: { params },
        ...props,
      },
      this.container
    );

    return this.container;
  }
}

export default BrowserRouter;
