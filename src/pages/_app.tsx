import '@mantine/core/styles.css';
import { type AppType } from "next/dist/shared/lib/utils";
import { MantineProvider, createTheme } from '@mantine/core';
import Router from 'next/router'
import { useEffect } from 'react';
import { nprogress, NavigationProgress } from '@mantine/nprogress';

import "~/styles/globals.css";
import '@mantine/nprogress/styles.css';

const theme = createTheme({

});

const MyApp: AppType = ({ Component, pageProps }) => {

  useEffect(() => {
    Router.events.on("routeChangeStart", () => {
      nprogress.start()
    })
    Router.events.on("routeChangeComplete", () => {
      nprogress.complete()
    })
    Router.events.on("routeChangeError", () => {
      nprogress.complete()
    })
  }, [Router])

  return (
    <MantineProvider theme={theme}>
      <NavigationProgress color="cyan" />
      <Component {...pageProps} />
    </MantineProvider>
  )
};

export default MyApp;
