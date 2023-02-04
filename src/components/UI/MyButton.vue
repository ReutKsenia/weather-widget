<template>
  <button class="btn">
    <slot></slot>
    <Icon :name="icon" size="24" color="#2c3e50" class="ico" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MyButton',
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 11px 26px;
  border: 1px solid #2c3e50;
  border-radius: 38px;
  background-color: white;
  font-family: 'Avenir';
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #2c3e50;
  cursor: pointer;

  &:hover {
    background: rgba(44, 62, 80, 0.08);
  }
}
.ico {
  margin-left: 5px;
}
</style>
