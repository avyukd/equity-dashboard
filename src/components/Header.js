import React from "react";
import {
  Box,
  Stack,
  Heading,
  Flex,
  Text,
  Button,
  useDisclosure
} from "@chakra-ui/react";
import { Select } from "@chakra-ui/react"
import { useState, useContext } from "react";
import ThemeContext from '../context/theme-context';
import SearchModal from "./SearchModal";
const Header = (props) => {

    const ctx = useContext(ThemeContext);
    const handleUpsideOptionChange = event => {
      ctx.setUpsideOption(event.target.value);
    };


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
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={"tighter"}>
              Investing Dashboard
          </Heading> 
        </Flex>
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
      </Flex>
    );
  };
  
  export default Header;
  