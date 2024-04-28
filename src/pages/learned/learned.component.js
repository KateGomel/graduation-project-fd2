import { ROUTES } from "../../constants/routes";
import { Component } from "../../core/Component";
import template from "./learned.template.hbs";

export class Learned extends Component {
  constructor() {
    super();

    this.template = template({
      routes: ROUTES,
    });

    this.state = {
      isLoading: false,
      // user: state.user.uid,
      user: null,
      learned: [],
    };
  }
}

customElements.define("learned-page", Learned);
