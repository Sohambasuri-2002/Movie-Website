
import { useEffect, useState } from "react";
import "./App.css";
import searchIcon from "./search.svg";
import Moviecard from "./Moviecard";


const API_URL = "https://www.omdbapi.com?apikey=4639058f";

const movie1 = {
  "Title": "Spiderman in Cannes",
  "Year": "2016",
  "imdbID": "tt5978586",
  "Type": "movie",
  "Poster": "https://m.media-amazon.com/images/M/MV5BZDlmMGQwYmItNTNmOS00OTNkLTkxNTYtNDM3ZWVlMWUyZDIzXkEyXkFqcGdeQXVyMTA5Mzk5Mw@@._V1_SX300.jpg"
}

export default function App(){
    const [movies, setMovies] = useState();
    const [searchTerm, setsearchTerm] = useState('');

    const searchmovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }

  useEffect(() => {
    searchmovies('Spiderman')
  } ,[]);

  return (
    <div className="app">
      <h1>MovieX</h1>
      <div className="search">
        <input
        placeholder="Search for movies"
        value={searchTerm}
        onChange={(e) => setsearchTerm(e.target.value)}
        />
        <img
        src={searchIcon}
        alt="search"
        onClick={() => searchmovies(searchTerm)}
        />
      </div>

      {
        movies?.length > 0
          ? (
            <div className="container">
            {movies.map((movie) => (
                <Moviecard movie={movie} />
            ))}
          </div>
          ) : (
            <div className="empty">
              <h2>No Movies found</h2>
            </div>
          )
      }

      

    </div>
  )
}
