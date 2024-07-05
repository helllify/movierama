import React from "react";
import Trailer from "./Trailer";
import { Grid, Typography, Divider } from '@mui/material';

const Trailers = ({ movieTrailers }) => {
  return (
    <>
      <Typography variant="h6">Trailers</Typography>
      <Divider />
      <br />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        {movieTrailers.map(({ id, key: youtubeKey, ...trailer }) => (
          <Grid item key={id}>
            <Trailer {...trailer} youtubeKey={youtubeKey} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Trailers;
