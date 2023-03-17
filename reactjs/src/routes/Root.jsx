import React from 'react';
import { Outlet } from 'react-router-dom';

import {
  GlobalStyles,
} from '@mui/material';

import '../css/root.css';
import '../css/typingTitle.css';

import Header from '../components/Header';

export default function Root() {
  return (
    <>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <Header />
      <Outlet />
    </>
  );
}
