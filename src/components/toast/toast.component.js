import template from "./toast.template.hbs";
import { Component } from "../../core/Component";

export class Toast extends Component {
  constructor() {
    super();
    this.template = template();
  }
}

customElements.define("ui-toast", Toast);
