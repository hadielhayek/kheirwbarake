import { Container, Typography, Box, useTheme, ButtonBase, Button, useMediaQuery } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import CategoryCard from '../components/Store/CategoryCard'

function Store({ categories }) {

    const navigate = useNavigate()
    const theme = useTheme()
    const isMobileView = useMediaQuery(theme.breakpoints.down("sm")) //mediaquery


    const handleNavigation = link => navigate('/store/category/' + link);


    return (
        <Container sx={{ marginY: 2 }}>
            <Typography variant={isMobileView ? 'h5' : 'h3'}>السلع المتوفرة</Typography>
            <Button label="رجوع" />
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                gap: theme.spacing(2),
                paddingY: theme.spacing(3),
            }}>
                {categories.map(category => {
                    return (
                        < ButtonBase disableRipple key={category.id} onClick={() => handleNavigation(category.slug)}>
                            <CategoryCard name={category.name} />
                        </ButtonBase>
                    )
                })
                }

            </Box>
        </Container>
    )
}

export default Store
