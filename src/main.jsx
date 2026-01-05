import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from "react-router/dom";
import AuthProvider from './Contexts/AuthContext/AuthProvider.jsx';

import { router } from './router/router.jsx';
import 'aos/dist/aos.css';
import Aos from 'aos';
Aos.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-urbanist max-w-6xl mx-auto'>
      <AuthProvider>
        <RouterProvider router={router} />,
      </AuthProvider>
    </div>
  </StrictMode>
)
