import { createSlice } from '@reduxjs/toolkit';

const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    movies: [],
    searchMovies: [],
    genres: []
  },
  reducers: {

    getMovies(state, action) {
      const newMovies = action.payload.movies;

      if(!state.movies || state.movies.length === 0) {
        state.movies = newMovies.results;
      } else {
        state.movies.push(...newMovies.results)
      }
    },
    searchMovies(state, action) {
        const newMovies = action.payload.searchMovies;
    
          state.searchMovies = newMovies.results;
      },
      getGenres(state, action) {
        const genres = action.payload.genres;
    
          state.genres = genres.genres;
      },
  },
});

export const movieActions = movieSlice.actions;

export default movieSlice;