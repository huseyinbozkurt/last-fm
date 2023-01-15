import { useEffect } from "react";
import { connect } from "react-redux";
import "./TopArtists.css";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import { ArtistData, useAppDispatch } from "../../store/helpers";
import { selectArtists, fetchArtistsAsync } from "../../store/slices/artists-slice";
import { RootState } from "../../store";

interface TopArtistsProps {
  darkMode: boolean,
  artists: Array<ArtistData>
}

function TopArtists({ darkMode, artists }: TopArtistsProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const data = async () => {
      dispatch(fetchArtistsAsync());
    };
    data();
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center flex-column">
      <div className="mb-4">
        <h2 className={darkMode ? "light-header" : undefined}>
          Top Artists List
        </h2>
      </div>
      {artists.length === 0 ? (
        <div className="spinner-border text-secondary m-5 p-4" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="topArtists border border-3 border-secondary p-4 rounded ">
          {artists.map((artist, index) => (
            <Link
              to={`/detail/${artist.name}`}
              key={index}
              className="text-decoration-none text-reset"
            >
              <Card
                heading="Artist"
                name={artist.name}
                listeners={`Listeners: ${artist.listeners}`}
                playcount={`Playcount: ${artist.playcount}`}
                image={artist.image[1]["#text"]}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
const mapStateToProps = (state: RootState)=> {
  return {
    artists: selectArtists(state)
  }
}

const connectedTopArtists = connect(mapStateToProps)(TopArtists)

export default connectedTopArtists;
