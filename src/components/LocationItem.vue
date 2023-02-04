<template>
  <li>
    <span>{{ location.city }}, {{ location.country }}</span>
    <button @click="$emit('remove', location)">
      <icon name="trash-2" size="20" color="#2c3e50" />
    </button>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LocationItem',
  props: {
    location: {
      type: Object,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
li {
  padding: 11px 26px;
  width: 100%;
  height: 44px;
  border: 1px solid #2c3e50;
  border-radius: 38px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;

  span {
    font-family: 'Avenir';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    color: #2c3e50;
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
}
</style>
