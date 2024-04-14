import { Component } from "../../core/Component";
import template from './board.template.hbs';

export class BoardPage extends Component {
    constructor() {
        super();
        this.template = template();
    }
}

customElements.define('board-page', BoardPage)