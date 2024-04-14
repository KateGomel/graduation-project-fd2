import { ROUTES } from "../../constants/routes";
import { Component } from "../../core/Component";
import template from "./board.template.hbs";

export class BoardPage extends Component {
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

customElements.define("board-page", BoardPage);
