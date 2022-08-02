import {
    Box,
    Button,
    Container,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { useState } from "react";

export default function Signup(props) {

    const theme = useTheme();
    // const save = save();
    const [data, setData] = useState("");
    const handleChange = ({ id, value }) => { setData({ ...data, [id]: value }) };

    const inputField = (id, label, type, required, autoComplete) => {
        return (
            <TextField
                id={id}
                label={label}
                variant="outlined"
                type={type}
                autoComplete={autoComplete || ''}
                required={required}
                margin="dense"
                onChange={({ target }) => handleChange(target)

                }
            />
        );
    };

    const handleSubmit = async () => {

        console.log(data)

        await axios.post('user/register', data)
            .then((res) => {
                console.log(res);
            })
    }

    return (
        <>
            <Container component={"main"} sx={{ marginY: 2 }}>
                <Typography variant="h3" sx={{ mb: theme.spacing(3) }}>
                    إنشاء حساب جديد
                </Typography>

                <Container name={"signup form"}>
                    <form id='signup-form'>
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "space-between",
                                columnGap: theme.spacing(5),
                            }}
                        >
                            <Stack flexGrow={1}>
                                {inputField('Email', "عنوان البريد الإلكتروني", 'text', true)}
                                {inputField('username', "الاسم", 'text', true, "username")}
                                {inputField('password', "رمز الدخول", 'password', true, "new-password")}
                                {inputField('confirmPassword', "تأكيد رمز الدخول", 'password', true, "new-password")}
                                {inputField('phoneNumber', "رقم الهاتف", 'text', true)}
                            </Stack>
                            {/* ///////////////////////////////// */}

                            <Stack flexGrow={1}>
                                {inputField(null, "المدينة")}
                                {inputField(null, "اسم المنطقة")}
                                {inputField(null, "اسم الشارع")}
                                {inputField(null, "اسم المبنى")}
                                {inputField(null, "الطابق ")}
                            </Stack>

                        </Box>
                    </form>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            color="secondary"
                            size="large"
                            type="submit"
                            form="signup-form"
                            sx={{
                                marginY: 1,
                            }}
                        >
                            تسجيل
                        </Button>
                    </Box>
                </Container>
            </Container>
        </>
    );
}
