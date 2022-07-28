import { 
    Box, Link, MenuItem, TextField, 
    Typography, Button, TableContainer, Table, 
    TableHead, TableRow, TableCell, TableBody 
} from "@mui/material";
import { useState } from "react"
import axios from 'axios'

const currencies = ["GBP","EUR", "JPY", "USD", "CNY", "BYR", "PLN", "RUB", "KRW", "UAH"]

let lastDate = new Date()
lastDate = [
    lastDate.getFullYear(), 
    (lastDate.getMonth() < 10 ? `0${lastDate.getMonth()}` : lastDate.getMonth()),
    lastDate.getDate()
].join('-')

export default function CurrencyConverter(){
    const [currencyFirst, setCurrencyFirst] = useState({count: 1, abbr: 'EUR'});
    const [currencySecond, setCurrencySecond] = useState({count: '', abbr: 'JPY'});
    const [itemTimeseries, setItemTimeseries] = useState({ abbr: 'EUR', result: []})
    console.log(itemTimeseries)

    const converter = (firstItem, secondItem) => {
        const options = {
        method: 'GET',
        url: `https://api.apilayer.com/exchangerates_data/convert?to=${secondItem.abbr}&from=${firstItem.abbr}&amount=${firstItem.count}`,
        headers: {
            "apikey": "HKOtBbZVbrfuIRZaUp60guDBr5ewiN76"
        }};
          
        axios.request(options).then(function (response) {
        const result = response.data.result
        setCurrencySecond({
            count: result, 
            abbr: `${currencySecond.abbr}`
        })
        }).catch(function (error) {
        console.error(error);
        });
    }

    const timeseries = () => {
        const options = {
        method: 'GET',
        url: `https://api.apilayer.com/exchangerates_data/${lastDate}?symbols=${currencies.join(',')}&base=${itemTimeseries.abbr}`,
        headers: {
            "apikey" : "HKOtBbZVbrfuIRZaUp60guDBr5ewiN76"
        }};
                
        axios.request(options).then(function (response) {
        let result = response.data.rates
        result = Object.entries(result)
        setItemTimeseries({
            abbr: itemTimeseries.abbr, 
            result: result
        })
        }).catch(function (error) {
        console.error(error);
        });
    }

    return(
        <>
        <Link 
        href="https://github.com/appbooster/test-assignments/blob/master/tasks/frontend.md">
        Test from: Appbooster (test-assignments)</Link>
        <Box sx={{mt: 3}}>
            <Box>
                <TextField 
                value={currencyFirst.count}
                onChange={(e) => setCurrencyFirst({
                    count: e.target.value, 
                    abbr: currencyFirst.abbr
                })}/>
                <TextField
                id="outlined-select-currency"
                select
                value={currencyFirst.abbr}
                sx={{width: '85px'}}
                onChange={(e) => setCurrencyFirst({
                    count: currencyFirst.count, 
                    abbr: e.target.value
                })}>
                {currencies.map((option) => (
                    <MenuItem
                    key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
                </TextField>
            </Box>
            <Box>
                <TextField 
                value={currencySecond.count}
                onChange={(e) => setCurrencySecond({
                    count: e.target.value, 
                    abbr: currencySecond.abbr
                })}/>
                <TextField
                id="outlined-select-currency"
                select
                value={currencySecond.abbr}
                sx={{width: '85px'}}
                onChange={(e) => setCurrencySecond({
                    count: currencySecond.count, 
                    abbr: e.target.value
                })}>
                {currencies.map((option) => (
                    <MenuItem
                    key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
                </TextField>
            </Box>
            <Button
            sx={{height: '56px', mt:2.5}}
            variant="contained"
            onClick={() => converter(currencyFirst, currencySecond)}>
                Get converter
            </Button>
        </Box>

        <Box sx={{mt: 10}}>
        <TextField
        id="outlined-select-currency"
        select
        value={itemTimeseries.abbr}
        sx={{width: '85px'}}
        onChange={(e) => {setItemTimeseries({
            abbr: e.target.value, 
            result: itemTimeseries.result
        })}}
        >
        {currencies.map((option) => (
            <MenuItem
            key={option} value={option}>
                {option}
            </MenuItem>
        ))}
        </TextField>
        <Button
        variant="contained"
        color="success"
        sx={{height: '56px', ml: 2}}
        onClick={() => {timeseries()}}>
                Get data for {itemTimeseries.abbr}
            </Button>
        </Box>

        {(itemTimeseries.result !== {}) && <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell component="th" scope="row">{lastDate}</TableCell>
                        <TableCell align="right">{itemTimeseries.abbr}</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {itemTimeseries.result.map((curr) => (
                    <TableRow  key={curr[0]}>
                        <TableCell component="th" scope="row">{curr[0]}</TableCell>
                        <TableCell align="right">{curr[1]}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>}
        </>
    )
}