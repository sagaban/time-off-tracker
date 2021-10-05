import Head from 'next/head';
import NavBar from '../NavBar';
// import Footer from './footer'

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>Time off tracker</title>
        <meta name="description" content="Time off tracker next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className="container mx-auto prose">{children}</main>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
