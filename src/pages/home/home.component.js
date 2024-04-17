import { Component } from "../../core/Component";
import template from "./home.template.hbs";
import { ROUTES } from "../../constants/routes";

import "../../components/router-link/router-link.component";
import { useUserStore } from "../../hooks/useUserStore";

export class HomePage extends Component {
  constructor() {
    super();
    this.template = template();
    this.state = {
      links: [
        {
          label: "Sing In",
          href: ROUTES.signIn,
        },
        {
          label: "Sing Up",
          href: ROUTES.signUp,
        },
      ],
    };
  }

  setLinks = () => {
    const { getUser } = useUserStore();
    const user = getUser();
    if (getUser()) {
      this.setState({
        links: [
          {
            label: "Get started",
            href: ROUTES.dashboard,
          },
        ],
      });
    }
  };

  componentDidMount() {
    this.setLinks();
  }
}

customElements.define("home-page", HomePage);
