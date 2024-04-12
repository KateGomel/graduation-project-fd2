import { Component } from "../../core/Component";
import template from "./sing-in.template.hbs";
import { ROUTES } from "../../constants/routes";

export class SingIn extends Component {
  constructor() {
    super();
    this.template = template({
      routes: ROUTES,
    });
    this.state = {
      isLoading: false,
    };
  }
}

customElements.define("sing-in-page", SingIn);
