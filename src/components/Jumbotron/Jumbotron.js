import React from "react";
import { css } from "@emotion/react";
import { Typography, Grid } from '@mui/material';

const rootStyle = css`
  height: 20vh;
  padding: 0;
  background-color: #dee2e6;
`;

const titleStyle = css`
  color: #212529;
  font-size: 68px !important;
`;

const subTitleStyle = css`
  color: 212529;
  font-size: 22px !important;
`;

const Jumbotron = () => {
  const title = <Typography css={titleStyle}>MovieRama</Typography>;
  const subTitle = (
    <Typography css={subTitleStyle}>Search for movies!</Typography>
  );

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      css={rootStyle}
    >
      <Grid item>{title}</Grid>
      <Grid item>{subTitle}</Grid>
    </Grid>
  );
};

export default Jumbotron;
