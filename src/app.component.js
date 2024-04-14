import { Component } from "./core/Component";
import template from "./app.template.hbs";
import { ROUTES } from "./constants/routes";

import "./core/Router";

import "./pages/home/home.component";
import "./pages/not-found/not-found.component";
import "./pages/sing-in/sing-in.component";
import "./pages/sing-up/sing-up.component";
import "./pages/dashboard/dashboard.component";
import "./pages/admin-panel/admin-panel.component";
import "./pages/board/board.component";

import "./components/input/input.component";
import "./components/button/button.component";
import "./components/loader/loader.component";
import "./components/toast/toast.component";

import { authService } from "./services/Auth";
import { useToastNotification } from "./hooks/useToastNotification";
import { useUserStore } from "./hooks/useUserStore";

export class App extends Component {
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

  initializeApp() {
    this.toggleIsLoading();
    const { setUser } = useUserStore();
    authService
      .authorizeUser()
      .then((user) => {
        setUser(user.uid ? user : null);
      })
      .catch((error) => {
        useToastNotification({ message: error.message });
      })
      .finally(() => {
        this.toggleIsLoading();
      });
  }

  componentDidMount() {
    this.initializeApp();
  }
}

customElements.define("my-app", App);
