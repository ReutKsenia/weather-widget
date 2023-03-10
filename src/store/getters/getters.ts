import { State } from '../types'

export default {
  GET_LOCATIONS(state: State) {
    return state.locations
  },
  GET_WEATHER(state: State) {
    return state.weather
  },
  GET_NEW_LOCATION(state: State) {
    return state.newLocation
  },
}
