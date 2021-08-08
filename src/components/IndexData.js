import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Input,
    HStack,
    VStack, Text,
    InputGroup, InputLeftElement, Checkbox, Wrap, Heading
  } from '@chakra-ui/react';

const IndexData = () => {

    const [spdata, setSPData] = useState(0);
    const [nasdaqdata, setNasdaqData] = useState(0);
    const [dowdata, setDowData] = useState(0);
    const [vixdata, setVixData] = useState(0);

    useEffect(async () => {
        const response = await axios.get('http://127.0.0.1:8000/data/getindices');
        setSPData(response.data.sp500.toFixed(2));
        setNasdaqData(response.data.nasdaq.toFixed(2));
        setDowData(response.data.dow.toFixed(2));
        setVixData(response.data.vix.toFixed(2));
    }, []);

    return (
        <Box maxW="25%" borderWidth="1px"  overflow="hidden"> 
            <VStack m="5">
                <Heading as="h1" size="md">SP500: {spdata}%</Heading>
                <Heading as="h1" size="md">Dow: {dowdata}%</Heading>
                <Heading as="h1" size="md">Nasdaq: {nasdaqdata}%</Heading>
                <Heading as="h1" size="md">VIX: {vixdata}%</Heading>
            </VStack>
        </Box>
    );

}

export default IndexData;