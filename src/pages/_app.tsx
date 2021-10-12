import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import Header from '../components/Header'
import { PlaylistProvider } from '../contexts/PlaylistContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlaylistProvider>
      <ChakraProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
        <ToastContainer />
      </ChakraProvider>
    </PlaylistProvider>
  )
}
export default MyApp
