import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure, IconButton , Button, Input,
    Text, HStack, VStack, Box, InputGroup
  } from "@chakra-ui/react"

  import { ArrowRightIcon, AddIcon, CloseIcon } from '@chakra-ui/icons'

  import { useRef, useState } from "react"
import axios from "axios";

const Sidebar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();

    const [watchlist, setWatchlist] = useState([]);

    const [formTicker, setFormTicker] = useState('Ticker');
    const [formName, setFormName] = useState('Name');

    const handleSidebarOpen = async () => {
        onOpen();
        getWatchlist();
    }

    const getWatchlist = async () => {
        const response = await axios.get("http://127.0.0.1:8000/watchlist/", {
            params : {
                "limit" : 100
            }
        })
        setWatchlist(response.data);
    }

    const handleWatchlistAdd = async () => {
        if(formTicker !== '' && formName !== '' && 
            formTicker !== 'Ticker' && formName !== 'Name'){
            await axios.post("http://127.0.0.1:8000/watchlist/", {
                "ticker" : formTicker,
                "name" : formName
            });
            await getWatchlist();
            setFormTicker('Ticker');
            setFormName('Name');
        }
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
                            <HStack>
                                <IconButton size="xs" rounded="100%" icon={<CloseIcon />}/>
                                <Text><b>{item.ticker}</b>: {item.name}</Text>
                            </HStack>
                        </Box>
                    )
                })
            }
            <InputGroup>
                <Input placeholder={formTicker} maxW="30%" mr={2} onChange={
                    (e) => {
                        setFormTicker(e.target.value);
                    }
                }/>
                <Input placeholder={formName} maxW="70%" onChange={
                    (e) => {
                        setFormName(e.target.value);
                    }
                }/>
            </InputGroup>
            <IconButton icon={<AddIcon />} rounded="100%" onClick={handleWatchlistAdd}/>
            </VStack>
          </DrawerBody>

        </DrawerContent>
      </Drawer>
    </>
    )
}

export default Sidebar;