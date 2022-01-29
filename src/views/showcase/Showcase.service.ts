import { AxiosResponse } from "axios";
import {
  Artist,
  Track,
  Album,
  RelatedArtist,
} from "@/views/showcase/Showcase.type";
import { millisToMinutesAndSeconds, numberWithCommas } from "@/utils/tools";

export const formatArtistData = (data: AxiosResponse[]): Artist => {
  const [artist, tracks, albums, relatedArtists] = data.map(({ data }) => data);
  return {
    id: artist.id,
    name: artist.name,
    picture: artist.images[0]?.url,
    followers: numberWithCommas(artist.followers.total),
    topTracks: formatTracks(tracks.tracks).slice(0, 5),
    albums: formatAlbums(albums.items),
    relatedArtists: formatRelatedArtist(relatedArtists.artists),
  };
};

const formatTracks = (tracks: any[]): Track[] => {
  return tracks.map((track: any) => ({
    id: track.id,
    title: track.name,
    image: track.album.images[0].url,
    duration: millisToMinutesAndSeconds(track.duration_ms),
  }));
};

const formatAlbums = (albums: any[]): Album[] => {
  return albums.reduce((acc, currAlbum) => {
    const isDouble = acc.find(
      ({ title }: { title: string }) =>
        title.toLowerCase() === currAlbum.name.toLowerCase()
    );
    if (isDouble) {
      return acc;
    }
    const formattedAlbum = {
      id: currAlbum.id,
      title: currAlbum.name,
      image: currAlbum.images[0].url,
      releaseDate: currAlbum.release_date,
    };
    return [...acc, formattedAlbum];
  }, []);
};
const formatRelatedArtist = (relatedArtists: any[]): RelatedArtist[] => {
  return relatedArtists.map((artist: any) => ({
    id: artist.id,
    name: artist.name,
    image: artist.images[0].url,
  }));
};
