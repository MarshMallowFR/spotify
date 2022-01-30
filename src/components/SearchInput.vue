<template>
  <input type="text" v-model="artistName" :placeholder="placeholder" />
</template>

<script lang="ts">
import { defineComponent, ref, watch, Ref } from "vue";
export default defineComponent({
  props: {
    placeholder: String,
  },
  setup(_, context) {
    const artistName: Ref<string> = ref("");
    watch(artistName, () => {
      context.emit("searchArtist", artistName.value);
    });
    return {
      artistName,
    };
  },
});
</script>

<style lang="scss" scoped>
input {
  height: 50px;
  width: 50%;
  padding: 16px;
}
</style>
