import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure, IconButton , Button, Input,
    Text, HStack, VStack, Box
  } from "@chakra-ui/react"

  import { ArrowRightIcon } from '@chakra-ui/icons'

  import { useRef, useState } from "react"
import axios from "axios";

const Sidebar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();

    const [watchlist, setWatchlist] = useState([]);

    const handleSidebarOpen = async () => {
        onOpen();
        const response = await axios.get("http://127.0.0.1:8000/watchlist/", {
            params : {
                "limit" : 100
            }
        })
        setWatchlist(response.data);
    }

    return (
        <>
      <IconButton ref={btnRef} icon={<ArrowRightIcon />} onClick={handleSidebarOpen} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Watchlist</DrawerHeader>

          <DrawerBody>
            <VStack>
            {
                watchlist && watchlist.map((item, index) => {
                    return (
                        <Box key={index}>
                            <Text><b>{item.ticker}</b>: {item.name}</Text>
                        </Box>
                    )
                })
            }
            </VStack>
          </DrawerBody>

        </DrawerContent>
      </Drawer>
    </>
    )
}

export default Sidebar;