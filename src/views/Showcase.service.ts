import { AxiosResponse } from "axios";

type Artist = {
  id: string;
  name: string;
  picture: string;
  followers: number;
  topTracks: Track[];
  albums: Album[];
  relatedArtists: RelatedArtist[];
};

type Track = {
  id: string;
  title: string;
  image: string;
  duration: number;
};

type Album = {
  id: string;
  title: string;
  image: string;
  releaseDate: string;
};

type RelatedArtist = {
  id: string;
  name: string;
  image: string;
};

export const formatArtistData = (data: AxiosResponse[]): Artist => {
  const [artist, tracks, albums, relatedArtists] = data.map(({ data }) => data);
  return {
    id: artist.id,
    name: artist.name,
    picture: artist.images[0]?.url,
    followers: artist.followers.total,
    topTracks: formatTracks(tracks.tracks),
    albums: formatAlbums(albums.items),
    relatedArtists: formatRelatedArtist(relatedArtists.artists),
  };
};

const formatTracks = (tracks: any[]): Track[] => {
  return tracks.map((track: any) => ({
    id: track.id,
    title: track.name,
    image: track.album.images[0].url,
    duration: track.duration,
  }));
};
const formatAlbums = (albums: any[]): Album[] => {
  return albums.map((album: any) => ({
    id: album.id,
    title: album.name,
    image: album.images[0].url,
    releaseDate: album.release_date,
  }));
};
const formatRelatedArtist = (relatedArtists: any[]): RelatedArtist[] => {
  return relatedArtists.map((artist: any) => ({
    id: artist.id,
    name: artist.name,
    image: artist.images[0].url,
  }));
};
