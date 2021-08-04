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

const Header = (props) => {
    const [selectedUpsideOption, setSelectedUpsideOption] = useState("Multiplier");

    const handleUpsideOptionChange = event => {
        console.log(event.target.value);
      setSelectedUpsideOption(event.target.value);
    };


    return (
    <ThemeContext.Provider value={
        {
            upsideOption: "Multiplier"
        }
    }>
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
          <Select color="black" onChange={handleUpsideOptionChange}>
            <option>Percentage</option>
            <option>Multiplier</option>
            <option>Share Price</option>
          </Select>
        </Box>
      </Flex>
    </ThemeContext.Provider>
    );
  };
  
  export default Header;
  