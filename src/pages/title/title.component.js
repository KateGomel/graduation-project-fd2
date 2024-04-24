import template from "./title.template.hbs";
import { ROUTES } from "../../constants/routes";
import { Component } from "../../core/Component";
import { useUserStore } from "../../hooks/useUserStore";
import { authService } from "../../services/Auth";
import { useToastNotification } from "../../hooks/useToastNotification";
import { TOAST_TYPE } from "../../constants/toast";
import { useNavigate } from "../../hooks/useNavigate";
import { useModal } from "../../hooks/useModal";
import {
  createWordApi,
  getWordApi,
  deleteWordApi,
  updateWordApi,
} from "../../api/words";
import { extractFormData } from "../../utils/extractFormData";
import { mapResponseApiData } from "../../utils/api";

export class Title extends Component {
  constructor() {
    super();

    this.template = template({
      routes: ROUTES,
    });
    this.state = {
      isLoading: false,
      user: null,
      words: [],
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
      getWordApi(this.state.user.uid)
        .then(({ data }) => {
          this.setState({
            ...this.state,
            words: data ? mapResponseApiData(data) : [],
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

  openUpdateWordModal(id) {
    useModal({
      isOpen: true,
      template: "ui-update-word-form",
      onSuccess: (modal) => {
        const form = modal.querySelector(".update-word-form");
        const formData = extractFormData(form);
        updateWordApi(this.state.user.uid, id, formData)
          .then(({}) => {
            useNavigate(`${ROUTES.title}`);
            useToastNotification({
              message: "Success!",
              type: TOAST_TYPE.success,
            });
          })
          .catch(({ message }) => {
            useToastNotification({ message });
          })
          .finally(() => {
            this.toggleIsLoading();
          });
      },
    });
  }

  openCreateWordModal() {
    useModal({
      isOpen: true,
      template: "ui-create-word-form",
      onSuccess: (modal) => {
        const form = modal.querySelector(".create-word-form");
        const formData = extractFormData(form);
        this.toggleIsLoading();
        createWordApi(this.state.user.uid, { ...formData, group: 8 })
          .then(({}) => {
            useNavigate(`${ROUTES.title}`);
            useToastNotification({
              message: "Success!",
              type: TOAST_TYPE.success,
            });
          })
          .catch(({ message }) => {
            useToastNotification({ message });
          })
          .finally(() => {
            this.toggleIsLoading();
          });
      },
    });
  }

  onClick = ({ target }) => {
    const logOut = target.closest(".logout-btn");
    const deleteWordBtn = target.closest(".delete-word-btn");
    const updateWordBtn = target.closest(".update-word-btn");
    const createWordBtn = target.closest(".create-word-btn");

    if (logOut) {
      return this.logout();
    }
    if (deleteWordBtn) {
      console.log(target.dataset.id);
      return console.log(2);
    }
    if (updateWordBtn) {
      // return this.openUpdateWordModal();
      console.log(updateWordBtn.dataset.id);
    }
    if (createWordBtn) {
      return this.openCreateWordModal();
    }
  };

  setUser() {
    const { getUser } = useUserStore();
    this.setState({
      ...this.state,
      user: getUser(),
    });
  }

  componentDidMount() {
    this.setUser();
    this.loadAllWords();
    this.addEventListener("click", this.onClick);
  }

  componentWillUnmount() {
    this.removeEventListener("click", this.onClick);
  }
}

customElements.define("title-page", Title);
