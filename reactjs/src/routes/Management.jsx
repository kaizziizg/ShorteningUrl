/* eslint-disable max-len */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import axios from 'axios';
import qs from 'qs';
import cookie from 'cookie';
import {
  Checkbox, Box, TablePagination, TextField,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { serverIP } from '../config';
import EnhancedTableHead from '../components/EnhancedTableHead';
import DialogYesNo from '../components/DialogYesNo';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function updateObjectKey(obj, key, value) {
  return {
    ...obj,
    [key]: value,
  };
}

export default function Management() {
  const cookies = cookie.parse(document.cookie);
  const [datas, setData] = React.useState(null);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [error, setError] = React.useState({});
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = datas.map((n) => n.shortUrl);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (event) => {
    if (selected.length === 0) {
      console.log('no selection');
    }
    const updateData = {
      username: cookies.username,
      updateUrls: selected,
    };
    axios.post(`${serverIP}/updateUrl`, updateData).then((res) => {
      console.log(res.data);
    });
  };
  const handleUpdate = (event) => {
    if (selected.length === 0) {
      return;
    }
    const switchUrls = {};
    selected.forEach((select) => { switchUrls[select] = document.querySelector(`#${select}`).value; });
    const updateData = {
      username: cookies.username,
      updateUrls: switchUrls,
    };
    axios.post(`${serverIP}/updateUrl`, updateData).then((res) => {
      console.log(res.data);
    });
  };
  const getModifiedUrl = () => {
    const msg = [];
    if (selected.length === 0) return msg;
    selected.forEach((select) => msg.push(`${select} -> ${document.querySelector(`#${select}`).value}`));
    return msg;
  };

  const handleRefresh = (evemt) => {
    if (selected.length === 0) {
      console.log('no selection');
    }
    const updateData = {
      username: cookies.username,
      updateUrls: selected,
    };
    axios.post(`${serverIP}/updateUrl`, updateData).then((res) => {
      console.log(res.data);
    });
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleTextField = (event) => {
    // eslint-disable-next-line prefer-destructuring
    const id = event.target.id;
    console.log(error[id]);

    if (event.target.value.length < 6 || event.target.value.length > 10) {
      setError(updateObjectKey(error, id, true));
    } else {
      setError(updateObjectKey(error, id, false));
    }
  };
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - datas.length) : 0;

  React.useEffect(() => {
    axios.get(`${serverIP}/api/shortUrls`, { params: { username: cookies.username } }).then((res) => {
      setData(res.data);
      const Dict = {};
      for (let i = 0; i < res.data.length; i += 1) {
        Dict[res.data[i].shortUrl] = false;
      }
      setError(Dict);
    });
  }, []);
  if (datas === null) return (<div>Loading</div>);
  if (datas !== null && datas.msg === 'Wrong authorization') return (<h1 style={{ textAlign: 'Center' }}>Wrong authorization</h1>);

  return (
    <Box sx={{ width: '80%', margin: 'auto' }}>
      <Box sx={{
        width: '100%', mt: 2, display: 'flex',
      }}
      >
        <DialogYesNo btnName="Delete" title="Delete WARNING!!!" msgs={selected.length === 0 ? () => ['you must select aleast one'] : () => [`${selected}`]} handle={handleDelete} />
        <DialogYesNo btnName="Update" title="Update WARNING!!!" msgs={selected.length === 0 ? () => ['you must select aleast one'] : getModifiedUrl} handle={handleUpdate} />
        <DialogYesNo btnName="Refresh" title="Period will extended by 30days" msgs={selected.length === 0 ? () => ['you must select aleast one'] : () => [`${selected}`]} handle={handleRefresh} />

      </Box>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer
          component={Paper}
          sx={{
            width: '100%', mx: 'auto', marginTop: '2rem', p: '1rem',
          }}
        >
          <Table sx={{ minWidth: 200 }} aria-label="simple table">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={datas.length}
            />
            <TableBody>
              {datas.slice().sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((data, index) => {
                  const isItemSelected = isSelected(data.shortUrl);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, data.shortUrl)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={data.oriUrl}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        sx={{ wordBreak: 'break-all' }}
                      >
                        {data.oriUrl}
                      </TableCell>
                      <TableCell align="right">
                        <TextField error={error[data.shortUrl]} required id={data.shortUrl} label="CustomizeURL" defaultValue={data.shortUrl} variant="standard" onChange={(handleTextField)} />
                      </TableCell>
                      <TableCell align="right">{data.clickTime}</TableCell>
                      <TableCell align="right">{new Date(Date.parse(data.lifeTime)).toLocaleString()}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={datas.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
