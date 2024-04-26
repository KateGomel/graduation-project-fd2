import { Component } from "../../core/Component";
import template from "./sing-up.template.hbs";
import { ROUTES } from "../../constants/routes";
import { extractFormData } from "../../utils/extractFormData";
import { authService } from "../../services/Auth";
import { useToastNotification } from "../../hooks/useToastNotification";
import { TOAST_TYPE } from "../../constants/toast";
import { useNavigate } from "../../hooks/useNavigate";
import { useUserStore } from "../../hooks/useUserStore";
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
  registerUser = async (evt) => {
    evt.preventDefault();
    const formData = extractFormData(evt.target);
    if (formData.password != formData.repeatPassword) {
      useToastNotification({ message: "Passwords must match" });
      return;
    }
    this.toggleIsLoading();
    const { setUser } = useUserStore();
    try {
      const data = await authService.singUp(formData.email, formData.password);
      const dataWords = await Promise.all(createInitialArray(data.user.uid));
      setUser({ ...data.user });
      useToastNotification({ message: "Success!", type: TOAST_TYPE.success });
      useNavigate(ROUTES.title);
    } catch (error) {
      useToastNotification({ message: error.message });
    } finally {
      this.toggleIsLoading();
    }
  };

  componentDidMount() {
    this.addEventListener("submit", this.registerUser);
  }

  componentWillUnmount() {
    this.removeEventListener("submit", this.registerUser);
  }
}

customElements.define("sing-up-page", SingUp);
