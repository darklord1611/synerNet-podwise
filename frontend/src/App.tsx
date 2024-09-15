import './assets/css/App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import {} from 'react-router-dom';
import AuthLayout from './layouts/auth';
import DashboardLayout from './layouts/dashboard';
import RTLLayout from './layouts/rtl';
import {
  ChakraProvider,
  // extendTheme
} from '@chakra-ui/react';
import initialTheme from './theme/theme'; //  { themeGreen }
import { useState } from 'react';
import Collections from 'views/dashboard/collections';
import { SupabaseProvider } from 'contexts/SupabaseContext';
// Chakra imports

export default function Main() {
  // eslint-disable-next-line
  const [currentTheme, setCurrentTheme] = useState(initialTheme);
  return (
    <ChakraProvider theme={currentTheme}>
      <SupabaseProvider>
      <Routes>
        <Route path="auth/*" element={<AuthLayout />} />
        <Route
          path="dashboard/*"
          element={
            <DashboardLayout theme={currentTheme} setTheme={setCurrentTheme} />
          }
          />
        {/* <Route
          path="rtl/*"
          element={
            <RTLLayout theme={currentTheme} setTheme={setCurrentTheme} />
          }
        /> */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      </SupabaseProvider>
    </ChakraProvider>
  );
}
