import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material'
import { green, red } from '@mui/material/colors'
import React from 'react'

const style = {

    confirmButton: {
        backgroundColor: red[800], ":hover": {
            backgroundColor: green[800]
        }
    }
}
/**
 * MUI Confirm Delete Dialog
 * @param {function} deletePost - will run the delete post function in the Main Component with data
 * from the state prop
 * @param {isOpen: boolean, id: string, type: string, title: string} state - set the data for the delete function
 * @param {function} setState - will cause the dialog to close by setting the isOpen state to false
 * @returns {MUI Dialog Component}
 */function DeleteConfirmDialog({ deletePost, state, setState }) {
    return (
        <Dialog
            open={state.isOpen}
            onClose={() => setState({ isOpen: false })}
        >
            <DialogTitle color={red[700]} id="confirm-delete-dialog">
                {"تأكيد حذف المنشور "}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    سوف يتم حذف المنشور بعنوان: <Typography fontWeight={600} color={green[900]} component={'span'}>{state.title} </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={() => setState({ isOpen: false })}>
                    Cancel
                </Button>
                <Button variant="contained" sx={style.confirmButton} onClick={() => deletePost(state.id, state.type)} autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteConfirmDialog
