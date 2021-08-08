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

  const ShillerPEChart = () => {

      const [shillerPEdata, setShillerPEdata] = useState([]);

      useEffect(async () => {
          const response = await axios.get("http://127.0.0.1:8000/date/cape");
          const data = response.data;
          setShillerPEdata(data);
      },[])

      return (
          <Box maxW="25%">
              <VictoryChart containerComponent={<VictoryZoomContainer/>}              >
                <VictoryAxis tickCount={10} tickFormat={
                    (el) => {
                        //date to year
                        const date = new Date(el);
                        return date.getFullYear();
                    }
                }/>
                <VictoryAxis dependentAxis/>
                <VictoryLabel text="Shiller PE" x="50%" y={30} textAnchor="middle"/>
                {
                    shillerPEdata && 
                    <VictoryLine data={shillerPEdata} x="date" y="cape"/>
                }
              </VictoryChart>
          </Box>
      );
  }

  export default ShillerPEChart;