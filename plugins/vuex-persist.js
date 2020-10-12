import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      key: 'vuex-maze',
      storage: window.localStorage,
    }).plugin(store)
  })
}
