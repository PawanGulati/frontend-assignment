import { Button, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default function Form({
    formStateChangeHandler,
    formState,
    submitHandler,
	isSubmitting
}){
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}> 
				<DemoContainer components={['DatePicker']}>
					
					<TextField  
						label="Stock Symbol" 
						variant="outlined" 
						onChange={(e) => formStateChangeHandler(e, 'stockSymbol')} 
						value={formState.stockSymbol}
					/>

					<DatePicker 
						shouldDisableDate={day => {
							return dayjs(day).toDate().getDate() >= new Date(Date.now()).getDate()
						}}
						value={dayjs(formState.date)} onChange={(e) => formStateChangeHandler(e, 'date')}  />

					<Button disabled={isSubmitting} onClick={submitHandler} variant='contained'>
							Submit
					</Button>
				</DemoContainer>
			</LocalizationProvider>
    )
}