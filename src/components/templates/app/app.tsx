import React, { useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '@templates/app/app.theme';
import { AppRouter } from '@templates/router';
import { AppContext } from '@templates/app/app.context';
import { IUser } from '@interfaces/IUser';

export const App = () => {
  const [token, setToken] = useState<string>();
  const [user, setUser] = useState<IUser>();

  return (
    <AppContext.Provider value={{ token, setToken, user, setUser }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
    </AppContext.Provider>
  );
};
