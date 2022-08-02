import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom"
import { Paper } from '@mui/material';

function CategoryCard({ name }) {

  const [depth, setDepth] = React.useState(1)

  const onMouseOver = () => setDepth(7);
  const onMouseOut = () => setDepth(1);

  return (
    <Paper
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      elevation={depth}
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '300px',
        height: '100px',
        overflow: 'hidden',
        transition: '500ms',
        '&:hover': {
          transform: 'scale(1.05)'
        }
      }}>
      <Box
        component="img"
        sx={{
          display: 'block',
          width: '30%',
          height: '10px',
          minHeight: '100%',
          objectFit: 'cover',
        }}
        src={'https://picsum.photos/400/400'}
        alt="Live from space album cover"
      />


      <Typography p={'20px'} sx={{ flexGrow: 1 }} variant="h6" textAlign={'center'} noWrap>
        <Link style={{ textDecoration: 'inherit', color: 'inherit' }} className='vegetable_link' to="/store">
          {name}
        </Link>
      </Typography>
    </Paper>
  );
}

export default CategoryCard
