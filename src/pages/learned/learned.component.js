import { getLearnedApi } from "../../api/words";
import { ROUTES } from "../../constants/routes";
import { TOAST_TYPE } from "../../constants/toast";
import { Component } from "../../core/Component";
import { useNavigate } from "../../hooks/useNavigate";
import { useToastNotification } from "../../hooks/useToastNotification";
import { useUserStore } from "../../hooks/useUserStore";
import { authService } from "../../services/Auth";
import template from "./learned.template.hbs";

export class Learned extends Component {
  constructor() {
    super();

    this.template = template({
      routes: ROUTES,
    });

    this.state = {
      isLoading: false,
      learned: [],
      user: null,
    };
  }

  toggleIsLoading = () => {
    this.setState({
      ...this.state,
      isLoading: !this.state.isLoading,
    });
  };

  logout = () => {
    this.toggleIsLoading();
    const { setUser } = useUserStore();
    authService
      .logOut()
      .then(() => {
        setUser(null);
        useToastNotification({ type: TOAST_TYPE.success, message: "Success!" });
        useNavigate(ROUTES.home);
      })
      .catch(({ message }) => {
        useToastNotification({ message });
      })
      .finally(() => {
        this.toggleIsLoading();
      });
  };

  loadAllWords = () => {
    if (this.state.user?.uid) {
      this.toggleIsLoading();
      getLearnedApi(this.state.user.uid)
        .then(({ data }) => {
          this.setState({
            ...this.state,
            learned: mapResponseApiData(data),
          });
        })
        .catch(({ message }) => {
          useToastNotification({ message });
        })
        .finally(() => {
          this.toggleIsLoading();
        });
    }
  };

  toUnlearnedWords() {
    useNavigate(ROUTES.title);
  }

  onClick({ target }) {
    const logOut = target.closest(".logout-btn");
    const uncheckedWordBtn = target.closest(".unchecked-word-btn");

    if (logOut) {
      return this.logout();
    }

    if (uncheckedWordBtn) {
      return this.toUnlearnedWords();
    }
  }

  setUser() {
    const { getUser } = useUserStore();
    this.setState({
      ...this.state,
      user: getUser(),
    });
  }

  componentDidMount() {
    this.setUser();
    this.addEventListener("click", this.onClick);
  }

  componentWillUnmount() {
    this.removeEventListener("click", this.onClick);
  }
}

customElements.define("learned-page", Learned);
