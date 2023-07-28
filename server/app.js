// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(function (req, res, next) {
    const allowedOrigins = ['http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.enable('trust proxy');

app.post('/api/fetchStockData', async (req, res) => {
    try {
        console.log(req.body);
        const {
            stockSymbol,
            date
        } = req.body.data

        const stockDateTimeStamp = new Date(date)
        let stockDate = ''
        stockDate += stockDateTimeStamp.getFullYear() + '-'
        stockDate += (stockDateTimeStamp.getMonth() + 1).toString().padStart(2, '0') + '-'
        stockDate += stockDateTimeStamp.getDate().toString().padStart(2, '0')


        const stockDataRes = await axios.get(`${process.env.POLYGON_API_URL}${stockSymbol}/${stockDate}`, {
            params: {
                'apiKey': process.env.POLYGON_API_KEY
            }
        })
        
        let stockData = {};

        ['open', 'high', 'low', 'close', 'volume'].forEach( e => {
            stockData = {
                ...stockData,
                [e]: stockDataRes.data[e]
            }
        })

        return res.status(200).json({...stockData})

    } catch (error) {
        console.log(error);
        return res.status(error?.response?.status || 404).json({
            message: error?.response?.data?.message || error?.message || 'something went wrong'
        })
    }

    res.sendStatus(200);
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));