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
import MiniWaterDashboard from './components/MiniWaterDashboard';
import { Route } from 'react-router-dom';
import EquityPage from './components/EquityPage';

function App() {

  const [upsideOption, setUpsideOption] = useState('Percentage');

  return (
    <ThemeContext.Provider value={
      {
        upsideOption, setUpsideOption
      }
    }>
    <ChakraProvider>
      <Route exact path="/">
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
            <MiniWaterDashboard equities={trackedTickers.waterTickers}/>
          </HStack>
          <GrowthDashboard equities={trackedTickers.growthTickers} />
        </Box>
      </Route>
      <Route path="/equity/:ticker">
        <EquityPage />
      </Route>
    </ChakraProvider>
    </ThemeContext.Provider>
  );
}

export default App;
