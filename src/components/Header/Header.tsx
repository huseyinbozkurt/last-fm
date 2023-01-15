import React from "react";
import "./Header.css";
import Logo from "../../images/lastfm-logo.png";
import PlayerBoard from "../../images/player-board.png";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import SkipPreviousOutlinedIcon from "@mui/icons-material/SkipPreviousOutlined";
import SkipNextOutlinedIcon from "@mui/icons-material/SkipNextOutlined";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Link } from "react-router-dom";

interface HeaderProps {
  darkMode: boolean,
  setDarkMode: (arg0: boolean) => void;
}

function Header({ darkMode, setDarkMode }: HeaderProps) {
  return (
    <nav className="navbar navbar-dark bg-dark py-0">
      <div className="d-flex justify-content-between align-items-center">
        <img src={PlayerBoard} alt="Player Board" />
        <div className="ms-1">
          <SkipPreviousOutlinedIcon className="player text-white cursor-pointer" />
          <PlayCircleOutlinedIcon className="player text-white" />
          <SkipNextOutlinedIcon className="player text-white" />
        </div>
      </div>
      <div>
        <Link to="/" className="navbar-brand">
          <img
            data-testid="headerLogo"
            src={Logo}
            alt="Last.fm"
            width="124"
            height="30"
          />
        </Link>
      </div>
      <div className="d-flex align-items-center me-4">
        <button
          className="bg-transparent border-0"
          onClick={(e) => {
            setDarkMode(!darkMode);
          }}
        >
          {darkMode ? (
            <DarkModeIcon className="darkModeIcon text-primary" />
          ) : (
            <LightModeIcon className="lightModeIcon text-warning" />
          )}
        </button>
      </div>
    </nav>
  );
}

export default Header;
