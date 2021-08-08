import {VStack, HStack, Wrap, Box, Heading} from '@chakra-ui/react';
import ShillerPEChart from './ShillerPEChart';
import FearGreedIndex from './FearGreedIndex';
import IndexData from './IndexData';

const GeneralDashboard = () => {
    return (                
        <Box>
            <VStack>
                <Heading as="h4" size="md">{"General"}</Heading>
                <HStack spacing="10">
                    <ShillerPEChart />
                    <FearGreedIndex />
                    <IndexData />
                </HStack>
            </VStack>
        </Box>
    )
}

export default GeneralDashboard;