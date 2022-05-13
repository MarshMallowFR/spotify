<template>
  <Header />
  <Modal v-if="showModal" @toggleModal="toggleModal" />
  <main id="main">
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/components/Header.vue';
import Modal from '@/components/Modal.vue';

export default defineComponent({
  components: {
    Header,
    Modal,
  },
  data() {
    return {
      showModal: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.showModal = !this.showModal;
      // TEST
    }, 25000);
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
  },
});
</script>

<style lang="scss">
@import '@/assets/style/main.scss';
#app {
  isolation: isolate;
  display: flex;
  font-family: 'Roboto';
  font-size: 16px;
  margin-top: 48px;
}
</style>
