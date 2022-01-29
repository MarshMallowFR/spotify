<template>
  <Header />
  <main id="main">
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";

export default defineComponent({
  components: {
    Header,
  },
});
</script>

<style lang="scss">
@import "@/assets/style/main.scss";
#app {
  isolation: isolate;
  display: flex;
  font-family: "Roboto";
  font-size: 16px;
  margin-top: 48px;
}
</style>
