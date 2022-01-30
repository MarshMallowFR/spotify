import { AxiosResponse } from "axios";
import {
  Artist,
  Track,
  Album,
  RelatedArtist,
  AlbumDB,
  RelatedArtistDB,
  TrackDB,
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

const formatTracks = (tracks: TrackDB[]): Track[] => {
  return tracks.map((track: TrackDB) => ({
    id: track.id,
    title: track.name,
    image: track.album.images[0].url,
    duration: millisToMinutesAndSeconds(track.duration_ms),
  }));
};

const formatAlbums = (albums: AlbumDB[]): Album[] => {
  return albums.reduce((acc: Album[], currAlbum: AlbumDB) => {
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

export const formatRelatedArtist = (
  relatedArtists: RelatedArtistDB[]
): RelatedArtist[] => {
  return relatedArtists.map((artist: RelatedArtistDB) => ({
    id: artist.id,
    name: artist.name,
    image:
      artist.images.length > 0
        ? artist.images[0].url
        : // unknown picture
          "https://media.istockphoto.com/vectors/male-face-silhouette-or-icon-man-avatar-profile-unknown-or-anonymous-vector-id1087531642?k=20&m=1087531642&s=170667a&w=0&h=ge3fq1Dw0-J2FoW96c8klSiHyOnitVhReUUuIIYqtvw=",
  }));
};
