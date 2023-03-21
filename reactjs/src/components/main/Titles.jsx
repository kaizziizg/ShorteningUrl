import React from 'react';
import {
  Typography,
} from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

function Title(props) {
  const { title } = props;
  return (
    <Typography variant="h3">{title}</Typography>
  );
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

function SubTitle(props) {
  const { title, contentID, data } = props;
  return (
    <>
      <Typography variant="h4" component="span" align="center" color="text.primary" m="1rem">{title}</Typography>
      <Typography variant="h5" component="span" align="center" color="text.secondary" id={contentID}>{data}</Typography>
    </>
  );
}
SubTitle.propTypes = {
  title: PropTypes.string.isRequired,
  contentID: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export { Title, SubTitle };
