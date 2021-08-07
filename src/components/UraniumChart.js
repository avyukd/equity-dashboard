import React from 'react';
import { useState, useEffect } from 'react';
import * as V from 'victory';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack, 
    VictoryLine, VictoryLabel  } from 'victory';
import axios from 'axios';
import {
    Box,
    Input,
    HStack,
    VStack, Text,
    InputGroup, InputLeftElement, Checkbox, Wrap, Heading
  } from '@chakra-ui/react';
const UraniumChart = () => {
    
    const projectedUtilityInventories = 113;

    const [supplyObj, setSupplyObj] = useState(null);
    const [demandObj, setDemandObj] = useState(null);
    const [deficitObj, setDeficitObj] = useState(null);
    const [demandGrowth, setDemandGrowth] = useState(0);
    const [longTermUnderfeeding, setLongTermUnderfeeding] = useState(16);
    const [paladinFlag, setPaladinFlag] = useState(false);
    const [globalFlag, setGlobalFlag] = useState(false);
    const [mcarthurFlag, setMcarthurFlag] = useState(false);
    const [projectedInventoryExpiration, setProjectedInventoryExpiration] = useState(null);

    const handleDemandGrowthChange = (e) => {
        setDemandGrowth(parseFloat(e.target.value)/100);
    };

    const handleLongTermUnderfeedingChange = (e) => {
        setLongTermUnderfeeding(parseFloat(e.target.value));
    };

    useEffect(async () => {
        const supply_response = await axios.get("http://127.0.0.1:8000/data/uranium/supply",
            { params: {long_term_underfeeding: longTermUnderfeeding,
                    paladinFlag: paladinFlag,
                    globalFlag: globalFlag,
                    mcarthurFlag: mcarthurFlag
            } });        
        let supply_arr = supply_response.data;
        setSupplyObj(supply_response.data);
        const demand_response = await axios.get("http://127.0.0.1:8000/data/uranium/demand",
            { params: { growth_rate: demandGrowth } });

        //forecasted_demand = [];
        //demand_2019 = demand_response.data[demand_response.data.length - 1].demand
        let demand_arr = demand_response.data;
        setDemandObj(demand_response.data);

        let deficit_arr = demand_arr.map(a => ({...a}))
        let currInventories = projectedUtilityInventories;
        let projYearsLasted = 0.0;
        supply_arr.forEach((el, index) => {
            el.supplyData.forEach((el2, index2) => {
                deficit_arr[index2].demand -= el2.supply;
                deficit_arr[index2].label = deficit_arr[index2].demand.toFixed(2);
                if(deficit_arr[index2].demand < 0){
                    deficit_arr[index2].demand = 0;
                    deficit_arr[index2].label = "";
                }
            })
        })
        deficit_arr.forEach((el, index) => {
            if(parseInt(el.year) > 2020){
                if(currInventories > el.demand && currInventories > 0){
                    currInventories -= el.demand;
                    projYearsLasted+=1;
                }else{
                    projYearsLasted+=currInventories/el.demand
                    currInventories = 0;
                }
            }
        })
        setProjectedInventoryExpiration(projYearsLasted);
        setDeficitObj(deficit_arr);
        console.log(deficit_arr)
    },[demandGrowth, longTermUnderfeeding, paladinFlag, globalFlag, mcarthurFlag]);

    return (
        <Box maxW="60%">
            <HStack>
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
                        supplyObj.map((el, index) => (
                            <VictoryBar data={el.supplyData}
                            x="year" y="supply"
                            />))
                    }
                    <VictoryBar data={deficitObj}
                        x="year" y="demand"
                        barWidth = {1}
                        labelComponent={
                            <VictoryLabel angle={45} verticalAnchor="middle" textAnchor="end"
                            style={{fontSize: 5 }}
                            />
                        }
                    />
                </VictoryStack>
            </VictoryChart>
            <VStack maxW="30%">
                    <Text>
                        Utility inventories will expire in 
                        <b> {projectedInventoryExpiration.toFixed(2)} </b> years
                    </Text>
                    <InputGroup size="md" m="1">
                        <InputLeftElement
                            pointerEvents="none"
                            color="gray.300"
                            fontSize="1.2em"
                            children="%"
                        />
                        <Input placeholder={"Demand Growth"} onBlur={handleDemandGrowthChange}/>
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents="none"
                            color="gray.300"
                            fontSize="0.75em"
                            children="Mlbs"
                        />
                        <Input placeholder={"LT Underfeeding"} onBlur={handleLongTermUnderfeedingChange}/>
                    </InputGroup>
                    <Wrap>
                        <Checkbox colorScheme="green" onChange={
                            (e) => {
                                setMcarthurFlag(e.target.checked);
                            }
                        }>
                            McArthur River (Cameco)
                        </Checkbox>
                        <Checkbox colorScheme="green" onChange={
                            (e) => {
                                setPaladinFlag(e.target.checked);
                            }
                        }>
                            Larger Heinrich (Paladin)
                        </Checkbox>
                        <Checkbox colorScheme="green" onChange={
                            (e) => {
                                setGlobalFlag(e.target.checked);
                            }
                        }>
                            Dasa (Global Atomic)
                        </Checkbox>
                    </Wrap>
            </VStack>
            </HStack>
        </Box>
    );
}

export default UraniumChart;