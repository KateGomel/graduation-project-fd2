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
            words: mapResponseApiData(data),
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

  openDeleteWordModal({ id, translate }) {
    useModal({
      isOpen: true,
      title: "Update Word",
      successCaption: "Delete",
      confirmation: `Do you really want to delete "${translate}"?`,
      onSuccess: () => {
        this.toggleIsLoading();
        deleteWordApi(this.state.user.uid, id)
          .then(() => {
            this.loadAllWords();
            useToastNotification({
              message: "Success!",
              type: TOAST_TYPE.success,
            });
            useNavigate(ROUTES.title);
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

  openUpdateWordModal(data) {
    useModal({
      isOpen: true,
      template: "ui-update-word-form",
      title: "Update Word",
      successCaption: "Update",
      data,
      onSuccess: (modal) => {
        const form = modal.querySelector(".update-word-form");
        const formData = extractFormData(form);
        updateWordApi(this.state.user.uid, data.id, formData)
          .then(({}) => {
            useToastNotification({
              message: "Success!",
              type: TOAST_TYPE.success,
            });
            useNavigate(ROUTES.title);
            this.loadAllWords();
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
      title: "Create Word",
      successCaption: "Create",
      onSuccess: (modal) => {
        const form = modal.querySelector(".create-word-form");
        const formData = extractFormData(form);
        this.toggleIsLoading();
        createWordApi(this.state.user.uid, { ...formData, group: 8 })
          .then(({}) => {
            useToastNotification({
              message: "Success!",
              type: TOAST_TYPE.success,
            });
            useNavigate(ROUTES.title);
            this.loadAllWords();
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

  toCheckedWords() {
    useNavigate(ROUTES.title);
  }

  onClick = ({ target }) => {
    const logOut = target.closest(".logout-btn");
    const deleteWordBtn = target.closest(".delete-word-btn");
    const updateWordBtn = target.closest(".update-word-btn");
    const createWordBtn = target.closest(".create-word-btn");
    const checkedWordsTable = target.closest(".checked-word-btn");

    if (logOut) {
      return this.logout();
    }

    if (deleteWordBtn) {
      return this.openDeleteWordModal({
        id: deleteWordBtn.dataset.id,
        translate: deleteWordBtn.dataset.translate,
      });
    }

    if (updateWordBtn) {
      return this.openUpdateWordModal(updateWordBtn.dataset);
    }

    if (createWordBtn) {
      return this.openCreateWordModal();
    }
    if (checkedWordsTable) {
      return this.toCheckedWords();
    }
  };

  onCheckedWords(id) {
    getWordApi(this.state.user.uid).then(() => {
      const { words } = this.state;
      console.log(words, id);
    });
    // .catch(({ message }) => {
    //   useToastNotification({ message });
    // })
    // .finally(() => {
    //   this.toggleIsLoading();
    // });
  }

  onSortWords(groupWord, checkedRadioBtn) {
    this.loadAllWords();
    getWordApi(this.state.user.uid)
      .then(() => {
        let { words } = this.state;
        if (groupWord != 0) {
          words = words.filter((item) => {
            if (item.group == groupWord) {
              return item;
            }
          });
        } else {
          words = words.filter((item) => {
            return item != groupWord;
          });
        }
        this.setState({
          ...this.state,
          words: words,
        });
        console.log(checkedRadioBtn);
        console.log(this.state);
      })
      .catch(({ message }) => {
        useToastNotification({ message });
      })
      .finally(() => {
        console.log(checkedRadioBtn);
      });
  }

  onChecked({ target }) {
    const checkedWordBtn = target.closest(".checked");
    const checkedRadioBtn = target.closest(".radio-input");

    if (checkedWordBtn) {
      // console.log(checkedWordBtn.checked, checkedWordBtn.dataset.id);
      return this.onCheckedWords(checkedWordBtn.dataset.id);
    }
    if (checkedRadioBtn) {
      const groupWord = checkedRadioBtn.value;
      // checkedRadioBtn.setAttribute("checked", "");
      // const checkedGroup = checkedRadioBtn.checked;
      // console.log(checkedRadioBtn, groupWord, checkedGroup);
      return this.onSortWords(groupWord, checkedRadioBtn);
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
    this.loadAllWords();
    this.addEventListener("click", this.onClick);
    this.addEventListener("change", this.onChecked);
  }

  componentWillUnmount() {
    this.removeEventListener("click", this.onClick);
    this.addEventListener("change", this.onChecked);
  }
}

customElements.define("title-page", Title);
