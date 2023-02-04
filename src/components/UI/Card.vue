<template>
  <div
    class="card"
    :style="{
      backgroundImage: 'url(' + require(`../../assets/img/${img}`) + ')',
    }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Card',
  props: {
    img: {
      type: String,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
.card {
  width: 335px;
  height: 185px;
  box-shadow: 4px 3px 9px rgba(0, 0, 0, 0.25);
  border-radius: 40px 0px;
}
</style>
