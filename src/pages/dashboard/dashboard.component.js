import { ROUTES } from "../../constants/routes";
import { Component } from "../../core/Component";
import template from "./dashboard.template.hbs";

export class Dashboard extends Component {
  constructor() {
    super();
    this.template = template({
      routes: ROUTES,
    });
  }
}

customElements.define("dashboard-page", Dashboard);
