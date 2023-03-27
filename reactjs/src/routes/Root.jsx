import React from 'react';
import { Outlet } from 'react-router-dom';

import {
  GlobalStyles,
} from '@mui/material';

import '../css/root.css';
import '../css/typingTitle.css';

import Header from '../components/Header';
import AlertSnackbar from '../components/AlertSnackbar';
import Loading from '../components/Loading';

export default function Root() {
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertMsg, setAlertMsg] = React.useState('no msg');
  const [alertState, setAlertState] = React.useState('success');
  const [openLoading, setOpenLoading] = React.useState(false);
  const controller = {
    openAlert,
    setOpenAlert,
    alertMsg,
    setAlertMsg,
    alertState,
    setAlertState,
    openLoading,
    setOpenLoading,
  };
  return (
    <>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <Header controller={controller} />
      <AlertSnackbar controller={controller} />
      <Loading controller={controller} />
      <Outlet context={[controller]} />
    </>
  );
}
