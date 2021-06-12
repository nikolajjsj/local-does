import '../styles/globals.css';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <div suppressHydrationWarning>
        { process.browser && <Component {...pageProps} /> }
      </div>
    </>
  );
}

export default MyApp;
