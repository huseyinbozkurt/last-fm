import axios from "axios";
import { useDispatch } from 'react-redux';
import type { AppDispatch } from "./";

const instance = axios.create({
  baseURL: "https://ws.audioscrobbler.com",
});

interface ArtistData {
  name: string;
  playcount: number;
  listeners: number;
  mbid: string;
  url: string;
  streamable: number;
  image: Array<{
    "#text": string;
    size: "small" | "medium" | "large" | "extralarge" | "mega";
  }>;
}

interface ArtistsRawData {
  data: {
    artists: {
      "@attr": {
        page: number;
        perPage: number;
        total: number;
        totalPages: number;
      };
      artist: Array<ArtistData>;
    };
  };
}

interface AlbumsData {
  artist: {
    name: string;
    mbid: string;
    url: string;
  };
  image: Array<{
    "#text": string;
    size: "small" | "medium" | "large" | "extralarge" | "mega";
  }>;
  name: string;
  playcount: number;
  url: string;
}

interface AlbumsRawData {
  data: {
    topalbums: {
      "@attr": {
        artist: string;
        page: number;
        perPage: number;
        total: number;
        totalPages: number;
      };
      album: Array<AlbumsData>;
    };
  };
}

interface TracksData {
  "@attr": {
    rank: number;
  };
  artist: {
    name: string;
    mbid: string;
    url: string;
  };
  image: Array<{
    "#text": string;
    size: "small" | "medium" | "large" | "extralarge" | "mega";
  }>;
  listeners: number;
  name: string;
  playcount: number;
  streamable: number;
  url: string;
}
interface TracksRawData {
  data: {
    toptracks: {
      "@attr": {
        artist: string;
        page: number;
        perPage: number;
        total: number;
        totalPages: number;
      };
      track: Array<TracksData>;
    };
  };
}
const fetchArtists = () =>
  instance
    .get(
      `/2.0/?method=chart.gettopartists&api_key=${process.env.REACT_APP_API_KEY}&format=json&limit=999`
    )
    .then((response: ArtistsRawData) => {
      return response;
    });

const fetchTopAlbums = (name: string) =>
  instance
    .get(
      `/2.0/?method=artist.gettopalbums&artist=${name}&api_key=${process.env.REACT_APP_API_KEY}&format=json&limit=999`
    )
    .then((response: AlbumsRawData) => {
      return response;
    });
const fetchTopTracks = (name: string) =>
  instance
    .get(
      `/2.0/?method=artist.gettoptracks&artist=${name}&api_key=${process.env.REACT_APP_API_KEY}&format=json&limit=999`
    )
    .then((response: TracksRawData) => {
      return response;
    });

export const useAppDispatch = () => useDispatch<AppDispatch>();
export { fetchArtists, fetchTopAlbums, fetchTopTracks };
export type {
  ArtistsRawData,
  ArtistData,
  AlbumsRawData,
  AlbumsData,
  TracksRawData,
  TracksData,
};
