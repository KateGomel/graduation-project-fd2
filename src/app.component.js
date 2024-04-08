import { Component } from "./core/Component";
import template from "./app.template.hbs";
import { ROUTES } from "./constants/routes";

import "./core/Router";

import "./pages/home/home.component";
import "./pages/not-found/not-found.component";
import "./pages/sing-in/sing-in.component";
import "./pages/sing-up/sing-up.component";

export class App extends Component {
  constructor() {
    super();
    this.template = template({
      routes: ROUTES,
    });
    this.state = {};
  }
}

customElements.define("my-app", App);
