import React from 'react';
import { Typography } from '@mui/material';

function TypingTitle() {
  return (
    <Typography
      component="h1"
      variant="h2"
      align="center"
      color="text.primary"
      gutterBottom
    >
      <div id="description">
        Make your
        {' '}
        <b>URL</b>
        {' '}
        <b>shorter.</b>
      </div>
    </Typography>
  );
}

export default TypingTitle;
