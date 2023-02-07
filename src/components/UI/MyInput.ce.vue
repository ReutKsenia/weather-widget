<template>
  <input
    @submit.stop
    @submit.prevent
    :value="modelValue"
    @input="updateInput"
    class="input"
    type="text"
    @keypress="pressEnter"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MyInput',
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateInput(event: any) {
      this.$emit('update:modelValue', event.target.value)
    },
    pressEnter(event: any) {
      if (event.keyCode == 13) {
        event.stopPropagation()
        event.preventDefault()
        this.$emit('enter', event.target.value)
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.input {
  padding: 11px 26px;
  width: 100%;
  height: 44px;
  border: 1px solid #2c3e50;
  border-radius: 38px;
  font-family: 'Avenir';
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #2c3e50;
  box-sizing: border-box;
}
</style>
