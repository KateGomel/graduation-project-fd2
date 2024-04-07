import { Component } from "../../core/Component";
import template from "./home.template.hbs";

export class HomePage extends Component {
  constructor() {
    super();
    this.template = template();
  }
}

customElements.define("home-page", HomePage);
