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

const INITIAL_DATA = {
  dt: moment().format("YYYY-MM-DD"),
  jud: 0,
  loc: 0,
  r1: 1, //tip persoana, juridica=true, fizica-false
  r2: "", //nume
  r21: 1, //nr persoane
  r3: "", //cnp/cui
  r4: "", //adresa
  r5: "", //telefon
  r6: "", //email
  r7: "", // PJ ONLY! caen
  r8: "", // PJ ONLY! descriere activitate soc.
  r9: 0, // PJ ONLY! aut.contr.?
  r10: "", // PJ ONLY! nr. aut.contr.
 
  r111: "", // capacitate,
  
  r12: 0, //sursa de apa
  r121: 0,
  r122: 0,
  r13: "", //descriere sistem evacuare
  r14: "", //descriere mod epurare
  r15: "", //desc. monitorizare descarcare ape uzate,
  r161: "", //contact nr
  r162: "", //contract dt



}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterMoment} utils={MomentUtils} locale={"ro"}>
    <AppContextWrapper value = {{state: INITIAL_DATA ,  print: null, msg: null  }}>
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