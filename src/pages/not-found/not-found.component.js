import { ROUTES } from "../../constants/routes";
import { Component } from "../../core/Component";
import template from "./not-found.template.hbs";

export class NotFound extends Component {
  constructor() {
    super();
    this.template = template({
      routes: ROUTES,
    });
  }
}

customElements.define("not-found", NotFound);
