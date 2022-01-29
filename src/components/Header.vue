<template>
  <header>
    <img src="../assets/logo.jpg" alt="logo" />
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/search">Search</router-link>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
});
</script>

<style scoped lang="scss">
header {
  height: 100vh;
  width: 200px;
  text-align: center;

  img {
    width: 100px;
    margin: auto;
  }
  nav {
    display: flex;
    flex-direction: column;
    margin-top: 32px;
    a {
      text-decoration: none;
      color: inherit;
      font-size: 1.2em;
    }
  }
}
</style>
