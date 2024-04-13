import { ROUTES } from "../../constants/routes";
import { Component } from "../../core/Component";
import template from "./admin-panel.template.hbs";

export class AdminPanel extends Component {
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

customElements.define("admin-panel-page", AdminPanel);
