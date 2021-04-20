import { createStore } from "vuex";
import axios from "axios";
import { isProxy, proxyRefs } from "@vue/reactivity";

export interface State {
  userList: any;
  currentUserRanking: number;
  loading: boolean;
  userID: number;
  username: string;
  isLogged: boolean;
  actualMoney: number;
  actualEPS: number;
  token: string;
  buildings: object;
  pageName: string;
}

export const store = createStore<State>({
  state: {
    userList: {},
    currentUserRanking: -1,
    loading: false,
    userID: -1,
    username: "",
    isLogged: false,
    actualMoney: 0,
    actualEPS: 0,
    token: "",
    buildings: {},
    pageName: "Login",
  },
  actions: {
    getRankings() {
      this.state.loading = true;
      axios
        .get("https://clicker.vincent-dimarco.fr/api/auth/users", {
          headers: {
            Authorization: "Bearer " + this.state.token,
        }})
        .then((response) => {
          console.log(response);
          this.state.userList = response.data;
          this.state.username = store.state.username;
          this.state.loading = false;
        })
        .catch((error) => {
          console.log("error", error.response);
        });
    },
    getUserRanking() {
      this.state.loading = true;
      axios
        .get("https://clicker.vincent-dimarco.fr/api/auth/user/rank?id=" + store.state.userID, {
          headers: {
            Authorization: "Bearer " + this.state.token,
        }})
        .then((response) => {
          console.log(response);
          this.state.currentUserRanking = response.data;
          this.state.loading = false;
        })
        .catch((error) => {
          console.log("error", error.response);
        });
    }
  }
});
