import { ROUTES } from "../../constants/routes";
import { Component } from "../../core/Component";
import { apiService } from "../../services/Api";

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

  create() {
    apiService.post("/module", { title: "title" });
  }
  read() {}
  update() {}
  delete() {}

  componentDidMount() {
    this.create();
  }

  componentWillUnmount() {}
}

customElements.define("dashboard-page", Dashboard);
