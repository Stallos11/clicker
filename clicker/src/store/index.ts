import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface State {
  actualMoney: number;
}

export const store = createStore<State>({
  state: {
    actualMoney: 0
  }
})