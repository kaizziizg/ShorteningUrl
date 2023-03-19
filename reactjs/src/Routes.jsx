import * as React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './error-page';
import Root from './routes/Root';
import Main from './routes/Main';
import Support from './routes/Support';
import SignIn from './routes/SignIn';
import SignUp from './routes/SignUp';
import Management from './routes/Management';
import Logout from './routes/Logout';

const router = createHashRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: '/Main',
        element: <Main />,
      }, {
        path: '/Support',
        element: <Support />,
      },
      {
        path: '/SignIn',
        element: <SignIn />,
      },
      {
        path: '/SignUp',
        element: <SignUp />,
      },
      {
        path: '/Management',
        element: <Management />,
      },
      {
        path: '/Logout',
        element: <Logout />,
      },
    ],
  },
]);

export default function Routes() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
