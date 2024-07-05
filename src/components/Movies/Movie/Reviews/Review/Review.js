import React from "react";
import PropTypes from "prop-types";
import { Divider, Typography } from '@mui/material';

const Review = ({ author, content, id, url }) => {
  return (
    <>
      <Divider />
      <br />
      <div key={id}>
        <Typography variant="caption">{author}</Typography>
        <br />
        <br />
        <Typography variant="body2" paragraph>
          {content}
        </Typography>
        <br />
      </div>
    </>
  );
};

Review.propTypes = {
  author: PropTypes.string,
  content: PropTypes.string,
  id: PropTypes.string,
  url: PropTypes.string,
};

export default Review;
