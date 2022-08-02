import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import veg from '../img/veg.jpg'

 function ads() {
  return (
    <Card sx={{ maxWidth: 445 }}>
      <CardMedia
        component="img"
        height="140"
        image={veg}
        alt="green veg"
      />
      <CardContent sx={{backgroundColor:"white"}}>
        <Typography gutterBottom variant="h5" component="div">
          العنوان
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions sx={{backgroundColor:"white"}}>
        <Button size="small" sx={{backgroundColor:"orange",color:"black"}}>للمزيد</Button>
        <Typography sx={{ml:33}}>15-6-2022</Typography>
      </CardActions>
    </Card>
  );
}

export default ads