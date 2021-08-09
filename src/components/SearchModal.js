import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure, Button, Lorem, Input, InputGroup,
    HStack, Text
  } from "@chakra-ui/react";
import axios from "axios";

  import {useState} from "react";

const SearchModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

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
    return (
    <>
        <Button onClick={onOpen}>Search</Button>
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <HStack>
                    <InputGroup size="md" maxW="70%" m="1">
                        <Input placeholder="Search" onChange={handleSearchQueryChange}/>
                    </InputGroup>
                    <Button onClick={handleSearch}>Submit</Button>
                </HStack>
                <ModalCloseButton />
                <ModalBody>
                    {
                        searchResults.map((result) => {
                            return (
                                <Text>{result.metadata}</Text>
                            );
                        })
                    }
                </ModalBody>
            </ModalContent>
        </Modal>
    </>
    );
}

export default SearchModal;