import { Component } from "../../core/Component";
import template from "./update-word-form.template.hbs";

export class UpdateWordForm extends Component {
  constructor() {
    super();

    this.state = {};
    this.template = template();
  }

  componentDidMount() {}

  componentWillUnmount() {}
}

customElements.define("ui-update-word-form", UpdateWordForm);
