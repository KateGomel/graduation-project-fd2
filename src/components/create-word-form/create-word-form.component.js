import { Component } from "../../core/Component";
import template from "./create-word-form.template.hbs";

export class CreateWordForm extends Component {
  constructor() {
    super();

    this.state = {};
    this.template = template();
  }

  componentDidMount() {}

  componentWillUnmount() {}
}

customElements.define("ui-create-word-form", CreateWordForm);
