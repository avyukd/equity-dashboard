import { Center, Heading, VStack } from "@chakra-ui/react";
import { useParams } from "react-router";
import { Box } from "victory";
import EqEditor from "./EqEditor";

const EquityPage = () => {
    const params = useParams();
    const ticker = params.ticker;

    return (
        <>
            <Center>
                <Heading>{ticker}</Heading>
            </Center>
            <EqEditor />
        </>
    )
}

export default EquityPage;