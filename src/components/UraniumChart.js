import React from 'react';
import { useState, useEffect } from 'react';
import * as V from 'victory';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack, 
    VictoryLine, VictoryLabel  } from 'victory';
import axios from 'axios';
import {
    Box,
  } from '@chakra-ui/react';
const UraniumChart = () => {
    
    const [supplyObj, setSupplyObj] = useState(null);
    const [demandObj, setDemandObj] = useState(null);
    useEffect(async () => {
        const supply_response = await axios.get("http://127.0.0.1:8000/data/uranium/supply");
        let supply_arr = supply_response.data;
        setSupplyObj(supply_response.data);
        const demand_response = await axios.get("http://127.0.0.1:8000/data/uranium/demand");

        //forecasted_demand = [];
        //demand_2019 = demand_response.data[demand_response.data.length - 1].demand
        
        setDemandObj(demand_response.data);
    },[])

    return (
        <Box maxW="50%">
            <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
            <VictoryLabel text="Uranium Supply/Demand" x="50%" y={30} textAnchor="middle"/>
            <VictoryAxis
               tickFormat={(el) => {return el.toString()}}
            />
            <VictoryAxis dependentAxis
            />
            {
                demandObj &&
                <VictoryLine data={demandObj} x="year" y="demand"/>
            }
            <VictoryStack colorScale={"warm"}>
                {
                    supplyObj && 
                    supplyObj.map((el, index) => (<VictoryBar data={el.supplyData}
                        x="year" y="supply" labels={el.country}
                        labelComponent={
                            <VictoryLabel angle={90} verticalAnchor="middle" textAnchor="start"
                            style={{fontSize: 5 }}
                            />
                        }
                        />))
                }
            </VictoryStack>
            </VictoryChart>
        </Box>
    );
}

export default UraniumChart;