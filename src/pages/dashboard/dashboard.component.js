import template from "./dashboard.template.hbs";
import { ROUTES } from "../../constants/routes";
import { Component } from "../../core/Component";
import { useUserStore } from "../../hooks/useUserStore";
import { authService } from "../../services/Auth";
import { useToastNotification } from "../../hooks/useToastNotification";
import { TOAST_TYPE } from "../../constants/toast";
import { useNavigate } from "../../hooks/useNavigate";
import { WORDS } from "../../constants/words";
import { apiService } from "../../services/Api";

export class Dashboard extends Component {
  constructor() {
    super();

    this.template = template({
      routes: ROUTES,
    });
    this.state = {
      isLoading: false,
      user: null,
      board: [],
    };
  }

  toggleIsLoading = () => {
    this.setState({
      ...this.state,
      isLoading: !this.state.isLoading,
    });
  };

  createdArrayWords() {
    WORDS.forEach((item) => {
      apiService.post("/words", item);
    });
  }

  logout = () => {
    this.toggleIsLoading();
    const { setUser } = useUserStore();
    authService
      .logOut()
      .then(() => {
        setUser(null);
        useToastNotification({ type: TOAST_TYPE.success, message: "Success!" });
        useNavigate(ROUTES.signIn);
      })
      .catch(({ message }) => {
        useToastNotification({ message });
      })
      .finally(() => {
        this.toggleIsLoading();
      });
  };

  onClick = ({ target }) => {
    if (target.closest(".logout-btn")) {
      this.logout();
    }
    if (target.closest(".btn")) {
      this.createdArrayWords();
    }
  };

  setUser() {
    const { getUser } = useUserStore();
    this.setState({
      ...this.state,
      user: getUser(),
    });
  }

  //  const { getUser } = useUserStore();
  //   const user = getUser();
  //   if (getUser()) {
  //     if (user.email == "admin@email.by") {}}

  componentDidMount() {
    this.setUser();
    this.addEventListener("click", this.onClick);
  }

  componentWillUnmount() {
    this.removeEventListener("click", this.onClick);
  }
}

customElements.define("dashboard-page", Dashboard);
