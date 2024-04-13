import { Component } from "../../core/Component";
import template from "./sing-up.template.hbs";
import { ROUTES } from "../../constants/routes";
import { eventEmitter } from "../../core/EventEmitter";
import { EVENT_TYPES } from "../../constants/eventTypes";
import { TOAST_TYPE } from "../../constants/toast";

export class SingUp extends Component {
  constructor() {
    super();
    this.template = template({
      routes: ROUTES,
    });
    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    eventEmitter.emit(EVENT_TYPES.toastNotification, {
      type: TOAST_TYPE.info,
      message: "Hi",
    });
  }
}

customElements.define("sing-up-page", SingUp);
