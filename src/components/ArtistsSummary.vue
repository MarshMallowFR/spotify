<template>
  <section id="artistsSummary">
    <h3 v-if="artists && artists.length > 0">{{ title }}</h3>
    <ul id="artists_list">
      <li
        class="artist_block"
        v-for="artist in artists"
        :key="artist.id"
        @click="getShowCase(artist.id)"
      >
        <img class="artist_picture" :src="artist.image" alt="artist picture" />
        <p class="artist_name">{{ artist.name }}</p>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import router from "@/router";
import { Artist } from "@/views/showcase/Showcase.type";

export default defineComponent({
  name: "ArtistsSummary",
  props: {
    title: String,
    artists: {
      type: Object as PropType<Artist[]>,
    },
  },
  methods: {
    getShowCase(artistId: string) {
      router.push(`/${artistId}`);
    },
  },
});
</script>

<style lang="scss" scoped>
#artistsSummary {
  margin-bottom: 48px;
  h3 {
    text-transform: uppercase;
  }
  #artists_list {
    display: flex;
    flex-wrap: wrap;
  }
  .artist_block {
    margin-right: 32px;
    margin-top: 32px;
    cursor: pointer;
  }
  .artist_picture {
    width: 200px;
    border-radius: 50%;
    height: 200px;
    margin-bottom: 16px;
  }
  .artist_name {
    text-align: center;
    text-overflow: ellipsis;
    width: 200px;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>
