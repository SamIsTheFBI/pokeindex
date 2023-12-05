import '@mantine/core/styles.css';
import { type AppType } from "next/dist/shared/lib/utils";
import { MantineProvider, createTheme } from '@mantine/core';

import "~/styles/globals.css";

const theme = createTheme({

});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <MantineProvider theme={theme}>
      <Component {...pageProps} />
    </MantineProvider>
  )
};

export default MyApp;
