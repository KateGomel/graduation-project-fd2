import template from "./dashboard.template.hbs";
import { ROUTES } from "../../constants/routes";
import { Component } from "../../core/Component";
import { apiService } from "../../services/Api";
import { useUserStore } from "../../hooks/useUserStore";

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

  setUser() {
    const { getUser } = useUserStore();
    this.setState({
      ...this.state,
      user: getUser(),
    });
  }

  componentDidMount() {
    this.setUser();
    this.addEventListener("click", this.onClick);
  }

  componentWillUnmount() {
    this.removeEventListener("click", this.onClick);
  }
}

customElements.define("dashboard-page", Dashboard);
