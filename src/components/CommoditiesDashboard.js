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

const CommoditiesDashboard = props => {

    const [commodityPrice, setCommodityPrice] = useState(props.commodityPrice);
    const [navMultiple, setNavMultiple] = useState(1);
    const [discountRate, setDiscountRate] = useState(0.08);

    const handleCommodityPriceChange = event => {
        setCommodityPrice(event.target.value);
    }
    const handleNavMultipleChange = event => {
        setNavMultiple(event.target.value);
    }
    const handleDiscountRateChange = event => {
        let discrate = parseFloat(event.target.value)/100.0
        setDiscountRate(discrate);
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
                            <Input placeholder={"P/NAV Multiple"} onBlur={handleNavMultipleChange}/>
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
                    </InputGroup>
                </HStack>
                <Wrap>
                    {props.equities.map(equity => {
                        return (
                            <EquityCard ticker={equity.ticker} 
                                name={equity.name}
                                commodityPrice={commodityPrice}
                                commodityName={props.commodityName}
                                navMultiple={navMultiple}
                                discountRate={discountRate}
                            />
                        );
                    })}
                </Wrap>
            </VStack>
        </Box>
    );

}

export default CommoditiesDashboard;