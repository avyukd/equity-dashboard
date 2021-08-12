import { useParams } from "react-router";


const EquityPage = () => {
    const params = useParams();
    const ticker = params.ticker;

    return (
        <p>
            {ticker}
        </p>
    )
}

export default EquityPage;