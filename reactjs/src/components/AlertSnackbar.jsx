import * as React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function AlertSnackbar(props) {
  const { controller } = props;

  const handleClose = () => {
    controller.setOpenAlert(false);
  };
  return (
    <Snackbar open={controller.openAlert} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert elevation={6} onClose={handleClose} severity={controller.alertState} sx={{ width: '100%' }}>
        {controller.alertMsg}
      </MuiAlert>
    </Snackbar>
  );
}
AlertSnackbar.propTypes = {
  controller: PropTypes.shape({
    openAlert: PropTypes.bool,
    setOpenAlert: PropTypes.func,
    alertMsg: PropTypes.string,
    setAlertMsg: PropTypes.func,
    alertState: PropTypes.string,
    setAlertState: PropTypes.func,
    openLoading: PropTypes.bool,
    setOpenLoading: PropTypes.func,

  }).isRequired,
};

export default AlertSnackbar;
