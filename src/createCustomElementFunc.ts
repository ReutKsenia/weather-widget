import { Component, createApp, getCurrentInstance } from 'vue'
import { defineCustomElement, h } from 'vue'

const nearestElement = (el: any) => {
  while (el?.nodeType !== 1) el = el.parentElement
  return el
}

export const createElementInstance = (
  component: Component,
  plugins: Array<any> = [],
  components: Array<Component> = []
) => {
  return defineCustomElement({
    setup() {
      const app = createApp(component)

      plugins.forEach(app.use)

      components.forEach((component) => {
        app.component(component.name ? component.name : '', component)
      })

      app.mixin({
        mounted() {
          const insertStyles = (styles: any) => {
            if (styles?.length) {
              this.__style = document.createElement('style')
              this.__style.innerText = styles.join().replace(/\n/g, '')
              nearestElement(this.$el).prepend(this.__style)
            }
          }

          insertStyles(this.$?.type.styles)
          if (this.$options.components) {
            Object.values(this.$options.components).forEach((comp: any) =>
              insertStyles(comp.styles)
            )
          }
        },
        unmounted() {
          this.__style?.remove()
        },
      })

      const inst = getCurrentInstance()
      if (inst) {
        Object.assign(inst.appContext, app._context)
      }
    },
    render: () => h(component),
  })
}
