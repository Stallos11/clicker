import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface State {
  actualMoney: number;
  token: string;
  buildings: object;
}

export const store = createStore<State>({
  state: {
    actualMoney: 0,
    token : '',
    buildings : {}
  }
})