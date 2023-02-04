<template>
  <ul>
    <weather-item
      v-for="weather in weathers"
      :key="weather.id"
      :weather="weather"
    />
  </ul>
</template>

<script lang="ts">
import { Weather } from '@/store/types'
import { defineComponent } from 'vue'
import WeatherItem from './WeatherItem.vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'WeatherList',
  components: {
    WeatherItem,
  },
  props: {
    weathers: {
      type: Array as PropType<Array<Weather>>,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
ul {
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  max-width: 695px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
@media only screen and (max-width: 700px) {
  ul {
    max-width: 335px;
  }
}
</style>
