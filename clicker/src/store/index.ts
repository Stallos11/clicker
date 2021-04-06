import { createStore } from 'vuex'

export interface State {
  userID: number;
  isLogged: boolean;
  actualMoney: number;
  token: string;
  buildings: object;
}

export const store = createStore<State>({
  state: {
    userID: -1,
    isLogged: false,
    actualMoney: 0,
    token : '',
    buildings : {}
  }
})