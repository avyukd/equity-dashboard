import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme, Wrap, HStack
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
import GeneralDashboard from './components/GeneralDashboard';
import MiniCoalDashboard from './components/MiniCoalDashboard';

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
        <GeneralDashboard />
        <CommoditiesDashboard equities={trackedTickers.uraniumTickers}
                              commodityName={"Uranium"}
                              commodityPrice={33}/>
        <UraniumChart />
        <HStack>
          <MiniCoalDashboard equities={trackedTickers.coalTickers}
                              commodityPrice={70}
          />
        </HStack>
        <GrowthDashboard equities={trackedTickers.growthTickers} />
      </Box>
    </ChakraProvider>
    </ThemeContext.Provider>
  );
}

export default App;
