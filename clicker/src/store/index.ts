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
        .get("https://projet.vincent-dimarco.fr/api/auth/users", {
          headers: {
            Authorization: "Bearer " + this.state.token,
          },
        })
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
        })
        .catch((error) => {
          console.log(error.response);
        });

      axios
        .get("https://projet.vincent-dimarco.fr/api/auth/user/rank?id=" + store.state.userID, {
          headers: {
            Authorization: "Bearer " + this.state.token,
          },
        })
        .then((response) => {
          console.log(response);
          this.state.currentUserRanking = response.data;
          this.state.loading = false;
        })
        .catch((error) => {
          console.log("error", error.response);
        });
    },
    setEPS() {
      console.log("Builds 1", this.state.buildings);
      let builds = JSON.stringify(this.state.buildings);
      console.log("Builds 2", builds);
      builds = JSON.parse(builds);
      console.log("Builds 3", builds);

      this.state.actualEPS +=
        builds["Tipi"] + builds["Cabane"] * 10 + builds["Maison"] * 100 + builds["Villa"] * 1000 + builds["Temple"] * 10000;

      console.log("EPSSS", this.state.actualEPS);
    },
  },
});
