import { Typography, TextField, Container, Stack, useTheme, Divider, Paper } from '@mui/material'
import React from 'react'
import { } from '@mui/material';

const inputField = (id, label, value) => {
   return <TextField
      variant='outlined'
      label={label}
      value={value}
      onChange={null}
      margin="normal"
      disabled
   />
}
function Profile() {
   const theme = useTheme()

   return (

      <>
         <Container component={'main'}>
            <Typography variant="h5" paddingY={theme.spacing(2)} >

               معلومات عن الحساب
            </Typography>
            <Divider />
            <Paper sx={{ padding: theme.spacing(3), marginY: theme.spacing(3), }}>
               <Container
                  sx={{
                     display: 'flex',
                     flexWrap: 'wrap',
                     columnGap: 10,
                     rowGap: 3,

                  }}>


                  <Stack flexGrow={1}  >
                     personal info
                     {inputField('username', 'username', 'user 1')}
                     {inputField('phoneNumber', 'phone number', '71-234567')}
                  </Stack>
                  <Stack flexGrow={1} >
                     address info
                     {inputField('address-city', 'City', 'Tripoli')}
                     {inputField('address-area', 'Area', 'abu-samra')}
                     {inputField('address-street', 'Street', 'manar')}
                     {inputField('address-building', 'Building', 'plaza center')}
                     {inputField('address-floor', 'Floor', '2')}
                  </Stack>


               </Container>
            </Paper>
         </Container>
      </>
   );
}

export default Profile