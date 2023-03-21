import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { QRCodeGen } from '../utils/Utils_main';

function QRCode(props) {
  const {
    url,
  } = props;
  React.useEffect(() => {
    if (!(url === 'This URL doesnt work' || url === '')) {
      QRCodeGen(url);
    }
  }, [props]);

  return (
    <canvas id="qrcode" style={{ marginTop: '1rem', marginInline: 'auto' }} />
  );
}
QRCode.propTypes = {
  url: PropTypes.string.isRequired,
};

export default QRCode;
