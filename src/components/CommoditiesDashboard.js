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
    Input, InputLeftElement, InputGroup
  } from '@chakra-ui/react';
import EquityCard from './EquityCard';

const CommoditiesDashboard = props => {
    return (
        <Box m="5">
            <VStack>
                <Heading as="h4" size="md">{props.commodityName}</Heading>
                <InputGroup size="md" maxW="25%">
                    <InputLeftElement
                        pointerEvents="none"
                        color="gray.300"
                        fontSize="1.2em"
                        children="$"
                    />
                    <Input placeholder={props.commodityName + " Price"}/>
                </InputGroup>
                <HStack>
                    {props.equities.map(equity => {
                        return (
                            <EquityCard ticker={equity.ticker} 
                                name={equity.name}
                                commodityPrice={props.commodityPrice}
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