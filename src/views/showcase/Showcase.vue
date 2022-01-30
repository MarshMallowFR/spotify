<template>
  <section id="showcase_details">
    <img
      :src="artist.picture"
      alt="artist picture"
      class="showcase_artist_picture"
    />
    <div>
      <h2 class="showcase_artist_name">{{ artist.name }}</h2>
      <p class="showcase_artist_followers">{{ artist.followers }} followers</p>
    </div>
  </section>
  <section id="showcase_tracks">
    <h3>Popular songs</h3>
    <ul>
      <li
        class="showcase_track"
        v-for="(track, index) in artist.topTracks"
        :key="track.id"
      >
        <p class="showcase_track_index">{{ index + 1 }}</p>
        <img
          class="showcase_track_cover"
          :src="track.image"
          alt="track cover"
        />
        <p class="showcase_track_title">{{ track.title }}</p>
        <p class="showcase_track_duration">{{ track.duration }}</p>
      </li>
    </ul>
  </section>
  <section id="showcase_albums">
    <h3>Albums</h3>
    <ul id="showcase_albums_list">
      <li class="showcase_album" v-for="album in artist.albums" :key="album.id">
        <img
          class="showcase_album_cover"
          :src="album.image"
          alt="album cover"
        />
        <p class="showcase_album_title" :title="album.title">
          {{ album.title }}
        </p>
        <p class="showcase_album_release">{{ album.releaseDate }}</p>
      </li>
    </ul>
  </section>
  <ArtistsSummary :artists="artist.relatedArtists" :title="'Fans also like'" />
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref, watch } from "vue";
import { useRoute, _RouteLocationBase } from "vue-router";

import ArtistsSummary from "@/components/ArtistsSummary.vue";
import { formatArtistData } from "@/views/showcase/Showcase.service";
import { Artist } from "@/views/showcase/Showcase.type";

import { api } from "@/utils/api";
import { EmptyObject } from "@/utils/general.types";

export default defineComponent({
  name: "Showcase",
  components: {
    ArtistsSummary,
  },
  setup() {
    let artist: Ref<Artist | EmptyObject> = ref({});
    const route: _RouteLocationBase = useRoute();
    // id of route or Angus and Julia Stone (my fav artists)
    const artistId = ref(route.params.id || "4tvKz56Tr39bkhcQUTO0Xr");

    const fetchArtist = async (newArtistId?: string) => {
      const artistData = await Promise.all([
        api(
          `https://api.spotify.com/v1/artists/${newArtistId || artistId.value}`
        ),
        api(
          `https://api.spotify.com/v1/artists/${
            newArtistId || artistId.value
          }/top-tracks?market=FR`
        ),
        api(
          `https://api.spotify.com/v1/artists/${
            newArtistId || artistId.value
          }/albums`
        ),
        api(
          `https://api.spotify.com/v1/artists/${
            newArtistId || artistId.value
          }/related-artists`
        ),
      ]);
      artist.value = formatArtistData(artistData);
    };

    onMounted(async () => {
      fetchArtist();
    });

    watch(route, (newRoute) => {
      if (newRoute.params.id) {
        fetchArtist(newRoute.params.id as string);
      }
    });

    return {
      artist,
    };
  },
});
</script>

<style lang="scss">
#main {
  flex: 1;
  padding-left: 80px;

  h3 {
    font-size: 2rem;
    text-transform: uppercase;
  }

  #showcase_details {
    align-items: center;
    margin: auto;
    margin-bottom: 48px;
    width: 100%;
    display: flex;

    .showcase_artist_picture {
      border-radius: 50%;
      width: 200px;
      margin-right: 48px;
    }
    .showcase_artist_name {
      font-size: 4em;
    }
    .showcase_artist_followers {
      font-size: 1.5rem;
    }
  }

  #showcase_tracks {
    margin-bottom: 48px;

    .showcase_track {
      display: flex;
      align-items: center;
      margin: 32px auto;
      > * {
        margin-right: 32px;
        font-size: 1.25rem;
      }
      .showcase_track_title {
        width: 500px;
      }
    }
    .showcase_track_cover {
      height: 70px;
      width: 70px;
    }
  }
  #showcase_albums {
    margin-bottom: 48px;
    #showcase_albums_list {
      display: flex;
      flex-wrap: wrap;
      .showcase_album {
        margin-right: 32px;
        margin-top: 32px;
        .showcase_album_cover {
          width: 200px;
        }
        .showcase_album_title {
          text-overflow: ellipsis;
          width: 200px;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
  }
  #showcase_recommandation {
    margin-bottom: 48px;
    #showcase_recommandation_list {
      display: flex;
      flex-wrap: wrap;
    }
    .showcase_recommanded {
      margin-right: 32px;
      margin-top: 32px;
    }
    .showcase_recommanded_picture {
      width: 200px;
      border-radius: 50%;
      height: 200px;
      margin-bottom: 16px;
    }
    .showcase_recommanded_name {
      text-align: center;
    }
  }
}
</style>
>
