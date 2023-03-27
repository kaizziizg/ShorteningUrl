// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
import QRCode from 'qrcode';

const CopyURL = (urlInfo) => {
  navigator.clipboard.writeText(urlInfo.shortUrl);
};

const QRCodeGen = (url) => {
  QRCode.toCanvas(document.getElementById('qrcode'), url, (error) => {
    if (error) console.error(error);
  });
};

export { CopyURL, QRCodeGen };
