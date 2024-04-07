import { Component } from "./core/Component";
import template from "./app.template.hbs";

import "./core/Router";

import "./pages/home/home.component";
import "./pages/not-found/not-found.component";

export class App extends Component {
  constructor() {
    super();
    this.template = template();
    this.state = {};
  }
}

customElements.define("my-app", App);
