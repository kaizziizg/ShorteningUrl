import React, { useImperativeHandle, forwardRef } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Loading(props, ref) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  useImperativeHandle(ref, () => ({
    handleToggle,
    handleClose,
  }));

  return (
    <div>
      {/* <Button onClick={handleToggle}>Show backdrop</Button> */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

// eslint-disable-next-line no-func-assign
Loading = forwardRef(Loading);
export default Loading;
