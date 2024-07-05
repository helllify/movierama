import React from "react";
import PropTypes from "prop-types";
import { sortyByPopularity } from "../utils";
import { Typography, Divider, ListItem, List } from '@mui/material';

const SimilarMovies = ({ movies }) => {
  const similarMoviesExist = movies.length !== 0;
  const topFiveSimilarMovies = [...movies].sort(sortyByPopularity).slice(0, 5);

  return (
    similarMoviesExist && (
      <>
        <Typography variant="h6">
          Similar movies (sorted by popularity)
        </Typography>
        <Divider />
        <List>
          {topFiveSimilarMovies.map(({ title, id }) => (
            <ListItem key={id}>
              <Typography variant="body1">{title}</Typography>
            </ListItem>
          ))}
        </List>
      </>
    )
  );
};

SimilarMovies.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
};

export default SimilarMovies;
