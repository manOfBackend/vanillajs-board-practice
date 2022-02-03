export class Component {
  constructor(props) {
    this.props = props;
  }
  setState(state) {
    this.state = {
      ...this.state,
      ...state,
    };
    this.render();
  }
}

export const renderComponent = (Component, props, container) => {
  const component = new Component(props);
  const rendered = component.render();
  if (container !== rendered) {
    container.appendChild(rendered);
  }
};
