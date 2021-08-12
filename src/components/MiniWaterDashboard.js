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

const MiniWaterDashboard = props => {

    const [ltscPrice, setLtscPrice] = useState(350);

    const handlePriceChange = event => {
        setLtscPrice(parseFloat(event.target.value));
    }

    return (
        <Box m="5" maxWidth="33%">
            <VStack>
                <Heading as="h4" size="md">Water</Heading>
                <Center>
                        <InputGroup size="md" maxW="75%" m="1">
                            <InputLeftElement
                                pointerEvents="none"
                                color="gray.300"
                                fontSize="1.2em"
                                children="$"
                            />
                            <Input placeholder={"LTSC Price"} onBlur={handlePriceChange}/>
                        </InputGroup>
                </Center>
                <Wrap>
                    {props.equities.map(equity => {
                        return (
                            <EquityCard 
                                assetType="commodities"
                                ticker={equity.ticker} 
                                name={equity.name}
                                commodityPrice={ltscPrice}
                                commodityName={"water"}
                                //ebitdaMultiple={ebitdaMultiple}
                            />
                        );
                    })}
                </Wrap>
            </VStack>
        </Box>
    );

}

export default MiniWaterDashboard;