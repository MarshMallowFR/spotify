export type Artist = {
  id: string;
  name: string;
  picture: string;
  followers: string;
  topTracks: Track[];
  albums: Album[];
  relatedArtists: RelatedArtist[];
};

export type Track = {
  id: string;
  title: string;
  image: string;
  duration: string;
};

export type Album = {
  id: string;
  title: string;
  image: string;
  releaseDate: string;
};

export type RelatedArtist = {
  id: string;
  name: string;
  image: string;
};
