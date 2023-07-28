import { useState } from "react";
import dayjs from "dayjs";
import axios from 'axios'
import Form from "./components/Form";
import DisplayArea from "./components/DisplayArea";
import './App.css'
import { Alert, Box, Snackbar, Typography } from "@mui/material";
import Loader from "./common/Loader";


function App() {
	const [message, setMessage] = useState({
		type: 'success',
		open: false,
		text: ''
	})
	
	const messageHandler = (type, open, text) =>{
		setMessage({
			type,
			open,
			text
		})
	}
	
	const [isStockDataLoading, setStockDataLoading] = useState(false)
	const [stockData, setStockData] = useState({
		open: 0,
		close: 0,
		volume: 0,
		high: 0,
		low: 0
	})
	const [submitedData, setSubmitedData] = useState(null)
	
	const [formState, setDateFormState] = useState({
		stockSymbol: '',
		date: null
	})

	const formStateChangeHandler = (e, name) => {
		setDateFormState({
			...formState,
			[name]: name === 'date' ? dayjs(e).valueOf()  : e.target.value
		})
	}

	const submitHandler = async (e) => {
		try {
			if(formState.stockSymbol.length === 0 || formState.date === null){
				messageHandler('error', true, 'Please enter all the data in form')
				return
			}

			setStockDataLoading(true)
			const res = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}fetchStockData`, {
				data: formState
			})

			if(res){
				setStockData({
					open: res.data.open,
					volume: res.data.volume,
					high: res.data.high,
					low: res.data.low,
					close: res.data.close,
				})
				setStockDataLoading(false)
				setSubmitedData(formState)
				setDateFormState({
					stockSymbol: '',
					date: null
				})

				messageHandler('success', true, 'Data fetched successfully')
			}


		} catch (error) {
			setStockDataLoading(false)
			messageHandler('error', true, 'Error occured while fetching data')
		}
	}

	const snackbarCloseHandler = () =>{
		messageHandler('success', false, '')
	}

	return (
		<Box sx={{height: '100vh', display: "flex", flexDirection: 'column', alignItems: 'center', gap: '.5rem'}}>
			<Typography variant='h2' fontWeight='bold'>
				Stock Analyser
			</Typography>

			<div className="container">
				<Form isSubmitting={isStockDataLoading} formStateChangeHandler={formStateChangeHandler} formState={formState} submitHandler={submitHandler}/>

				{isStockDataLoading ? <Loader isLoading={isStockDataLoading} className="loader" /> : (!!submitedData && <DisplayArea formState={submitedData} stockData={stockData} />)} 
			</div>
			<Snackbar 
				open={message.open}
				autoHideDuration={6000}
				onClose={snackbarCloseHandler}
			>
				<Alert onClose={snackbarCloseHandler} severity={message.type}> {message.text} </Alert>
			</Snackbar>
		</Box>
	);
}

export default App;