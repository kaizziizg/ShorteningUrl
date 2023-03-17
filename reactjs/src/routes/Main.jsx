import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Typography, Button, Box, Paper, TextField,
} from '@mui/material';
import { CopyURL, getShortenURL } from '../utils/Utils_main';
import TypingTitle from '../components/TypingTitle';

function resultTable() {
  return (
    <Box height="50%" width="80wh" display="flex" flexDirection="column" justifyContent="start" textAlign="center">
      <Container disableGutters maxWidth="md" component="main" sx={{ pt: 0, pb: 6 }}>
        <Paper
          square
          sx={{
            p: 2, display: 'flex', flexDirection: 'column', height: '100%', width: '100%',
          }}
          className="resultPaper"
          style={{ visibility: 'hidden' }}
        >

          <Typography
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Result
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.primary"
            gutterBottom
          >
            <Link
              id="shortURL"
              href="https://shorteningurl-eh4konhfta-de.a.run.app"
            // onClick={preventDefault}
              target="_blank"
            >
              https://shorteningurl-eh4konhfta-de.a.run.app
            </Link>
            <br />
            <Button
              variant="contained"
              color="primary"
              sx={{
                marginTop: '1.5rem',
              }}
              onClick={CopyURL}
            >
              Copy URL
            </Button>
            <br />
            <br />
            clickTime
            <div id="clickTime">
              0
            </div>
            <canvas id="qrcode" style={{ marginTop: '1rem' }} />
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default function Main() {
  return (
    <>
      <Box height="30%" display="flex" flexDirection="column" textAlign="center">
        <Container disableGutters maxWidth="md" component="main" sx={{ pt: 15, pb: 6 }}>
          <TypingTitle />
          <form className="URLform" noValidate autoComplete="off">
            <TextField name="url" id="url" label="input your URL here!!" fullWidth />
          </form>
          <br />
          <Button variant="contained" color="primary" onClick={getShortenURL}>
            Shortening
          </Button>
        </Container>
      </Box>
      {resultTable()}
    </>
  );
}
