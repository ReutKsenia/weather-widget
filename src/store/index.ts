import { createStore } from 'vuex'
import getters from './getters/getters'
import mutations from './mutations/mutations'
import actions from './actions/actions'
import { State } from './types'

export default createStore<State>({
  state: {
    locations: [],
    weather: [],
    isFetching: false,
    newLocation: null,
  },
  getters,
  mutations,
  actions,
  modules: {},
})
