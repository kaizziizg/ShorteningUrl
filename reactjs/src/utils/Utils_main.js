// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
import QRCode from 'qrcode';

const CopyURL = () => {
  navigator.clipboard.writeText(document.querySelector('#shortURL').text);
};

const QRCodeGen = (url) => {
  QRCode.toCanvas(document.getElementById('qrcode'), url, (error) => {
    if (error) console.error(error);
    console.log('success!');
  });
};

export { CopyURL, QRCodeGen };
