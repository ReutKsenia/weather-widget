<template>
  <nav class="navbar">
    <h1>Weather widget</h1>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Navbar',
})
</script>

<style lang="scss" scoped>
.navbar {
  padding: 50px 0 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-family: 'Avenir';
    font-weight: 500;
    font-size: 32px;
    line-height: 44px;
    color: #2c3e50;
    margin: 0;
    margin-bottom: 15px;
  }
}
</style>
