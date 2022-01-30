<template>
  <div id="search">
    <SearchInput
      :placeholder="'Search an artist'"
      @searchArtist="searchArtist"
    />
  </div>
  <ArtistsSummary :artists="artists" :title="'Your research:'" />
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import { api } from "@/utils/api";

import SearchInput from "@/components/SearchInput.vue";
import ArtistsSummary from "@/components/ArtistsSummary.vue";

import { formatRelatedArtist } from "@/views/showcase/Showcase.service";
import { RelatedArtist } from "@/views/showcase/Showcase.type";

export default defineComponent({
  name: "Search",
  components: {
    SearchInput,
    ArtistsSummary,
  },
  setup() {
    const artists: Ref<RelatedArtist[]> = ref([]);
    const searchArtist = async (artistName: string) => {
      const { data: artistsSearched } = await api(
        `https://api.spotify.com/v1/search?q=${artistName}&type=album,artist`
      );
      artists.value = formatRelatedArtist(
        artistsSearched.artists.items
      ) as RelatedArtist[];
    };
    return {
      searchArtist,
      artists,
    };
  },
});
</script>

<style lang="scss" scoped>
#search {
  margin-bottom: 38px;
}
</style>
