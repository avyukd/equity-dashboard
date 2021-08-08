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
import GrowthDashboard from './components/GrowthDashboard';
import trackedTickers from './trackedTickers';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Header from './components/Header';
import ThemeContext from './context/theme-context';
import UraniumChart from './components/UraniumChart';
import ShillerPEChart from './components/ShillerPEChart';

function App() {

  const [upsideOption, setUpsideOption] = useState('Percentage');

  return (
    <ThemeContext.Provider value={
      {
        upsideOption, setUpsideOption
      }
    }>
    <ChakraProvider>
      <Header />
      <Box>
        <ShillerPEChart />
        <CommoditiesDashboard equities={trackedTickers.uraniumTickers}
                              commodityName={"Uranium"}
                              commodityPrice={33}/>
        <UraniumChart />
        <GrowthDashboard equities={trackedTickers.growthTickers} />
      </Box>
    </ChakraProvider>
    </ThemeContext.Provider>
  );
}

export default App;
