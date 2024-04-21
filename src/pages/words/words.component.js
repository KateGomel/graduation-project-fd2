import { ROUTES } from "../../constants/routes";
import { Component } from "../../core/Component";
import template from "./words.template.hbs";

export class Words extends Component {
  constructor() {
    super();
    this.template = template({
      routes: ROUTES,
    });
    this.state = {
      isLoading: false,
    };
  }
}

customElements.define("words-page", Words);
