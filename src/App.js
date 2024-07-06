import React, { useState, useCallback, useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import "./App.css";
import Jumbotron from "./components/Jumbotron";
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@mui/material';
import Page from "./components/Page";
import UserInput from "./components/UserInput";
import Movies from "./components/Movies";
import Footer from "./components/Footer";
import { fetchCurrentlyPlayingMovies, searchMovie, getGenres } from './store/movie-actions';

const observerOptions = {
  rootMargin: "0px",
  threshold: 1.0,
};

const App = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [moviesPlayingNowSearchPage, setMoviesPlayingNowSearchPage] = useState(
    1
  );
  // const genres = useSelector((state) => state.movies.genres);
  const moviesPlayingNow = useSelector((state) => state.movies.movies);
  const searchResults = useSelector((state) => state.movies.searchMovies);
  const observerTarget = document.getElementById("end-of-page");

  /**
   * intersection observer
   */
  useEffect(() => {
    let observer;
    if (observerTarget) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio) {
            setMoviesPlayingNowSearchPage(
              (prevResultsPage) => prevResultsPage + 1
            );
          }
        });
      }, observerOptions);

      observer.observe(observerTarget);
    }

    return () => (observerTarget ? observer.unobserve() : null);
  }, [observerTarget]);


  useEffect(() => {
    dispatch(getGenres());
    dispatch(fetchCurrentlyPlayingMovies(moviesPlayingNowSearchPage));
  }, [dispatch, moviesPlayingNowSearchPage]);


  const updateSearchTermCallback = useCallback(
    (newSearchTerm) => setSearchTerm(newSearchTerm),
    [setSearchTerm]
  );

  /**
   * fetch on search term change
   */
  useEffect(() => {
    if (searchTerm) {
      dispatch(searchMovie(searchTerm));
    }
  }, [dispatch, searchTerm]);

  const moviesToDisplay =
    searchTerm && searchResults.length !== 0 ? (
      <Movies moviesArray={searchResults} />
    ) : (
      <Movies moviesArray={moviesPlayingNow} />
    );

  return (
    <>
      <CssBaseline />
      <Jumbotron />
      <Page>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item>
            <UserInput updateSearchTerm={updateSearchTermCallback} />
          </Grid>
          <Grid item>
            {moviesToDisplay}
          </Grid>
        </Grid>
        <Footer />
      </Page>
    </>
  );
};

export default App;
