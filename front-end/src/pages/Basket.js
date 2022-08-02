import { Box, Button, Container, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useContext } from 'react'
import Table from '../components/Basket/Table'
import { basketCounterContext } from "../stateProviders/basketCounterProvider"

function Basket() {

    const theme = useTheme()
    const isMobileView = useMediaQuery(theme.breakpoints.down("sm")) //mediaquery
    const { state: basketData, dispatch: basketStateDispatch } = useContext(basketCounterContext)

    return (
        <Container sx={{ marginY: 2 }}>
            <Typography variant={isMobileView ? 'h5' : 'h3'}>السلة</Typography>
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                gap: theme.spacing(2),
                paddingY: theme.spacing(3),
            }}>

                <Table data={basketData} />
            </Box>
        </Container>
    )
}

export default Basket
