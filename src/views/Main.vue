<template>
  <div class="main">
    <my-button icon="settings" @click="showDialog" class="btn_settings"
      >Show settings</my-button
    >
    <my-dialog v-model:show="dialogVisible">
      <settings-form @add="addLocation" @remove="removeLocation" />
    </my-dialog>

    <weather-list :weathers="weather" />
  </div>
</template>

<script lang="ts">
import { Location, Weather } from '@/store/types'
import { defineComponent } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import SettingsForm from '../components/SettingsForm.vue'
import WeatherList from '@/components/WeatherList.vue'

export default defineComponent({
  name: 'Main',
  components: {
    SettingsForm,
    WeatherList,
  },
  data() {
    return {
      dialogVisible: false,
    }
  },
  computed: {
    ...mapGetters({
      locations: 'GET_LOCATIONS',
      weather: 'GET_WEATHER',
      newLocation: 'GET_NEW_LOCATION',
    }),
  },
  methods: {
    ...mapActions(['GET_WEATHER_FROM_API']),
    showDialog() {
      this.dialogVisible = true
    },
    addLocation(city: string) {
      this.GET_WEATHER_FROM_API(city).then((err) => {
        if (err) alert('City not found')
        else {
          let locations = this.locations
          locations.push({ id: Date.now().toString(), ...this.newLocation })

          this.$store.dispatch('SET_LOCATIONS_IN_LOCAL_STORAGE', locations)
        }
      })
    },
    removeLocation(location: Location) {
      // Remove weather data
      let index = this.weather.findIndex(
        (e: Weather) => e.name == location.city
      )
      this.$store.commit('REMOVE_WEATHER', index)

      // Remove location
      let locations = this.locations.filter(
        (e: Location) => e.id !== location.id
      )
      this.$store.dispatch('SET_LOCATIONS_IN_LOCAL_STORAGE', locations)
    },
  },
  mounted() {
    this.$store.commit('SET_LOCATIONS')
    this.$store.dispatch('CHECK_LOCATION')
  },
})
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.btn_settings {
  margin-bottom: 25px;
}
</style>
