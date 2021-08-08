import React from 'react';
import { useState, useEffect } from 'react';
import * as V from 'victory';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, 
    VictoryStack, VictoryZoomContainer,
    VictoryLine, VictoryLabel  } from 'victory';
import axios from 'axios';
import {
    Box,
    Input,
    HStack,
    VStack, Text,
    InputGroup, InputLeftElement, Checkbox, Wrap, Heading
  } from '@chakra-ui/react';

  const MarginDebtChart = () => {

      const [margindata, setMargindata] = useState([]);

      useEffect(async () => {
          const response = await axios.get("http://127.0.0.1:8000/data/margin");
          const data = response.data;
          setMargindata(data);
      },[])

      return (
          <Box maxW="25%">
              <VictoryChart containerComponent={<VictoryZoomContainer/>}              >
                <VictoryAxis tickCount={1} tickFormat={
                    (el) => {
                        //date to year
                        const date = new Date(el);
                        return date.getFullYear();
                    } 
                } />
                <VictoryAxis dependentAxis tickFormat={
                    (el) => ((el*100).toString()+"%")
                } />
                <VictoryLabel text="Margin Debt YOY" x="50%" y={30} textAnchor="middle"/>
                {
                    margindata && 
                    <VictoryLine data={margindata} x="date" y="debt_pct_change"/>
                }
              </VictoryChart>
          </Box>
      );
  }

  export default MarginDebtChart;