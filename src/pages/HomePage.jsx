import { Box, Card, CardHeader, CardMedia } from '@mui/material'
import { Navigate, Link } from 'react-router-dom'

export default function HomePage() {
    return(
        <>
        <Box sx={{
            display: 'flex',
            width:1
        }}>
            <Link to='./CurrencyConverter'>
                <Card>
                <CardHeader title="CurrencyConverter" sx={{color:'black'}}/>
                <CardMedia
                component="img"
                height="170"
                image="./currency-exchange.jpg"
                alt="currency-exchange"
                />
                </Card>
            </Link>
        </Box>
        </>
    )
}