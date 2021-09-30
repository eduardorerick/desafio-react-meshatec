import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import Header from '../components/Header'
import { ExampleProvider } from '../contexts/ExampleContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ExampleProvider>
      <ChakraProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
      </ChakraProvider>
    </ExampleProvider>
  )
}
export default MyApp
