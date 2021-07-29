import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import CommoditiesDashboard from './components/CommoditiesDashboard';
import trackedTickers from './trackedTickers';
import {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
  return (
    <ChakraProvider>
      <Box>
        <CommoditiesDashboard equities={trackedTickers.uraniumTickers}
                              commodityName={"Uranium"}
                              commodityPrice={100}/>
      </Box>
    </ChakraProvider>
  );
}

export default App;
