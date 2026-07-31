import { createBrowserRouter } from 'react-router-dom';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Home } from '@/pages/Home';
import { Products } from '@/pages/Products';
import { Contact } from '@/pages/Contact';
import { Capabilities } from '@/pages/Capabilities';
import { Sustainability } from '@/pages/Sustainability';
import { Certifications } from '@/pages/Certifications';
import { Login } from '@/pages/Login';
import { Signup } from '@/pages/Signup';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'capabilities',
        element: <Capabilities />,
      },
      {
        path: 'sustainability',
        element: <Sustainability />,
      },
      {
        path: 'certifications',
        element: <Certifications />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
    ],
  },
]);
