import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react'
import imageUpload from './helper functions/uploadImage'


function EditPostModal({ formState, setFormState, submit, type }) {
    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////

    const [error, setError] = useState(false)
    const [imageError, setImageError] = useState(false)



    // create an instance of the theme
    const theme = useTheme()

    //handel modal closure
    const handleClose = () => {
        setFormState({ isOpen: false, data: { title: '', body: '', link: '', image: '' } })
        setError(false) // reset error checker after closing form
        setImageError(false)// reset image error checker after closing form
    };

    //handel data change in the form
    const setData = (e) => {
        setFormState({ ...formState, data: { ...formState.data, [e.target.id]: e.target.value } })
    }

    const setFiles = async (e) => {
        const files = Array.from(e.target.files);
        const [file] = files;
        setImageError(false)

        if (!file) return
        try {
            const response = await imageUpload(file)
            setFormState({ ...formState, data: { ...formState.data, [e.target.id]: response.data } })
        }
        catch (err) {
            setImageError(true)
        }
    }


    //form error checker
    const checkError = ({ title, body }) => {
        if (title === '' || title === undefined) return true
        if (body === '' || body === undefined) return true
        return false
    }


    // handel the submission of the form
    const handleSubmit = (data, type) => {

        if (checkError(data)) return setError(true) // setError to true if required data is missing
        if (imageError) return
        submit(data, type) //submit data
        setError(false) // reset error checker after posting
        setFormState({ isOpen: false, data: { title: '', body: '', link: '', image: '' } })
    }


    //get title of the modal depending on witch section is selected
    const getTitle = (type) => {
        switch (type) {
            case 'news': return "?????????? ?????????? ?????????? "
            case 'ads': return "?????????? ?????????? ?????????? "
            default: return 'error'
        }
    }

    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////
    return (
        <>
            <Dialog open={formState.isOpen} onClose={handleClose} fullScreen >
                <DialogTitle>{getTitle(type)}</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        margin="normal"
                        id="title"
                        label="?????????? ??????????????"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={setData}
                        required={true}
                        error={error}
                        value={formState.data.title || ''}
                    />

                    <TextField
                        multiline
                        margin="normal"
                        id="body"
                        label="???? ??????????????"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={setData}
                        required={true}
                        error={error}
                        value={formState.data.body || ''}
                    />


                    <TextField
                        margin="normal"
                        id="link"
                        label="????????????"
                        type="url"
                        fullWidth
                        variant="standard"
                        onChange={setData}
                        value={formState.data.link || ''}
                    />

                    <TextField
                        margin="normal"
                        id="image"
                        label="????????????"
                        type="file"
                        hiddenLabel
                        fullWidth
                        variant="standard"
                        onChange={setFiles}
                        error={imageError}
                        helperText={imageError && '?????? ?????? ???? ?? ???????? ???????????? ???? ?????? ???????? ???????????? ????????'}
                    />
                    {error && <Typography color="error" >?????????????? ???????????? ?????????? ????????????*</Typography>}

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>??????????</Button>
                    <Button color="secondary" variant="contained" onClick={() => handleSubmit(formState.data, type)}>??????????</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditPostModal
