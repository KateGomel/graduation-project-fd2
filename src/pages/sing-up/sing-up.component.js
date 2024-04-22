import { Component } from "../../core/Component";
import template from "./sing-up.template.hbs";
import { ROUTES } from "../../constants/routes";
import { extractFormData } from "../../utils/extractFormData";
import { authService } from "../../services/Auth";
import { useToastNotification } from "../../hooks/useToastNotification";
import { TOAST_TYPE } from "../../constants/toast";
import { useNavigate } from "../../hooks/useNavigate";
import { useUserStore } from "../../hooks/useUserStore";
// import { WORDS } from "../../constants/initialArray";
// import { API_URLS } from "../../constants/api-urls";
// import { apiService } from "../../services/Api";
import { createInitialArray } from "../../api/words";

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
    const { setUser } = useUserStore();
    authService
      .singUp(formData.email, formData.password)
      .then((data) => {
        setUser({ ...data.user });
        createInitialArray();
        useToastNotification({ message: "Success!", type: TOAST_TYPE.success });
        useNavigate(ROUTES.title);
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
