import { Box, Button, Stack, Typography, useTheme } from "@mui/material"
import { Container } from "@mui/system"



const Home = () => {

    const theme = useTheme()

    return (
        <Container component={'main'} maxWidth={'xl'} disableGutters>

            <Box
                component={'img'}
                src={'https://images.unsplash.com/photo-1570919434644-0ebdf834cc86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80'}
                sx={{
                    width: '100vw',
                    objectFit: 'cover',
                    height: '18vh',
                    backgroundColor: '#000',
                    opacity: '40%',
                    mixBlendMode: 'multiply',
                }
                }
            />

            <Container sx={{ marginY: 2 }}>
                <Stack rowGap={5} >

                    <Box>
                        <Typography component={'h4'} variant="h4" marginY={2} >
                            تسوق من راحة بيتك بأفضل الأسعار
                        </Typography>

                        <Typography>
                            يهدف القيّمون عليها إلى تخفيف الأعباء الإقتصاديّة عن كاهل أفراد المجتمع، عبر تأمين أهم الموادّ الغذائيّة والإستهلاكيّة بأوفر الأسعار وتوصيلها إلى منازلهم.
                        </Typography>
                    </Box>

                    <Button
                        color="secondary"
                        sx={{ textAlign: 'center', width: '80%', alignSelf: 'center' }}
                        variant="contained"
                        size="large"

                    >
                        تسوق الآن
                    </Button>

                </Stack>


            </Container>
        </Container>
    )
}

export default Home