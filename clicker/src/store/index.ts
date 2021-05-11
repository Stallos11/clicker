import { createStore } from "vuex";
import axios from "axios";

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
  timeDiff: number;
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
    timeDiff: 0,
  },
  actions: {
    getRankings() {
      axios
        .get("https://projet.vincent-dimarco.fr/api/auth/users", {
          headers: {
            Authorization: "Bearer " + this.state.token,
          },
        })
        .then((response) => {
          this.state.userList = response.data;
          this.state.username = store.state.username;
          this.state.loading = false;
        })
        .catch((error) => {
          console.error("error", error.response);
        });
    },
    getUserRanking({dispatch}) {
      axios
        .get("https://projet.vincent-dimarco.fr/api/auth/user/rank?id=" + store.state.userID, {
          headers: {
            Authorization: "Bearer " + this.state.token,
          },
        })
        .then((response) => {
          console.log(response);
          this.state.currentUserRanking = response.data;
          dispatch('getRankings');
        })
        .catch((error) => {
          console.error("error", error.response);
        });
    },
    setEPS() {
      let builds = JSON.stringify(this.state.buildings);
      builds = JSON.parse(builds);

      this.state.actualEPS +=
        builds["Tepee"] + builds["Hut"] * 10 + builds["House"] * 100 + builds["Villa"] * 1000 + builds["Temple"] * 10000;
    },
    updateRankList({dispatch}) {
      this.state.loading = true;
      axios
        .put(
          "https://projet.vincent-dimarco.fr/api/updateUser",
          {
            id: this.state.userID,
            actualMoney: this.state.actualMoney,
            buildings: this.state.buildings,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + this.state.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          dispatch('getUserRanking');
        })
        .catch((error) => {
          console.error(error.response);
        });
    }
  },
});
