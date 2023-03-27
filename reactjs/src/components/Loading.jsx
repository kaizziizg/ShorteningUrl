import React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Loading(props) {
  const { controller } = props;
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={controller.openLoading}
        // onClick={controller.setOpenLoading(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

Loading.propTypes = {
  controller: PropTypes.shape({
    openAlert: PropTypes.bool,
    setOpenAlert: PropTypes.func,
    setAlertMsg: PropTypes.func,
    openLoading: PropTypes.bool,
    setOpenLoading: PropTypes.func,

  }).isRequired,
};

export default Loading;
