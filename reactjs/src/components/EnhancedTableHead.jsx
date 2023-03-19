/* eslint-disable react/prop-types */
import React from 'react';
import {
  TableHead, TableRow, TableCell, Checkbox, TableSortLabel,
} from '@mui/material';

const headCells = [
  {
    id: 'oriUrl',
    numeric: false,
    disablePadding: true,
    label: 'Origin URL',
    width: '55%',
    align: 'left',
    minWidth: '100px',
  },
  {
    id: 'shortUrl',
    numeric: false,
    disablePadding: false,
    label: 'ShortenURL',
    width: '15%',
    align: 'right',
    minWidth: '50px',
  },
  {
    id: 'clickTime',
    numeric: true,
    disablePadding: false,
    label: 'ClickTime',
    width: '10%',
    align: 'right',
    minWidth: '50px',
  },
  {
    id: 'lifeTime',
    numeric: false,
    disablePadding: false,
    label: 'ValidityPeriod',
    width: '15%',
    align: 'right',
    minWidth: '50px',
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all URL',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              width: headCell.width, maxWidth: '55%', minWidth: headCell.minWidth, textAlign: headCell.align,
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}

            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead;
