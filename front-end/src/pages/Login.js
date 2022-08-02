import { Box, Button, Container, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import TextField from "@mui/material/TextField";
import { flexbox } from "@mui/system";
import React from "react";
import { useState } from "react";
import axios from 'axios'

function Login(props) {
    const [username, setName] = useState('');
    const [password, setPassword] = useState('');

    const theme = useTheme()

    const isMobileView = useMediaQuery(theme.breakpoints.down('sm'))

    const submit = async () => {
        let data = {
            username: username,
            password: password
        };
        await axios.post(`http://localhost:3000/api/v1/user/login`, data)
            .then((res) => {
                console.log('get request');
                console.log(res)
            })
    }


    return (
        <Container sx={{ height: "100vh", paddingY: 2, display: "flex", flexDirection: "column" }}>
            <Typography variant="h3">تسجيل دخول</Typography>

            <Stack
                sx={{
                    justifyContent: "center",
                    alignSelf: "center",

                    width: isMobileView ? '90%' : '50%',
                    height: "100%",
                    gap: 1,
                    alignItems: "center",
                }}
            >
                <form id='login-form'>
                    <TextField
                        fullWidth
                        autoComplete="username"
                        label="عنوان البريد الإلكتروني"
                        variant="outlined"
                        size="small"
                        type="text"
                        margin="normal"
                        onChange={(e) => { setName(e.target.value); }} // function take the value and put it in state
                    />
                    <TextField
                        fullWidth
                        autoComplete="password"
                        label="رمز الدخول"
                        variant="outlined"
                        size="small"
                        type="password"
                        margin="normal"
                        onChange={(e) => { setPassword(e.target.value) }}
                    />

                    <Button
                        type='submit'
                        form='login-form'
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={submit}
                    >
                        دخول
                    </Button>
                </form>
                <Button
                    disableRipple
                    color="secondary"
                    sx={{
                        alignSelf: "flex-end",
                    }}
                >
                    نسيت رمز الدخول؟
                </Button>
            </Stack>

        </Container>
    );
}

export default Login;
