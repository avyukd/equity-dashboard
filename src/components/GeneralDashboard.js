import {VStack, HStack, Wrap, Box, Heading} from '@chakra-ui/react';
import ShillerPEChart from './ShillerPEChart';
import FearGreedIndex from './FearGreedIndex';
import IndexData from './IndexData';
import MarginDebtChart from './MarginDebtChart';
const GeneralDashboard = () => {
    return (                
        <Box m="5">
            <VStack>
                <Heading as="h4" size="md">{"General"}</Heading>
                <HStack spacing="5">
                    <MarginDebtChart />
                    <ShillerPEChart />
                    <FearGreedIndex />
                    <IndexData />
                </HStack>
            </VStack>
        </Box>
    )
}

export default GeneralDashboard;