import React from 'react';
import Link from 'next/link';
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  HStack,
  Text
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons'

export default function BasicDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        <HamburgerIcon />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Pages</DrawerHeader>

          <DrawerBody>
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}