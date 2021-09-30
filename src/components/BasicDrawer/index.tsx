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
  DrawerFooter,
  Input,
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
          <DrawerHeader>Links</DrawerHeader>

          <DrawerBody>
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}