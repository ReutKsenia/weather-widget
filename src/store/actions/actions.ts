import axios from 'axios'
import { Location } from '../types'

export default {
  SET_LOCATIONS_IN_LOCAL_STORAGE({ commit }: any, locations: Array<Location>) {
    localStorage.setItem('locations', JSON.stringify(locations))
    commit('SET_LOCATIONS')
  },

  async GET_WEATHER_FROM_API({ commit }: any, city: string) {
    const res = await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},&units=metric&appid=${process.env.VUE_APP_WEATHER_API_KEY}`
      )
      .then((response) => {
        commit('ADD_WEATHER', response.data)
        commit('SET_NEW_LOCATION', {
          city: response.data?.name,
          country: response.data?.sys?.country,
        })
      })
      .catch((error) => {
        return error
      })
    return res
  },

  async GET_USER_LOCATION() {
    try {
      let response = await axios.get(
        `https://ipinfo.io/json?token=${process.env.VUE_APP_IPINFO_TOKEN}`
      )
      return response.data
    } catch (error) {
      console.log(error)
    }
  },

  async GET_ALL_WEATHER({ state, dispatch }: any) {
    for (let i = 0; i < state.locations.length; i++) {
      await dispatch('GET_WEATHER_FROM_API', state.locations[i].city)
    }
  },

  async CHECK_LOCATION({ dispatch }: any) {
    // No locations in local storage
    if (!JSON.parse(localStorage.getItem('locations')!)) {
      // Fetch user location
      await dispatch('GET_USER_LOCATION').then((userLocation: any) => {
        let locations = [
          {
            id: Date.now().toString(),
            city: userLocation.city,
            country: userLocation.country,
          },
        ]
        dispatch('SET_LOCATIONS_IN_LOCAL_STORAGE', locations)
      })
    }

    // Load weather after checking locations
    dispatch('GET_ALL_WEATHER')
  },
}
