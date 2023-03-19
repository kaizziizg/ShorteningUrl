/* eslint-disable no-unused-vars */
import * as React from 'react';
import axios from 'axios';
import cookie from 'cookie';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { serverIP } from '../config';

export default function Management() {
  const [datas, setData] = React.useState(null);

  React.useEffect(() => {
    const cookies = cookie.parse(document.cookie);
    axios.get(`${serverIP}/api/shortUrls`, { params: { username: cookies.username } }).then((res) => {
      setData(res.data);
    });
  }, []);
  if (datas === null) return (<div>Loading</div>);
  if (datas !== null && datas.msg === 'Wrong authorization') return (<h1 style={{ textAlign: 'Center' }}>Wrong authorization</h1>);
  return (
    <TableContainer component={Paper} sx={{ width: '80%', mx: 'auto', marginTop: '2rem' }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Origin URL</TableCell>
            <TableCell align="right">Shorten URL</TableCell>
            <TableCell align="right">ClickTime</TableCell>
            <TableCell align="right">Validity Period(GMT+0)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datas.map((row) => (
            <TableRow
              key={row.oriUrl}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.oriUrl}
              </TableCell>
              <TableCell align="right">{row.shortUrl}</TableCell>
              <TableCell align="right">{row.clickTime}</TableCell>
              <TableCell align="right">{row.lifeTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
