<template>
  <input type="text" v-model.lazy="artistName" />
</template>

<script>
import { ref, watch } from "vue";
export default {
  setup(_, context) {
    const artistName = ref("");
    watch(artistName, () => {
      context.emit("searchArtist", artistName.value);
    });
    return {
      artistName,
    };
  },
};
</script>

<style></style>
