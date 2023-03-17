import React from 'react';
import { serverIP } from '../config';

function Logout() {
  document.location.href = `${serverIP}/logout`;
  return (
    <div>Logout</div>
  );
}

export default Logout;
