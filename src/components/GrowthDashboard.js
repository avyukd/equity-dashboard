import {
    ChakraProvider,
    Box,
    Text,
    Link,
    VStack,
    Code,
    Grid,
    theme,
    Container,
    HStack, Heading, 
    Input, InputLeftElement, InputGroup, Center,
    Flex, Wrap
  } from '@chakra-ui/react';
import EquityCard from './EquityCard';
import { useState } from 'react';

const GrowthDashboard = props => {

    const [cagr, setCagr] = useState(0.20);
    const [tv, setTv] = useState(0.03);
    const [discountRate, setDiscountRate] = useState(0.08);
    const [soc, setSOC] = useState(2.5);

    const handleCAGRChange = event => {
        setCagr(parseFloat(event.target.value));
    }
    const handleTVGrowthRate = event => {
        let tvrate = parseFloat(event.target.value)/100.0
        setTv(tvrate);
    }
    const handleDiscountRateChange = event => {
        let discrate = parseFloat(event.target.value)/100.0
        setDiscountRate(discrate);
    }
    const handleSOC = event => {
        setCapexMultiplier(parseFloat(event.target.value));
    }
    return (
        <Box m="5">
            <VStack>
                <Heading as="h4" size="md">Growth</Heading>
                <HStack>
                    <InputGroup>
                        <InputGroup size="md" maxW="33%" m="1">
                            <InputLeftElement
                                pointerEvents="none"
                                color="gray.300"
                                fontSize="1.2em"
                                children="$"
                            />
                            <Input placeholder="CAGR" onBlur={handleCAGRChange}/>
                        </InputGroup>
                        <InputGroup size="md" maxW="33%" m="1">
                            <InputLeftElement
                                pointerEvents="none"
                                color="gray.300"
                                fontSize="1.2em"
                                children="%"
                            />
                            <Input placeholder={"Discount Rate"} onBlur={handleDiscountRateChange}/>
                        </InputGroup>
                        <InputGroup size="md" maxW="33%" m="1">
                            <InputLeftElement
                                pointerEvents="none"
                                color="gray.300"
                                fontSize="1.2em"
                                children="%"
                            />
                            <Input placeholder={"Terminal Growth Rate"} onBlur={handleTVGrowthRate}/>
                        </InputGroup>
                        <InputGroup size="md" maxW="33%" m="1">
                            <Input placeholder={"Speed of Convergence"} onBlur={handleSoC}/>
                        </InputGroup>
                    </InputGroup>
                </HStack>
                <Wrap>
                    {props.equities.map(equity => {
                        return (
                            <EquityCard 
                                assetType="commodities"
                                ticker={equity.ticker} 
                                name={equity.name}
                                commodityPrice={commodityPrice}
                                commodityName={props.commodityName}
                                navMultiple={navMultiple}
                                discountRate={discountRate}
                                capexMultiplier={capexMultiplier}
                            />
                        );
                    })}
                </Wrap>
            </VStack>
        </Box>
    );

}

export default CommoditiesDashboard;