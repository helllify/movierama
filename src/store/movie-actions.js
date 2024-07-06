import { movieActions } from './movie-slice';
import serviceCall from '../network/serviceCall';
import {
    CURRENTLY_PLAYING_ENDPOINT,
    SEARCH_MOVIE,
    GENRE_LIST,
  } from "../network/endpoints";

export const fetchCurrentlyPlayingMovies = (page) => {

    return async (dispatch) => {
        const payload = {
            language: "en-US",
            page,
        };
        const fetchData = async () => {
            const response = await serviceCall("GET", CURRENTLY_PLAYING_ENDPOINT, payload);

            if (response.status !== 200) {
                throw new Error('Could not fetch movie data!');
            }

            const data = await response.data;

            return data;
        };

        try {
            const playingMovies = await fetchData();

            dispatch(
                movieActions.getMovies({
                    movies: playingMovies || []
                })
            );
        } catch (error) {
            console.log(error);
        }
    };
};

export const searchMovie = (query) => {

    return async (dispatch) => {
        const payload = { language: "en-US", query };
        const fetchData = async () => {
            const response = await serviceCall("GET", SEARCH_MOVIE, payload);

            if (response.status !== 200) {
                throw new Error('Could not fetch search data!');
            }

            const data = await response.data;

            return data;
        };

        try {
           
            const searchMovies = await fetchData();

            dispatch(
                movieActions.searchMovies({
                    searchMovies: searchMovies || []
                })
            );
        
        } catch (error) {
            console.log(error);
        }
    };
};

export const getGenres = () => {

    return async (dispatch) => {
        const payload = { language: "en-US" };
        const fetchData = async () => {
            const response = await serviceCall("GET", GENRE_LIST, payload);

            if (response.status !== 200) {
                throw new Error('Could not fetch genres data!');
            }

            const data = await response.data;

            return data;
        };

        try {
           
            const genres = await fetchData();

            dispatch(
                movieActions.getGenres({
                    genres: genres || []
                })
            );
        
        } catch (error) {
           console.log(error);
        }
    };
};