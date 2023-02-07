<template>
  <form @submit.prevent>
    <p>Settings</p>
    <label>Selected locations</label>
    <location-item
      v-if="locations.length !== 0"
      v-for="location in locations"
      :key="location.id"
      :location="location"
      @click="$emit('remove', location)"
    />
    <div class="empty_list" v-else>You don't have any selected locations</div>
    <label>Add location</label>
    <my-input v-model="city" placeholder="City" @enter="addLocation" />
    <my-button @click="addLocation" icon="plus" class="btn_add">Add</my-button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import { Location } from '@/store/types'
import LocationItem from './LocationItem.ce.vue'

export default defineComponent({
  name: 'SettingsForm',
  components: { LocationItem },
  data() {
    return {
      city: '',
    }
  },
  computed: {
    ...mapGetters({
      locations: 'GET_LOCATIONS',
      weather: 'GET_WEATHER',
    }),
  },
  methods: {
    isUniqueLocation() {
      return (
        this.locations.filter((e: Location) => e.city === this.city).length == 0
      )
    },
    addLocation() {
      if (this.city.length == 0) alert('Enter location')
      else if (this.isUniqueLocation()) {
        // To capital case
        this.city = this.city
          .split(' ')
          .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
          .join(' ')

        this.$emit('add', [this.city])
        this.city = ''
      } else alert('This location has already been added')
    },
  },
})
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  p {
    align-self: center;
    font-family: 'Avenir';
    font-weight: 500;
    font-size: 32px;
    line-height: 44px;
    color: #2c3e50;
    margin: 0;
  }

  label {
    font-family: 'Avenir';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 27px;
    color: #2c3e50;
    margin-top: 25px;
    margin-bottom: 12px;
  }
}
.btn_add {
  margin-top: 12px;
  align-self: center;
}
.empty_list {
  align-self: center;
  font-family: 'Avenir';
  color: #2c3e50;
}
</style>
