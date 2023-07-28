import { Stack, Typography } from "@mui/material";
import './DisplayArea.css'
import dayjs from "dayjs";

export default function DisplayArea({
    formState,
    stockData
}){

    return (
        <Stack spacing={2}>
        <Typography variant="h5" fontWeight='bold'>
            Stock Report for {formState.stockSymbol} on {dayjs(formState.date).format('DD/MM/YYYY')} :
        </Typography>
        <div className="display-container">
            <div>
                <Typography fontWeight='bold'>Open: </Typography>
                <Typography>{stockData.open}</Typography>
            </div>

            <div>
                <Typography fontWeight='bold'>Close: </Typography>
                <Typography>{stockData.close}</Typography>
            </div>

            <div>
                <Typography fontWeight='bold'>Volume: </Typography>
                <Typography>{stockData.volume}</Typography>
            </div>

            <div>
                <Typography fontWeight='bold'>Low: </Typography>
                <Typography>{stockData.low}</Typography>
            </div>

            <div>
                <Typography fontWeight='bold'>High: </Typography>
                <Typography>{stockData.high}</Typography>
            </div>
        </div>
        </Stack>
    )
}