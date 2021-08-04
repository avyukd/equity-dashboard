import {
    ChakraProvider,
    Box,
    Text,
    Link,
    VStack,
    Code,
    Grid,
    theme,
    Heading,
    HStack
  } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CurrencyFormat from 'react-currency-format';

const color_from_premium = (prem) => {
    //prem obv 10% is bad
    if(prem < 0){
        if(prem > -3){
            return "green.100";
        }else if(prem > -5){
            return "green.300";
        }else{
            return "green.500"
        }
    }
    if(prem > 0){
        if(prem < 3){
            return "green.100";
        }else if(prem < 5){
            return "red.100";
        }else if(prem < 7.5){
            return "red.300";
        }else{
            return "red.500";
        }
    }
    return "gray.200";
}

const SprottCard = () => {
    useEffect(async () => {
        const [sharePrice, setSharePrice] = useState(null);
        const [totalLbs, setTotalLbs] = useState(null);
        const [premium, setPremium] = useState(null);
        const [bgColor, setBgColor] = useState("gray.200");

        if(sharePrice === null){
            let params = new URLSearchParams();
            const response = await axios.get("http://127.0.0.1:8000/sput")
            setPremium(response.data.premium);
            setTotalLbs(response.data.total_lbs);
            setSharePrice(response.data.market_price);
            setBgColor(color_from_premium(response.data.premium));
        }
    }, []);

    return (
        <Box maxW="md" borderWidth="1px" borderRadius="lg" overflow="hidden" bg={bgColor}> 
            <HStack>
                <VStack m="5">
                    <Heading as="h4" size="md">Sprott Uranium Physical Trust</Heading>
                    <Heading as="h6" size="sm">SPUT</Heading>
                    <Text size="sm">
                        {sharePrice && <CurrencyFormat value={sharePrice} displayType={'text'} thousandSeparator={true} prefix={'$'} />}
                    </Text>
                    <Text size="sm"> 
                        {totalLbs}
                    </Text>
                </VStack>
                <Box>
                    <Heading m="5" size="lg">{premium}%</Heading>
                </Box>
            </HStack>
        </Box>
    );

}

export default SprottCard;
