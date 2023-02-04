<template>
  <div class="home">
    <input v-model="city" placeholder="city" />
    <button @click="addLocation">Get</button>
    <div>{{ locations }}</div>
    <h4>{{ weather }}</h4>
    <img :src="require(`../assets/img/Snow.svg`)" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import { Location } from '../store/types'

export default defineComponent({
  name: 'HomeView',
  data: () => ({
    location: null,
    city: '',
  }),
  computed: {
    ...mapGetters({
      locations: 'GET_LOCATIONS',
      weather: 'GET_WEATHER',
    }),
  },
  methods: {
    uniquenessValidation(locations: Array<Location>, new_location: Location) {
      return locations.filter((e) => e.city === new_location.city).length == 0
    },
    addLocation() {
      let new_location: Location = {
        id: new Date().toDateString(),
        city: this.city,
        country: '',
      }
      // New location is unique
      if (this.uniquenessValidation(this.locations, new_location)) {
        let locations = this.locations
        locations.push(new_location)
        console.log(locations)

        this.$store.dispatch('SET_LOCATIONS_IN_LOCAL_STORAGE', locations)
        this.$store.dispatch('GET_WEATHER_FROM_API', this.city)
      } else {
        alert('This location has already been added.')
      }
    },
  },
  mounted() {
    this.$store.commit('SET_LOCATIONS')
    this.$store.dispatch('CHECK_LOCATION')
  },
})
</script>
