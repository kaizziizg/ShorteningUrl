import * as React from 'react';
import axios from 'axios';
import cookie from 'cookie';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { serverIP } from '../config';

const Item = styled(Paper)(() => ({
  textAlign: 'center',
  height: '18rem',
  lineHeight: '1rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '80%',
  margin: 'auto',
  marginTop: '1rem',
}
));

export default function Management() {
  const [datas, setData] = React.useState(null);

  React.useEffect(() => {
    const cookies = cookie.parse(document.cookie);
    axios.get(`${serverIP}/api/shortUrls`, { params: { username: cookies.username } }).then((res) => {
      setData(res.data);
    });
  }, []);
  if (datas === null) return (<div>Loading</div>);
  if (datas !== null && datas.msg === 'Wrong authorization') return (<h1 style={{ textAlign: 'Center' }}>Wrong authorization</h1>);
  return (
    <
    >
      {datas.map((data) => (
        <Item key={data.id} elevation={5}>
          <b>origin Url</b>
          <p>
            {data.oriUrl}
          </p>
          <b>shortening Url</b>
          <p>
            {data.shortUrl}
          </p>
          <b>clickTime</b>
          <h2>
            {data.clickTime}
          </h2>
          <b>Expiration date</b>
          <h2>
            {data.lifeTime}
          </h2>
        </Item>
      ))}
    </>
  );
}
