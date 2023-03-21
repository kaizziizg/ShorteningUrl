import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import {
  Container, Typography, Button, Box, TextField,
  Tab, Tabs, Paper,
} from '@mui/material';

import axios from 'axios';
import cookie from 'cookie';
import UrlInfo from '../components/main/UrlInfo';
import { CopyURL } from '../utils/Utils_main';
import { serverIP, clog } from '../config';
import Loading from '../components/Loading';
import TypingTitle from '../components/main/TypingTitle';
import { SubTitle } from '../components/main/Titles';

function TabPanel(props) {
  const {
    children, value, index,
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
    >
      {value === index && (
        <Box sx={{ p: 3 }} display="flex" flexDirection="column" justifyContent="start" textAlign="center">
          {children}
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function resultTabs(urlInfo) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '80%', mx: 'auto' }}>
      <Paper
        square
        sx={{
          p: 2, display: 'flex', flexDirection: 'column', height: '100%', width: '100%',
        }}
        className="resultPaper"
        style={{ visibility: 'hidden', borderRadius: '1rem' }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="URL Info" />
            <Tab label="Open Graph MetaData" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <h1>
            Shorten URL
          </h1>
          <div style={{ fontSize: '2rem' }}>
            <a href={urlInfo.shortUrl} target="_blank" rel="noreferrer">{urlInfo.shortUrl}</a>
          </div>
          <br />
          <Button
            variant="contained"
            color="primary"
            sx={{
              marginTop: '1.5rem',
              width: '30%',
              margin: 'auto',
            }}
            onClick={CopyURL}
          >
            Copy URL
          </Button>
          <SubTitle title="Click Time" contentID="clickTime" data={urlInfo.clickTime} />
          <canvas id="qrcode" style={{ margin: 'auto' }} />
        </TabPanel>
        <TabPanel value={value} index={1}>

          <SubTitle title="Title" contentID="ogmTitle" data={urlInfo.ogmTitle} />
          <SubTitle title="Description" contentID="ogmDescription" data={urlInfo.ogmDescription} />
          <Typography
            variant="h5"
            component="span"
            sx={{ m: '1rem' }}
          >
            Image
          </Typography>

          <img id="ogmImage" src={urlInfo.ogmImage} alt="Open Graph MetaData" style={{ margin: 'auto', width: '50%' }} />
        </TabPanel>
      </Paper>
    </Box>
  );
}

export default function Main() {
  const [urlInfo, setUrlInfo] = React.useState(new UrlInfo());
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
    urlInfo.shortUrl = 'Process...';
    handleLoadingPopup();
    axios
      .post(`${serverIP}/shorten`, data)
      .then((response) => {
        clog(response.data);
        setUrlInfo(response.data.urlInfo);
      })
      .catch((error) => {
        clog(error);
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
      {resultTabs(urlInfo)}
    </>
  );
}
