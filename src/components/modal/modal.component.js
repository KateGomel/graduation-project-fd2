import { Component } from "../../core/Component";
import template from "./modal.template.hbs";
import { EVENT_TYPES } from "../../constants/eventTypes";
import { eventEmitter } from "../../core/EventEmitter";
import { INITIAL_STATE } from "./constants";

export class Modal extends Component {
  constructor() {
    super();

    this.template = template();
    this.state = INITIAL_STATE;
  }

  appendTemplate = (template, data) => {
    const tmp = document.createElement(template);
    if (data) {
      Object.keys(data).forEach((key) => {
        tmp.setAttribute(key, data[key]);
      });
    }
    this.querySelector(".modal-body").append(tmp);
  };

  modalHandler = ({ detail }) => {
    this.setState({
      ...this.state,
      ...detail,
    });

    if (detail.template) {
      this.appendTemplate(detail.template, detail.data);
    }
  };

  closeModal = () => {
    this.setState(INITIAL_STATE);
  };

  onSuccess = () => {
    this.state.onSuccess(this);
    this.closeModal();
  };

  onClick = (evt) => {
    if (evt.target.closest(".modal-reject-trigger")) {
      this.closeModal();
    }
    if (evt.target.closest(".modal-success-trigger")) {
      this.onSuccess();
    }
  };

  componentDidMount() {
    eventEmitter.on(EVENT_TYPES.modal, this.modalHandler);
    this.addEventListener("click", this.onClick);
  }

  componentWillUnmount() {
    eventEmitter.off(EVENT_TYPES.modal, this.modalHandler);
    this.removeEventListener("click", this.onClick);
  }
}

customElements.define("ui-modal", Modal);
