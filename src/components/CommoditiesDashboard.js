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
    Input, InputLeftElement, InputGroup, Center
  } from '@chakra-ui/react';
import EquityCard from './EquityCard';
import { useState } from 'react';

const CommoditiesDashboard = props => {

    const [commodityPrice, setCommodityPrice] = useState(props.commodityPrice);

    const handleCommodityPriceChange = event => {
        setCommodityPrice(event.target.value);
        console.log(event.target.value);
    }

    return (
        <Box m="5">
            <VStack>
                <Heading as="h4" size="md">{props.commodityName}</Heading>
                <HStack>
                    <InputGroup>
                        <InputGroup size="md" maxW="33%" m="1">
                            <InputLeftElement
                                pointerEvents="none"
                                color="gray.300"
                                fontSize="1.2em"
                                children="$"
                            />
                            <Input placeholder={props.commodityName + " Price"} onBlur={handleCommodityPriceChange}/>
                        </InputGroup>
                        <InputGroup size="md" maxW="33%" m="1">
                            <Input placeholder={"P/NAV Multiple"}/>
                        </InputGroup>
                        <InputGroup size="md" maxW="33%" m="1">
                            <InputLeftElement
                                pointerEvents="none"
                                color="gray.300"
                                fontSize="1.2em"
                                children="%"
                            />
                            <Input placeholder={"Discount Rate"}/>
                        </InputGroup>
                    </InputGroup>
                </HStack>
                <HStack>
                    {props.equities.map(equity => {
                        return (
                            <EquityCard ticker={equity.ticker} 
                                name={equity.name}
                                commodityPrice={commodityPrice}
                                commodityName={props.commodityName}
                            />
                        );
                    })}
                </HStack>
            </VStack>
        </Box>
    );

}

export default CommoditiesDashboard;