import template from "./dashboard.template.hbs";
import { ROUTES } from "../../constants/routes";
import { Component } from "../../core/Component";
import { apiService } from "../../services/Api";

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

  componentDidMount() {}

  componentWillUnmount() {}
}

customElements.define("dashboard-page", Dashboard);
