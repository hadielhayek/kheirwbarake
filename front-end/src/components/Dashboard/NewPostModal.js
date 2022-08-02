import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography, useTheme } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import imageUpload from './helper functions/uploadImage'



function NewPostModal({ formState, setFormState, submit, type, ...props }) {
    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////

    const [error, setError] = useState(false)
    const [imageError, setImageError] = useState(false)

    // create an instance of the theme
    const theme = useTheme()

    //handel modal closure
    const handleClose = () => {
        setFormState({ type: 'close' });
        setError(false) // reset error checker after closing form
        setImageError(false)// reset image error checker after closing form
    };

    //handel data change in the form
    const setValue = (e) => {
        setFormState({ type: 'changeData', payload: { id: e.target.id, data: e.target.value } })
    }

    const setFiles = async (e) => {
        const files = Array.from(e.target.files);
        const [file] = files;
        setImageError(false)

        if (!file) return
        try {
            const response = await imageUpload(file)
            setFormState({ type: 'changeData', payload: { id: e.target.id, data: response.data } })
        }
        catch (err) {
            setImageError(true)
        }
    }


    //get title of the modal depending on witch section is selected
    const getTitle = (type) => {
        switch (type) {
            case 'news': return "إنشاء منشور أخبار جديد"
            case 'ads': return "إنشاء منشور إعلان جديد"
            default: return 'error'
        }
    }

    //form error checker
    const checkError = ({ title, body }) => {
        if (title === '' || title === undefined) return true
        if (body === '' || body === undefined) return true
        return false
    }


    // handel the submission of the form
    const handleSubmit = (e) => {
        e.preventDefault()

        // setError to true if required data is missing
        if (checkError(formState.data)) return setError(true)
        if (imageError) return
        //if checkError return false fire the submit function
        submit(formState.data, type) //submit data
        setError(false) // reset error checker after posting
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
                        label="عنوان المنشور"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={setValue}
                        error={error}
                        required
                        value={formState.data.title || ''}
                    />

                    <TextField
                        rows={6}
                        multiline
                        margin="normal"
                        id="body"
                        label="نص المنشور"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={setValue}
                        error={error}
                        required
                        value={formState.data.body || ''}
                    />

                    <TextField
                        margin="normal"
                        id="link"
                        label="الرابط"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={setValue}
                        value={formState.data.link || ''}
                    />

                    <TextField
                        hidden
                        margin="normal"
                        id="image"
                        label="الصورة"
                        type="file"
                        hiddenLabel
                        fullWidth
                        variant="standard"
                        onChange={setFiles}
                        error={imageError}
                        helperText={imageError && 'حدث خطأ ما ، يرجى التأكد من أنك تقوم بتحميل صورة'}
                    />
                    {error && <Typography color="error" >الخانات المشار إليها مطلوبة*</Typography>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>إلغاء</Button>
                    <Button color="secondary" variant="contained" onClick={handleSubmit} >إنشاء</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default NewPostModal
