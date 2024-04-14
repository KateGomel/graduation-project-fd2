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
      user: null,
      board: [],
    };
  }
  onClick() {}

  componentDidMount() {
    this.addEventListener("click", this.onClick);
  }

  componentWillUnmount() {
    this.removeEventListener("click", this.onClick);
  }
}

customElements.define("dashboard-page", Dashboard);
