import React from 'react';
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  const [timer, setTimer] = React.useState(5);
  const msg = () => (
    <p>
      Go back to the homepage in
      {' '}
      {timer}
      {' '}
      seconds
    </p>
  );

  React.useEffect(() => {
    const id = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [timer]);
  if (timer === 0) {
    window.location.href = '/';
  }
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {msg()}
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
