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

const color_from_return = (ret) => {
    if(ret > 0){
        if(ret < 50){
            return "green.100";
        }else if(ret < 100){
            return "green.300";
        }else{
            return "green.500"
        }
    }
    if(ret < 0){
        if(ret > -10){
            return "red.100";
        }else if(ret > -25){
            return "red.300";
        }else{
            return "red.500";
        }
    }
    return "gray.200";
}

const EquityCard = props => {
    const [sharePrice, setSharePrice] = useState(null);
    const [mktCap, setMktCap] = useState(null);
    const [commodityPrice, setCommodityPrice] = useState(props.commodityPrice);
    const [upside, setUpside] = useState(null);
    const [bgColor, setBgColor] = useState("gray.200");

    console.log("Equity Card received", props.commodityPrice);

    useEffect(async () => {
        let params = new URLSearchParams();
        params.append("ticker", props.ticker);
        const response = await axios.get("http://127.0.0.1:8000/equities/quote",
            {
                params: params
            }
        )
        console.log(response);
        setSharePrice(response.data.regularMarketPrice);
        setMktCap(response.data.marketCap);
    }, []);

    useEffect(async () => {
        if(mktCap !== null){
            console.log("Sending request to price at",props.commodityPrice);
            let params = new URLSearchParams();
            params.append("ticker", props.ticker);
            params.append("commodity_price", props.commodityPrice);
            const response = await axios.get(
                "http://127.0.0.1:8000/equities/valuation/"+props.commodityName,
                {
                    params: params
                }
            )
            let NAV = parseFloat(response.data.value); 
            NAV = NAV * 1000000;
            if(NAV < 0){
                NAV = 0;
            }
            let mcap = parseFloat(mktCap);
            let ret = ( (NAV/mcap) - 1.0 ) * 100.0;
            setUpside( ret.toFixed(2) );
            setBgColor(color_from_return(ret));

        }
    }, [mktCap, commodityPrice])

    return (
        <Box maxW="md" borderWidth="1px" borderRadius="lg" overflow="hidden" bg={bgColor}> 
            <HStack>
                <VStack m="5">
                    <Heading as="h4" size="md">{props.name}</Heading>
                    <Heading as="h6" size="sm">{props.ticker}</Heading>
                    <Text size="sm">
                        {sharePrice && <CurrencyFormat value={sharePrice} displayType={'text'} thousandSeparator={true} prefix={'$'} />}
                    </Text>
                    <Text size="sm"> 
                        {mktCap && <CurrencyFormat value={mktCap} displayType={'text'} thousandSeparator={true} prefix={'$'} />}
                    </Text>
                </VStack>
                <Box>
                    <Heading m="5" size="lg">{upside}%</Heading>
                </Box>
            </HStack>
        </Box>
    );
}

export default EquityCard; 