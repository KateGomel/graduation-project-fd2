import { Component } from "../../core/Component";
import template from "./sing-up.template.hbs";
import { ROUTES } from "../../constants/routes";
import { extractFormData } from "../../utils/extractFormData";
import { authService } from "../../services/Auth";
import { useToastNotification } from "../../hooks/useToastNotification";
import { TOAST_TYPE } from "../../constants/toast";
import { useNavigate } from "../../hooks/useNavigate";

export class SingUp extends Component {
  constructor() {
    super();
    this.template = template({
      routes: ROUTES,
    });
    this.state = {
      // errors: {
      //   password: ,
      //   repeatPassword: ,
      // },
      isLoading: false,
    };
  }

  toggleIsLoading = () => {
    this.setState({
      ...this.state,
      isLoading: !this.state.isLoading,
    });
  };

  registerUser = (evt) => {
    evt.preventDefault();
    const formData = extractFormData(evt.target);
    if (formData.password != formData.repeatPassword) {
      useToastNotification({ message: "Пароли должны совпадать" });
      return;
    }
    this.toggleIsLoading();
    authService
      .singUp(formData.email, formData.password)
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
    this.addEventListener("submit", this.registerUser);
  }

  componentWillUnmount() {
    this.removeEventListener("submit", this.registerUser);
  }
}

customElements.define("sing-up-page", SingUp);
