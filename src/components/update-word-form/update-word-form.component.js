import { Component } from "../../core/Component";
import template from "./update-word-form.template.hbs";

export class UpdateWordForm extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      translate: "",
      infinitive: "",
      inftrans: "",
      pastsimple: "",
      simtrans: "",
      pastparticiple: "",
      parttrans: "",
    };
    this.template = template();
  }
  init() {
    const data = {};
    this.getAttributeNames().forEach((name) => {
      data[name] = this.getAttribute(name);
    });

    this.setState({ ...this.state, ...data });
  }

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {}
}

customElements.define("ui-update-word-form", UpdateWordForm);
