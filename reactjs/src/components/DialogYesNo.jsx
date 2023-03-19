/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(false);

  const btnStyle = {
    mx: 0.5, mt: 2,
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const handleConfirm = () => {
    if (props !== 'you must select aleast one') {
      props.handle();
    }
    setOpen(false);
  };
  const msg = () => {
    if (props.msgs() === []) {
      return (<p />);
    }
    return ((props.msgs()).map((m, index) => (
      <p key={m} style={{ textAlign: 'center' }}>
        {m}
      </p>
    )));
  };
  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        sx={btnStyle}
      >
        {props.btnName}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCancel}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-slide-description"> */}

          {msg()}

          {/* </DialogContentText> */}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleConfirm}>Continue</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
