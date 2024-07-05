import React, { useState, useContext, useEffect } from "react";
import { css } from "@emotion/react";
import { Grid, Typography, Divider, IconButton, Avatar, Collapse, CardActions, CardContent, CardHeader, Card } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Poster from "./Poster";
import PropTypes from "prop-types";
import GenresContext from "../../../Context/GenresContext";
import { getGenreNameByID } from "./utils";
import {
  fetchMovieReviews,
  fetchSimilarMovies,
  fetchMovieTrailers,
} from "../../../network/fetchFunctions";
import Reviews from "./Reviews";
import SimilarMovies from "./SimilarMovies";
import Trailers from "./Trailers";

const rootStyle = css`
    maxWidth: "auto",
    backgroundColor: "#e9ecef",
  }`;

  const mediaStyle = css`
    height: 0,
    paddingTop: "56.25%", // 16:9
  }`;

  const expandStyle = css`
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }`;

  const expandOpenStyle = css`
    transform: "rotate(180deg)",
  }`;

  const avatarStyle = css`
    backgroundColor: "#adb5bd",
  }`;

  const ratingStyle = css`
    color: "#fff",
  }`;

  const genreListStyle = css`
    fontStyle: "italic",
  }`;

  const titleStyle = css`
    // color: "#fff",
  }`;

  const reviewStyle = css`
    fontSize: "1rem",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontWeight: "400",
    lineHeight: "1.5",
    letterSpacing: "0.00938em",
  }`;

const Movie = ({
  id,
  poster_path,
  title,
  release_date,
  genre_ids,
  vote_average,
  overview,
}) => {
  const genreList = useContext(GenresContext);
  const movieGenres = genre_ids.map((id) => getGenreNameByID(genreList, id));
  const [userReviews, setUsersReviews] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [movieTrailers, setMovieTrailers] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (expanded) {
      fetchMovieReviews(id).then((results) => setUsersReviews(results));
      fetchSimilarMovies(id).then((results) => setSimilarMovies(results));
      fetchMovieTrailers(id).then((results) => setMovieTrailers(results));
    }
  }, [expanded, id]);

  const movieTitle = (
    <Typography variant="h4" css={titleStyle}>
      {title}
    </Typography>
  );

  return (
    <Card css={rootStyle}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" css={avatarStyle}>
            <Typography css={ratingStyle}>{vote_average}</Typography>
          </Avatar>
        }
        title={movieTitle}
        subheader={"Release date: ".concat(release_date)}
      />
      <CardContent>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <Poster path={poster_path} alt={title} />
          </Grid>
          <Grid item>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              css={genreListStyle}
            >
              {movieGenres.map((movieGenre, index) => (
                <span key={index}>{movieGenre} </span>
              ))}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          css={css`
          ${expandStyle};
          ${expanded && expandOpenStyle};
        `}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="h6">Overview:</Typography>
          <Divider />
          <br />
          <Typography paragraph>{overview}</Typography>
        </CardContent>
        <CardContent>
          {movieTrailers.length && <Trailers movieTrailers={movieTrailers} />}
        </CardContent>
        <CardContent>
          <Typography variant="h6" css={reviewStyle}>
            <Reviews reviews={userReviews} />
          </Typography>
        </CardContent>
        <CardContent>
          <SimilarMovies movies={similarMovies} />
        </CardContent>
      </Collapse>
    </Card>
  );
};

Movie.propTypes = {
  poster_path: PropTypes.string,
  title: PropTypes.string,
  release_date: PropTypes.string,
  genre_ids: PropTypes.arrayOf(PropTypes.number),
  vote_average: PropTypes.number,
  overview: PropTypes.string,
};

export default Movie;
