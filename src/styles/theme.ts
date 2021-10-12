import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    brand: {
      'darkblue':'#496A81',
      'chocolate': '#0F1108',
      'green': '#0CCA4A',
      'blue': '#6EFAFB',
      }
    },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
  styles: {
    global: {
      body: {
        fontSize:'sm',
        bg: 'gray.300',
        color: 'brand.chocolate'
      }
    }
  }
})