import { Component } from "../../core/Component";
import template from "./home.template.hbs";
import { ROUTES } from "../../constants/routes";

import "../../components/router-link/router-link.component";

export class HomePage extends Component {
  constructor() {
    super();
    this.template = template({
      routes: ROUTES,
    });
  }
}

customElements.define("home-page", HomePage);
