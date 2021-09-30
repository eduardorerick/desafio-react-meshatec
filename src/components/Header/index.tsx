import { Flex, Box, Text, HStack, Button, Image, useBreakpointValue } from '@chakra-ui/react';
import Link from 'next/link'
import { useExampleContext } from '../../contexts/ExampleContext';
import BasicDrawer from '../BasicDrawer';


export default function Header() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })
  return (
    <Flex bg='blue.200' maxWidth='100vw' h='14' justify='center'>
      <Flex w='90vw' maxHeight='100%' justify='space-between' align='center' >
        <Image
          boxSize={['5', '10']}
          src="/logo.png"
          alt="Here is your logo"
        />
        
        {isWideVersion ? (
          <HStack spacing={['0', '10']}>
            <Button colorScheme="gray" variant="ghost">
              <Link href='/' passHref>
                <Text fontSize='xl'>Home</Text>
              </Link>
            </Button>
            <Button colorScheme="gray" variant="ghost">
              <Link href='/about' passHref>
                <Text fontSize='xl'>About</Text>
              </Link>
            </Button>
            <Button colorScheme="gray" variant="ghost">
              <Link href='/contact' passHref>
                <Text fontSize='xl'>Contact</Text>
              </Link>
            </Button>
          </HStack>
        ) : (
          <BasicDrawer />
        )}


      </Flex>
    </Flex >
  )
}