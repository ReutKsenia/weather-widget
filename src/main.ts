import components from './components/UI/index'
import store from './store'
import App from './App.vue'
import { createElementInstance } from './createCustomElementFunc'

customElements.define(
  'weather-widget',
  createElementInstance(App, [store], components)
)
