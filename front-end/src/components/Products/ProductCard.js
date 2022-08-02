import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider, IconButton, } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import { Box } from '@mui/system';
import { basketCounterContext } from '../../stateProviders/basketCounterProvider';
import { useContext } from 'react';

const ProductCard = (props) => {

    const [quantity, setQuantity] = useState(1)
    const { dispatch: basketStateDispatch } = useContext(basketCounterContext)

    const handelQtChange = (type) => {
        const max = props.MaximumQte
        console.log(max)
        if (quantity < max && type === 'increment') return setQuantity(quantity + 1)
        if (quantity > 1 && type === 'decrement') return setQuantity(quantity - 1)
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'LBP',
    });

    const addToBasket = () => {
        const basket = JSON.parse(localStorage.getItem("basket") || "[]");
        const itemToAdd = {
            name: props.ItemName,
            weight: props.ItemWeight,
            quantity,
            price: props.SelPrice
        }
        basket.push(itemToAdd)
        localStorage.setItem("basket", JSON.stringify(basket));
        basketStateDispatch({ type: 'addItem', payload: itemToAdd })
    }

    return (
        <Card sx={{ width: 345, display: 'flex', flexDirection: 'column' }}>
            <CardMedia
                component="img"
                height="140"
                image="https://picsum.photos/600/400"
                alt="green iguana"
            />
            <CardContent sx={{ flexGrow: 1 }}>

                <Typography sx={{ flexGrow: 1 }} gutterBottom variant="h5" noWrap component="div">
                    {props.ItemName}
                </Typography>

                <Typography fontSize={'0.9em'} variant="h6" component="span" color="secondary">الوزن \ القياس: </Typography>
                <Typography fontSize={'0.9em'} component="span">{props.ItemWeight}</Typography>
                <br />

                <Typography fontSize={'0.9em'} component="span" variant="h6" color="secondary">صنع: </Typography>
                <Typography fontSize={'0.9em'} component="span">{props.MarqueName}</Typography>

                <Divider sx={{ padding: '10px' }} />

                <Typography component="span" variant="h6" color="secondary">السعر: </Typography>
                <Typography component="span" fontWeight={700}>{formatter.format(props.SelPrice * quantity)}</Typography>

            </CardContent>

            <CardActions sx={{ justifyContent: 'space-between', padding: '16px' }}>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography>الكمية:</Typography>
                    <IconButton onClick={() => handelQtChange("increment")}><KeyboardArrowUpIcon /></IconButton>
                    <Typography
                        size='small'
                        sx={{
                            textAlign: 'center'
                        }}
                    >{quantity}</Typography>
                    <IconButton onClick={() => handelQtChange("decrement")} ><KeyboardArrowDownIcon /></IconButton>
                </Box>

                <Button size='large' variant="contained" disableElevation color="secondary" onClick={addToBasket} >اضافة الى السلة</Button>
            </CardActions>
        </Card>
    );
}

export default ProductCard