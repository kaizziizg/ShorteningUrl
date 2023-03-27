import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { useOutletContext } from 'react-router-dom';
import {
  Container, Typography, Button, Box, TextField,
  Tab, Tabs, Paper,
} from '@mui/material';

import axios from 'axios';
import cookie from 'cookie';
import UrlInfo from '../components/main/UrlInfo';
import { CopyURL } from '../utils/Utils_main';
import { serverIP, clog } from '../config';
import TypingTitle from '../components/main/TypingTitle';
import { SubTitle } from '../components/main/Titles';
import QRCode from '../components/QRCode';

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
            <a href={urlInfo.shortUrl} target="_blank" rel="noreferrer" id="shortURL">{urlInfo.shortUrl}</a>
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
            onClick={() => { CopyURL(urlInfo); }}
          >
            Copy URL
          </Button>
          <SubTitle title="Click Time" contentID="clickTime" data={urlInfo.clickTime} />
          <QRCode url={urlInfo.shortUrl} />
          <SubTitle title="ShortenURL Owner" contentID="clickTime" data={urlInfo.owner} />
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
  const [controller] = useOutletContext();
  const handleLoadingPopup = () => {
    controller.setOpenLoading(true);
  };
  const handleLoadingPopdown = () => {
    controller.setOpenLoading(false);
  };

  const getShortenURL = () => {
    if (!document.querySelector('#url').checkValidity()) {
      controller.setAlertMsg('please re-check your url');
      controller.setAlertState('error');
      controller.setOpenAlert(true);
      return;
    }
    const cookies = cookie.parse(document.cookie);
    const data = { url: document.querySelector('#url').value, owner: cookies.username };
    urlInfo.shortUrl = 'Process...';
    handleLoadingPopup();
    axios
      .post(`${serverIP}/shorten`, data)
      .then((response) => {
        clog(response.data);
        setUrlInfo(response.data.urlInfo);
        controller.setAlertMsg('successfully generated');
        controller.setAlertState('success');
        controller.setOpenAlert(true);
        document.querySelector('.resultPaper').style.visibility = 'visible';
      })
      .catch((error) => {
        clog(error);
        controller.setAlertMsg('something error happend');
        controller.setAlertState('error');
        controller.setOpenAlert(true);
      }).finally(() => {
        handleLoadingPopdown();
      });
  };
  return (
    <>
      <Box height="30%" display="flex" flexDirection="column" textAlign="center">
        <Container disableGutters maxWidth="md" component="main" sx={{ pt: 15, pb: 6 }}>
          <TypingTitle />
          <form className="URLform" noValidate autoComplete="off">
            <TextField type="url" name="url" id="url" label="input your URL here!!" fullWidth />
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
