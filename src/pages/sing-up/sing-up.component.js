import { Component } from "../../core/Component";
import template from "./sing-up.template.hbs";

export class SingUp extends Component {
  constructor() {
    super();
    this.template = template();
  }
}

customElements.define("sing-up-page", SingUp);
