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
    HStack, Heading
  } from '@chakra-ui/react';
import EquityCard from './EquityCard';

const CommoditiesDashboard = props => {
    return (
        <Box>
            <HStack>
                {props.equities.map(equity => {
                    return (
                        <EquityCard ticker={equity.ticker} 
                            name={equity.name}
                            price={equity.price}
                            mcap={equity.mcap}
                        />
                    );
                })}
            </HStack>
        </Box>
    );

}

export default CommoditiesDashboard;