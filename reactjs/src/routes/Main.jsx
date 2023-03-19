import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Typography, Button, Box, Paper, TextField,
} from '@mui/material';
import axios from 'axios';
import cookie from 'cookie';
import { CopyURL, QRCodeGen } from '../utils/Utils_main';
import TypingTitle from '../components/TypingTitle';
import { serverIP } from '../config';
import Loading from '../components/Loading';

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
          </Typography>
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
          <Typography
            variant="h5"
            align="center"
            color="text.primary"
          >
            <p>clickTime</p>
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.primary"
            sx={{ mb: '1rem' }}
          >
            <div id="clickTime">
              0
            </div>
          </Typography>
          <canvas id="qrcode" style={{ margin: 'auto' }} />
          <Typography
            variant="h4"
            align="center"
            color="text.primary"
            sx={{ mt: '1rem' }}
          >
            Open Graph MetaData
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.primary"
            sx={{ m: '1rem' }}
          >
            Title
          </Typography>
          <div id="ogmTitle">
            Oops...
          </div>
          <Typography
            variant="h5"
            align="center"
            color="text.primary"
            sx={{ m: '1rem' }}
          >
            Description
          </Typography>
          <div id="ogmDescription">
            Oops...
          </div>
          <Typography
            variant="h5"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{ m: '1rem' }}
          >
            Image
          </Typography>

          <img id="ogmImage" src="" alt="Open Graph MetaData" style={{ margin: 'auto', width: '50%' }} />

        </Paper>
      </Container>
    </Box>
  );
}

export default function Main() {
  const loadingRef = React.useRef();

  const handleLoadingPopup = () => {
    loadingRef.current.handleToggle();
  };
  const handleLoadingPopdown = () => {
    loadingRef.current.handleClose();
  };
  const getShortenURL = () => {
    const cookies = cookie.parse(document.cookie);
    const data = { url: document.querySelector('#url').value, owner: cookies.username };
    document.querySelector('#shortURL').text = 'Process...';
    handleLoadingPopup();
    axios
      .post(`${serverIP}/shorten`, data)
      .then((response) => {
        console.log(response.data.clickTime);
        console.log(response.data.shortUrl);
        if (response.data.clickTime === undefined) {
          document.querySelector('#shortURL').text = 'URL is Error,Please Re-check the URL';
          document.querySelector('#clickTime').innerText = 0;
          QRCodeGen(serverIP);
        } else {
          document.querySelector('#shortURL').text = response.data.shortUrl;
          document.querySelector('#shortURL').href = response.data.shortUrl;
          document.querySelector('#clickTime').innerText = response.data.clickTime;
          document.querySelector('#ogmTitle').innerText = response.data.ogmTitle;
          document.querySelector('#ogmDescription').innerText = response.data.ogmDescription;
          document.querySelector('#ogmImage').src = response.data.ogmImage;
          QRCodeGen(response.data.shortUrl);
        }
      })
      .catch((error) => {
        console.log(error);
      }).finally(() => {
        handleLoadingPopdown();
        document.querySelector('.resultPaper').style.visibility = 'visible';
      });
  };
  return (
    <>
      <Loading ref={loadingRef} />
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
