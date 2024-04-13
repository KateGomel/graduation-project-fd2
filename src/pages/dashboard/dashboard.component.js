import { ROUTES } from "../../constants/routes";
import { Component } from "../../core/Component";
import template from "./dashboard.template.hbs";

export class Dashboard extends Component {
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

customElements.define("dashboard-page", Dashboard);
