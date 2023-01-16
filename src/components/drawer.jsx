import React from 'react';
import {
  Menu,
  MenuButton,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react'

import { HamburgerIcon } from '@chakra-ui/icons'

export default function Setting(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    return (
      <>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<HamburgerIcon />}
            onClick={onOpen}
            colorScheme='white'
            border='none'
            boxShadow='none'
          />
        </Menu>
        <Drawer colorScheme='#242627' placement={'right'} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth='1px'>Basic Drawer</DrawerHeader>
            <DrawerBody
              >
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    )
  }