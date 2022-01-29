<template>
  <div id="search">
    <SearchInput @searchArtist="searchArtist" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { api } from "@/utils/api";

import SearchInput from "@/components/SearchInput.vue";

export default defineComponent({
  name: "Search",
  components: {
    SearchInput,
  },
  // data() {
  //   return {
  //     artistName: "",
  //   };
  // },
  // mounted() {
  //   // this.fetchTest();
  // },
  // watch: {
  //   async artistName() {
  //     if (this.artistName.length > 3) {
  //       // const artist = await api(
  //       //   `https://api.spotify.com/v1/search?q=${this.artistName}&type=album,artist`,
  //       // );
  //       const artist = await api(
  //         "https://api.spotify.com/v1/artists/4tvKz56Tr39bkhcQUTO0Xr"
  //       );

  //       console.log(artist);
  //     }
  //   },
  // },
  // methods: {
  //   async searchArtist(artistName: string) {
  //     // api("https://api.spotify.com/v1/browse/new-releases");
  //   },
  // },
  setup() {
    const searchArtist = async (artistName: string) => {
      console.log(artistName);
      return api("https://api.spotify.com/v1/artists/01fkQiYuBZt16vQ8iRIc7g");
    };
    return {
      searchArtist,
    };
  },
});
</script>
