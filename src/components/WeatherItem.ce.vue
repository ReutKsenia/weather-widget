<template>
  <li>
    <card :img="img">
      <div class="weather_card">
        <div class="weather_card_column">
          <!-- Main -->
          <div class="weather_card_column_main">
            <icon :name="iconName" color="#fff" size="25" />
            <p>{{ weather.weather[0].main }}</p>
          </div>

          <!-- Temp -->
          <p class="weather_card_column_temp">
            {{ Math.round(weather.main.temp) }}°C
          </p>
        </div>

        <div class="weather_card_column2">
          <!-- Location -->
          <div class="weather_card_column_main">
            <p>{{ weather.name }}, {{ weather.sys.country }}</p>
            <icon name="map-pin" color="#fff" size="22" />
          </div>

          <!-- Feels like -->
          <p class="weather_card_column_description">
            Feels like {{ Math.round(weather.main.feels_like) }}°C
          </p>

          <!-- Description -->
          <p class="weather_card_column_description">
            {{
              weather.weather[0].description.charAt(0).toUpperCase() +
              weather.weather[0].description.slice(1)
            }}
          </p>
        </div>
      </div>

      <div class="description_card">
        <div>
          <!-- Humidity -->
          <div class="description_card_item">
            <icon name="droplet" color="#fff" size="18" />
            <p>{{ weather.main.humidity }}%</p>
          </div>
          <!-- Wind speed -->
          <div class="description_card_item">
            <icon name="wind" color="#fff" size="18" />
            <p>{{ weather.wind.speed }} m/s</p>
          </div>
        </div>

        <div>
          <!-- Visibility -->
          <div class="description_card_item">
            <icon name="eye" color="#fff" size="18" />
            <p>{{ weather.visibility / 1000 }} km</p>
          </div>
          <!-- Pressure -->
          <div class="description_card_item">
            <icon name="compass" color="#fff" size="18" />
            <p>{{ weather.main.pressure }} hPa</p>
          </div>
        </div>
      </div>
    </card>
  </li>
</template>

<script lang="ts">
import { Weather } from '@/store/types'
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'WeatherItem',
  props: {
    weather: {
      type: Object as PropType<Weather>,
      required: true,
    },
  },
  data() {
    return {
      iconName: 'cloud',
      img: 'Clouds.svg',
    }
  },
  methods: {
    getIcon() {
      switch (this.weather.weather[0].main) {
        case 'Clouds':
          this.img = 'Clouds.svg'
          this.iconName = 'cloud'
          break
        case 'Clear':
          this.img = 'Clear.svg'
          this.iconName = 'sun'
          break
        case 'Snow':
          this.img = 'Snow.svg'
          this.iconName = 'cloud-snow'
          break
        case 'Rain':
          this.img = 'Rain.svg'
          this.iconName = 'cloud-rain'
          break
        case 'Drizzle':
          this.img = 'Rain.svg'
          this.iconName = 'cloud-drizzle'
          break
        case 'Thunderstorm':
          this.img = 'Thunderstorm.svg'
          this.iconName = 'cloud-lightning'
          break
        default:
          this.img = 'Smoke.svg'
          this.iconName = 'windy'
          break
      }
    },
  },
  mounted() {
    this.getIcon()
  },
  beforeUpdate() {
    this.getIcon()
  },
})
</script>

<style lang="scss" scoped>
li {
  margin-bottom: 25px;
}
p {
  margin: 0;
}
.weather_card {
  box-sizing: border-box;
  padding: 20px 20px 0px 20px;
  height: 106px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.weather_card_column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.weather_card_column2 {
  @extend .weather_card_column;
  align-items: flex-end;
}
.weather_card_column_main {
  display: flex;
  gap: 5px;
  font-family: 'Avenir';
  font-weight: 500;
  font-size: 20px;
  line-height: 27px;
  color: #ffffff;
  margin-bottom: 8px;
}
.weather_card_column_temp {
  font-family: 'Avenir';
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 44px;
  color: #ffffff;
}
.weather_card_column_description {
  font-family: 'Avenir';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #ffffff;
  margin-top: 4px;
}
.description_card {
  height: 79px;
  background: rgba(255, 255, 255, 0.33);
  border-radius: 0px 0px 40px 0px;
  padding: 12px 20px 20px 20px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  box-sizing: border-box;
}
.description_card_item {
  display: flex;
  font-family: 'Avenir';
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  color: #ffffff;
  margin-bottom: 10px;
  p {
    margin-left: 5px;
  }
}
</style>
