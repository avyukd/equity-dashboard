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

const MiniCoalDashboard = props => {

    const [commodityPrice, setCommodityPrice] = useState(props.commodityPrice);
    const [ebitdaMultiple, setEbitdaMultiple] = useState(3);

    const handleCommodityPriceChange = event => {
        setCommodityPrice(event.target.value);
    }
    const handleEbitdaMultipleChange = event => {
        setEbitdaMultiple(event.target.value);
    }

    return (
        <Box m="5" maxWidth="33%">
            <VStack>
                <Heading as="h4" size="md">Coal</Heading>
                <HStack>
                    <InputGroup>
                        <InputGroup size="md" maxW="50%" m="1">
                            <InputLeftElement
                                pointerEvents="none"
                                color="gray.300"
                                fontSize="1.2em"
                                children="$"
                            />
                            <Input placeholder={"Thermal Coal Price"} onBlur={handleCommodityPriceChange}/>
                        </InputGroup>
                        <InputGroup size="md" maxW="50%" m="1">
                            <Input placeholder={"EBITDA Multiple"} onBlur={handleEbitdaMultipleChange}/>
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
                                commodityName={"coal"}
                                ebitdaMultiple={ebitdaMultiple}
                            />
                        );
                    })}
                </Wrap>
            </VStack>
        </Box>
    );

}

export default MiniCoalDashboard;