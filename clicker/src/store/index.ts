import { createStore } from 'vuex'

export interface State {
  isLogged: boolean;
  actualMoney: number;
  token: string;
  buildings: object;
}

export const store = createStore<State>({
  state: {
    isLogged: false,
    actualMoney: 0,
    token : '',
    buildings : {}
  }
})