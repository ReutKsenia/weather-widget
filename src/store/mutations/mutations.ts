import { State, Location } from '../types'

export default {
  SET_LOCATIONS(state: State) {
    let locations = JSON.parse(localStorage.getItem('locations')!)
    if (locations) state.locations = locations
  },
  ADD_WEATHER(state: State, data: any) {
    state.weather.push(data)
  },
  REMOVE_WEATHER(state: State, index: number) {
    state.weather.splice(index, 1)
  },
  SET_IS_FETCHING(state: State, value: boolean) {
    state.isFetching = value
  },
  SET_NEW_LOCATION(state: State, location: Omit<Location, 'id'>) {
    state.newLocation = location
  },
}
