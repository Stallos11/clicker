import { createStore } from "vuex";

export interface State {
  userID: number;
  username: string;
  isLogged: boolean;
  actualMoney: number;
  token: string;
  buildings: object;
  pageName: string;
}

export const store = createStore<State>({
  state: {
    userID: -1,
    username: "",
    isLogged: false,
    actualMoney: 0,
    token: "",
    buildings: {},
    pageName: "",
  },
});
