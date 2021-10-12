import { Flex, Text, HStack, Button, Image, useBreakpointValue } from '@chakra-ui/react';
import Link from 'next/link'
import BasicDrawer from '../BasicDrawer';


export default function Header() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })
  return (
    <Flex bg='blue.200' maxWidth='100vw' h='14' justify='center'>
      <Flex w='90vw' maxHeight='100%' justify='space-between' align='center' >
        <Button variant='unstyled'>
          <Link href='/' passHref>
            <Image
              boxSize={['5', '10']}
              src="/logo.png"
              alt="Eduardo Rerick Logo"
            />
          </Link>
        </Button>

        {isWideVersion ? (
          <HStack spacing={['0', '10']}>
            <Button colorScheme="gray" variant="ghost">
              <Link href='/' passHref>
                <Text fontSize='xl'>Home</Text>
              </Link>
            </Button>
            <Button colorScheme="gray" variant="ghost">
              <Link href='/playlists' passHref>
                <Text fontSize='xl'>Playlists</Text>
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