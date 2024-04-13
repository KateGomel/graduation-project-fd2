import { Component } from "../../core/Component";
import template from "./sing-up.template.hbs";
import { ROUTES } from "../../constants/routes";

export class SingUp extends Component {
  constructor() {
    super();
    this.template = template({
      routes: ROUTES,
    });
    this.state = {
      isLoading: false,
    };
  }

  toggleIsLoading = () => {
    this.setState({
      ...this.state,
      isLoading: !this.state.isLoading,
    });
  };

  componentDidMount() {}

  componentWillUnmount() {}
}

customElements.define("sing-up-page", SingUp);
