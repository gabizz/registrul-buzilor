import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import { AppContextWrapper, useAppContext } from "../src/appContext"
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers'
import moment from 'moment';
import MomentUtils from "@date-io/moment";
import "moment/locale/ro"


moment.locale("ro")


// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterMoment} utils={MomentUtils} adapterLocale={"ro"}>
    <AppContextWrapper value = {{
      state: {jud:0, loc:0, e7:0, tip: 1}, 
      b64: null,
      print: null,
      tabIndex: 0, 
      msg: null,
      notify: null,
      anchorEl: null
    }}>
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps}  />
      </ThemeProvider>
    </CacheProvider>
    </AppContextWrapper>
    </LocalizationProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};