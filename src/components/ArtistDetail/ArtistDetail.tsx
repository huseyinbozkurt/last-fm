import { useEffect } from "react";
import { connect } from "react-redux";
import Card from "../Card/Card";
import "./ArtistDetail.css";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import { AlbumsData, TracksData, useAppDispatch } from "../../store/helpers";
import { selectAlbums, fetchAlbumsAsync } from "../../store/slices/albums-slice";
import { selectTracks, fetchTopTracksAsync } from "../../store/slices/tracks-slice";


interface ArtistDetailProps {
  darkMode: boolean;
  albums: Array<AlbumsData>;
  tracks: Array<TracksData>
}

function ArtistDetail({ darkMode, albums, tracks }: ArtistDetailProps) {
  const dispatch = useAppDispatch();
  const params = useParams<{ name: string}>();
  console.log(params);
  useEffect(() => {
    const albumData = async () => {
      dispatch(fetchAlbumsAsync(params.name!))
    };
    albumData();
    const trackData = async () => {
      dispatch(fetchTopTracksAsync(params.name!))
    };
    trackData();
  }, [params.name]);

  return (
    <div className="row container">
      <div className="col-12 d-flex align-items-center border border-secondary border-2 rounded mb-4 p-0 bg-secondary">
        <div className="col-3 d-flex justify-content-center align-items-center py-1 px-4">
          {albums.length === 0 ? (
            <div className="spinner-border text-light m-5" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <img src={albums[0].image[2]["#text"]} className="img-fluid rounded" alt="Artist" />
          )}
        </div>
        <div className="col-9">
          <h1 className="card-text fw-bold ">{params.name}</h1>
        </div>
      </div>
      <div className="col-sm-12 col-md-6 p-0">
        <h5
          className={
            darkMode
              ? "light-header border-bottom border-secondary border-3 pb-2 me-3"
              : "border-bottom border-secondary border-3 pb-2 me-3"
          }
        >
          Top Albums
        </h5>
        {albums.length === 0 ? (
          <div className="spinner-border text-secondary m-5 p-4" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div className="topAlbums mt-3">
            {albums.map((album, index) => (
              <Card
                key={index}
                heading={album.name}
                name={album.artist.name}
                image={album.image[2]["#text"]}
                playcount={`${album.playcount} play`}
                topAlbums
              />
            ))}
          </div>
        )}
      </div>
      <div className="col-sm-12 col-md-6 p-0 mt-4 mt-md-0">
        <h5
          className={
            darkMode
              ? "light-header border-bottom border-secondary border-3 pb-2 me-3"
              : "border-bottom border-secondary border-3 pb-2 me-3"
          }
        >
          Top Tracks
        </h5>
        {tracks.length === 0 ? (
          <div className="spinner-border text-secondary m-5 p-4" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div className="topTracks mt-3">
            {tracks.map((track, index) => (
              <Card
                key={index}
                heading={track.name}
                name={track.artist.name}
                image={track.image[2]["#text"]}
                listeners={`${track.listeners} play`}
                topAlbums
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    albums: selectAlbums(state),
    tracks: selectTracks(state),
  } 
}

const connectedArtistDetail = connect(mapStateToProps)(ArtistDetail)

export default connectedArtistDetail;
