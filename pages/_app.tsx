import '../styles/globals.css';
import 'react-datepicker/dist/react-datepicker.css';

import type { AppContext, AppInitialProps, AppProps } from 'next/app';
import Layout from '../components/Layout';
import httpAuthCheck from '@utils/httpAuthCheck';
import App from 'next/app';

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

MyApp.getInitialProps = async (appContext: AppContext): Promise<AppInitialProps> => {
  const appProps = await App.getInitialProps(appContext);

  const { req, res } = appContext.ctx;

  if (!!req && !!res) {
    httpAuthCheck(req, res);
  }

  return {
    ...appProps,
  };
};
export default MyApp;
