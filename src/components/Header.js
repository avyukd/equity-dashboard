import React from "react";
import {
  Box,
  Stack,
  Heading,
  Flex,
  Text,
  Button,
  useDisclosure, HStack,
  IconButton, Icon
} from "@chakra-ui/react";
import { Select } from "@chakra-ui/react"
import { useState, useContext } from "react";
import ThemeContext from '../context/theme-context';
import SearchModal from "./SearchModal";
import Sidebar from "./Sidebar";
import { MdRefresh } from "react-icons/md";
const Header = (props) => {

    const ctx = useContext(ThemeContext);
    const handleUpsideOptionChange = event => {
      ctx.setUpsideOption(event.target.value);
    };
    const handleRefresh = event => {
      ctx.setRefreshState(true);
    }


    return (
        <Flex
          as="nav"
          align="center"
          justify="space-between"
          wrap="wrap"
          padding={6}
          bg="gray.200"
          color="black"
          {...props}
        >
          <HStack>
            <Sidebar />
            <Heading as="h1" size="lg" letterSpacing={"tighter"}>
                Investing Dashboard
            </Heading> 
          </HStack>
          <Box>
              <SearchModal />
          </Box>
          <Box>
            <Select color="black" onChange={handleUpsideOptionChange}>
              <option>Percentage</option>
              <option>Multiplier</option>
              <option>Share Price</option>
            </Select>
          </Box>
          <Box>
            <IconButton onClick={handleRefresh}
              icon={<Icon as={MdRefresh}/>}
            />
          </Box>
        </Flex>
    );
  };
  
  export default Header;
  