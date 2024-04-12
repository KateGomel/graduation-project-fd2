import { Component } from "../../core/Component";
import template from "./dashboard.template.hbs";

export class Dashboard extends Component {
  constructor() {
    super();

    this.template = template();

    this.state = {};
  }
}

customElements.define("dashboard-page", Dashboard);
