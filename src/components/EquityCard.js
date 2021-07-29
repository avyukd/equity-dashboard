import {
    ChakraProvider,
    Box,
    Text,
    Link,
    VStack,
    Code,
    Grid,
    theme,
    Heading
  } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CurrencyFormat from 'react-currency-format';

const EquityCard = props => {
    const [price, setPrice] = useState(null);
    const [mktCap, setMktCap] = useState(null);

    useEffect(async () => {
        let params = new URLSearchParams();
        params.append("ticker", props.ticker);
        const response = await axios.get("http://127.0.0.1:8000/equities/quote",
            {
                params: params
            }
        )
        console.log(response);
        setPrice(response.data.regularMarketPrice);
        setMktCap(response.data.marketCap);
    }, []);

    return (
        <Box maxW="md" borderWidth="1px" borderRadius="lg" overflow="hidden"> 
            <VStack>
                <Heading m="5" mb="0" as="h4" size="md">{props.name}</Heading>
                <Heading m="5" mb="0" as="h6" size="sm">{props.ticker}</Heading>
                <Text>
                    {price && <CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'$'} />}
                </Text>
                <Text m="5" mt="0" size="sm"> 
                    {mktCap && <CurrencyFormat value={mktCap} displayType={'text'} thousandSeparator={true} prefix={'$'} />}
                </Text>
            </VStack>
        </Box>
    );
}

export default EquityCard; 