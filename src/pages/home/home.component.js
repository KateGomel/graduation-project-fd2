import { Component } from "../../core/Component";
import template from "./home.template.hbs";
import { ROUTES } from "../../constants/routes";

import "../../components/router-link/router-link.component";
import { useUserStore } from "../../hooks/useUserStore";

export class HomePage extends Component {
  constructor() {
    super();
    this.template = template({ routes: ROUTES });
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
      if (user.email == "admin@email.by") {
        this.setState({
          links: [
            {
              label: "Dashboard",
              href: ROUTES.dashboard,
            },
            {
              label: "AdminPanel",
              href: ROUTES.adminPanel,
            },
          ],
        });
      } else {
        this.setState({
          links: [
            {
              label: "Dashboard",
              href: ROUTES.dashboard,
            },
          ],
        });
      }
    }
  };

  componentDidMount() {
    this.setLinks();
  }
}

customElements.define("home-page", HomePage);
