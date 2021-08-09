import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure, Button, Lorem, Input, InputGroup,
    HStack, Text, VStack, Box
  } from "@chakra-ui/react";
import axios from "axios";

  import {useState} from "react";

const SearchModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("Search");

    const handleSearchQueryChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = async (e) => {
        const response = await axios.get("http://127.0.0.1:8000/search", {
            params: {
                q: searchQuery
            }
        })
        setSearchResults(response.data.data);
    }

    const outsideClickHandler = (e) => {
        onOpen();
        handleSearch();
    }
    return (
    <>
        <HStack>
            <InputGroup size="md" maxW="70%" m="1" border="0px">
                <Input placeholder={searchQuery} onChange={handleSearchQueryChange} border="2px"/>
            </InputGroup>
            <Button onClick={outsideClickHandler}>Search</Button>
        </HStack>
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <HStack>
                    <InputGroup size="md" maxW="70%" m="1">
                        <Input placeholder={searchQuery} onChange={handleSearchQueryChange}/>
                    </InputGroup>
                    <Button onClick={handleSearch}>Search</Button>
                </HStack>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={5}>
                    {
                        searchResults.map((result) => {
                            return (
                                <Box>
                                    <a href={result.metadata.split("\n")[0]}>
                                        <Text>{
                                            result.metadata.split("\n")[1]
                                        }</Text>    
                                    </a>
                                </Box>
                            );
                        })
                    }
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    </>
    );
}

export default SearchModal;