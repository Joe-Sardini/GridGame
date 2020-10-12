import Vuex from 'vuex'

const createStore = () => {
  const store = new Vuex.Store({
    state: () => ({
      Player_1: {
        Player_1_Selected_Squares: [],
        Cash: 10000,
        Selections: 5,
        Score: 0,
        TotalWinnings: 0,
        RunsCompleted: 0,
      },
    }),
    mutations: {
      SET_SQUARE(state, id) {
        state.Player_1.Player_1_Selected_Squares.push(id)
      },
      RESET_PLAYER(state) {
        state.Player_1.Player_1_Selected_Squares.length = 0
        state.Player_1.Selections = 5
        state.Player_1.Cash = 10000
        state.Player_1.TotalWinnings = 0
        state.Player_1.RunsCompleted = 0
      },
      RESET_SELECTIONS(state) {
        state.Player_1.Selections = 5
        state.Player_1.Player_1_Selected_Squares.length = 0
      },
      DECREMENT_SELECTION(state) {
        state.Player_1.Selections--
      },
      WITHDRAW_FUNDS(state, amount) {
        state.Player_1.Cash -= amount
      },
      ADD_FUNDS(state, amount) {
        state.Player_1.Cash += amount
        state.Player_1.TotalWinnings += amount
      },
      INCREMENT_RUN_COUNTER(state) {
        state.Player_1.RunsCompleted++
      },
    },
    getters: {},
    actions: {
      addSquare({ commit }, id) {
        commit('SET_SQUARE', id)
      },
      resetPlayer({ commit }) {
        commit('RESET_PLAYER')
      },
      resetSelections({ commit }) {
        commit('RESET_SELECTIONS')
      },
      decrementSelection({ commit }) {
        commit('DECREMENT_SELECTION')
      },
      withdrawFunds({ commit }, amount) {
        commit('WITHDRAW_FUNDS', amount)
      },
      addFunds({ commit }, amount) {
        commit('ADD_FUNDS', amount)
      },
      IncrementRunsCounter({ commit }) {
        commit('INCREMENT_RUN_COUNTER')
      },
    },
  })
  return store
}

export default createStore
