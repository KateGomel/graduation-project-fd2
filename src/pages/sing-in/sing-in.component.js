import { Component } from "../../core/Component";
import template from "./sing-in.template.hbs";
import { ROUTES } from "../../constants/routes";
import { extractFormData } from "../../utils/extractFormData";
import { authService } from "../../services/Auth";
import { TOAST_TYPE } from "../../constants/toast";
import { useToastNotification } from "../../hooks/useToastNotification";
import { useNavigate } from "../../hooks/useNavigate";

export class SingIn extends Component {
  constructor() {
    super();
    this.template = template({
      routes: ROUTES,
    });
    this.state = {
      isLoading: false,
    };
  }

  toggleIsLoading = () => {
    this.setState({
      ...this.state,
      isLoading: !this.state.isLoading,
    });
  };

  singInUser = (evt) => {
    evt.preventDefault();
    const formData = extractFormData(evt.target);
    this.toggleIsLoading();
    authService
      .singIn(formData.email, formData.password)
      .then(() => {
        useToastNotification({ message: "Success!", type: TOAST_TYPE.success });
        useNavigate(ROUTES.dashboard);
      })
      .catch((error) => {
        useToastNotification({ message: error.message });
      })
      .finally(() => {
        this.toggleIsLoading();
      });
  };

  componentDidMount() {
    this.addEventListener("submit", this.singInUser);
  }

  componentWillUnmount() {
    this.removeEventListener("submit", this.singInUser);
  }
}

customElements.define("sing-in-page", SingIn);
