import axios from 'axios';
import qs from 'qs';
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
import QRCode from 'qrcode';
import cookie from 'cookie';
import { serverIP } from '../config';

const CopyURL = () => {
  navigator.clipboard.writeText(document.querySelector('#shortURL').text);
};

const QRCodeGen = (url) => {
  QRCode.toCanvas(document.getElementById('qrcode'), url, (error) => {
    if (error) console.error(error);
    console.log('success!');
  });
};

const getShortenURL = () => {
  const cookies = cookie.parse(document.cookie);
  const data = { url: document.querySelector('#url').value, owner: cookies.username };
  const qsdata = qs.stringify(data);
  document.querySelector('#shortURL').text = 'Process...';
  axios
    .post(`${serverIP}/shorten`, qsdata)
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
        QRCodeGen(response.data.shortUrl);
      }
    })
    .catch((error) => {
      console.log(error);
    }).finally(() => {
      document.querySelector('.resultPaper').style.visibility = 'visible';
    });
};

export { CopyURL, getShortenURL };
