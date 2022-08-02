import { Box, Button, Container, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ProductCard from '../components/Products/ProductCard'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function Products({ products, title }) {

    const navigate = useNavigate()
    const theme = useTheme()
    const isMobileView = useMediaQuery(theme.breakpoints.down("sm")) //mediaquery

    return (
        <Container name="products" height="100%" sx={{ marginY: 2 }} >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant={isMobileView ? 'h5' : 'h3'}>{title}</Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    endIcon={<ArrowBackIosNewIcon />}
                    onClick={() => navigate('/store')}
                    sx={{ height: 'fit-content' }}
                >
                    رجوع
                </Button>
            </Box>

            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                gap: theme.spacing(2),
                paddingY: theme.spacing(5),
            }}>

                {products.map((product) => { return <ProductCard key={product.ItemID} {...product} /> })}



            </Box>
        </Container>
    )

}

export default Products
