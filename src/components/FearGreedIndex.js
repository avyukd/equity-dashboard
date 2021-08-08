import axios from "axios";
import { useState, useEffect } from "react";
import {  Box, Image  } from '@chakra-ui/react'


const FearGreedIndex = () => {
    const [imgUrl, setImgUrl] = useState("");

    useEffect(async () => {
        const response = await axios.get("http://127.0.0.1:8000/data/feargreed")
        setImgUrl(response.data.url);
    }, [])

    return (
        <Box maxW="25%">
            <Image src={imgUrl} alt="Fear and Greed Index" />
        </Box>
    )
}

export default FearGreedIndex;