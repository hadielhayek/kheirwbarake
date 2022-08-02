import { Box, Button, Divider, Stack, Typography, useTheme } from "@mui/material"
import PostAddIcon from '@mui/icons-material/PostAdd';
import StackItem from "./StackItem"
import { useMemo, useReducer, useState } from "react";
import NewPostModal from "./NewPostModal"
import axios from "axios"
import { filterData } from './helper functions/filterData'
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import SimpleSnackbar from "./SnackBar"
import EditPostModal from "./EditPostModal";




const MainComponent = ({ activeMenu, allPostsData, postsDispatcher }) => {

    const theme = useTheme()


    /**  Hold the state for the confirm post delete dialog 
     * @param {isOpen: boolean, id: string, type: string, title: string}
     * 
    */const [confirmPostDeleteDialogState, setConfirmPostDeleteDialogState] = useState({ isOpen: false })



    const [updatePostDialogState, setUpdatePostDialogData] = useState({ isOpen: false, data: { title: '', body: '', link: '', image: '' } })


    // open MUI snack Bar
    const [SnackState, SetSnackState] = useState({ open: false, message: '' });


    //reducer function for the create new post state 
    const initialFormState = { isOpen: false, data: { title: '', body: '', link: '', image: '' } }
    const formStateReducer = (state, action) => {
        switch (action.type) {
            case 'open': return { ...state, isOpen: true, data: { ...initialFormState.data } }
            case 'close': return { ...state, isOpen: false }
            case 'changeData': return { ...state, data: { ...state.data, [action.payload.id]: action.payload.data } }
            case 'resetData': return { ...state, data: {} }
            default: return state
        }
    }

    // Hold the state and data for the create new post form
    const [formState, formDispatch] = useReducer(formStateReducer, initialFormState)

    /////////////////////////////////////////////////


    const openAddPostForm = () => {
        formDispatch({ type: 'open' })
    }





    const createNewPost = async (data, postType) => {


        // set the action for the dispatcher depending on the postType from the Add post Dialog
        let type = ''
        if (postType === 'news') type = "addNewsPost"
        if (postType === 'ads') type = "addAdsPost"
        try {
            const response = await axios.post(postType, data) // fire axios with a post request
            if (response.status > 299) throw new Error('something went wrong')
            if (response.status === 200) {
                postsDispatcher({ type: type, payload: response.data })
                formDispatch({ type: 'close' })
                SetSnackState({ open: true, message: 'تم إضافة المنشور بنجاح' })
            } else {
                throw new Error()
            }
        }
        catch (err) {
            formDispatch({ type: 'close' })
            SetSnackState({ open: true, message: err.message })
            console.error(err)
        }

    }

    const deletePost = async (id, postType) => {
        let type = ''
        if (postType === 'news') type = "deleteNewsPost"
        if (postType === 'ads') type = "deleteAdsPost"

        let data = []
        if (postType === 'news') data = allPostsData.newsPostsData
        if (postType === 'ads') data = allPostsData.adsPostsData

        try {
            const response = await axios.delete(postType + "/" + id)
            if (response.status > 299) throw new Error()
            if (response.status === 200) {
                postsDispatcher({ type: type, payload: filterData(id, data) })
                setConfirmPostDeleteDialogState({ isOpen: false })
            }
        }
        catch (err) {
            SetSnackState({ open: true, message: err.message })
            console.error(err.message)

        }
    }

    const updatePost = async (newData, postType) => {

        let type = ''
        if (postType === 'news') type = "newsPostsData"
        if (postType === 'ads') type = "adsPostsData"

        let oldPostsData = []
        if (postType === 'news') oldPostsData = allPostsData.newsPostsData
        if (postType === 'ads') oldPostsData = allPostsData.adsPostsData

        try {
            const response = await axios.put(postType + "/" + newData._id, updatePostDialogState.data)


            if (response.status > 299) throw new Error()

            if (response.status === 200) {
                const index = allPostsData[type].findIndex(x => x._id === newData._id)
                oldPostsData[index] = newData
                postsDispatcher({ type: `update_${postType}`, payload: [...oldPostsData] })
                SetSnackState({ open: true, message: 'تم التحديث بنجاح' })
            }
        } catch (err) {
            console.error(err.message)
            SetSnackState({ open: true, message: err.message })

        }
    }

  /**
     * this function use a useMemo hook to store an Mui Stack Component with mapped stack item from news posts data fetched inside
     * the parent dashBoard component and passed inside the @variable allPostData object
     * inside the Stack is a StackItem component that takes the Following Props:
     * @param {object} data - contain the post data to display to the user
     * @param {string} key - react require a key for list item and we are getting the key from the posts ids
     * @param {function}  deletePost - function is passed to each stack item and is called with the stack item id and type
     * @param {string} id - the id of each post is passed to the stack item to be used with CRUD functions
     * @param {string} type - we pass a post type manually to the stack item to be used with CRUD functions 
     * and tell the CRUD function what route to use and state to update
     * @param {function} setDelete - set the state for the delete confirm dialog with the appropriate post type and id

     */const newsPostsListItems = useMemo(() => {
        return (
            <Stack sx={{
                marginY: theme.spacing(2), paddingY: theme.spacing(1), rowGap: theme.spacing(1), overflowX: 'hidden',
            }}>
                {
                    allPostsData.newsPostsData.map((post) => {
                        return <StackItem
                            data={post}
                            key={post._id}
                            type={'news'}
                            setDelete={setConfirmPostDeleteDialogState}
                            setUpdate={setUpdatePostDialogData}

                        />
                    })
                }
            </Stack>
        )
    }, [allPostsData.newsPostsData])

    /**
     * this function use a useMemo hook to store an Mui Stack Component with mapped stack item from ads posts data fetched inside
     * the parent dashBoard component and passed inside the @variable allPostData object
     * inside the Stack is a StackItem component that takes the Following Props:
     * @param {object} data - contain the post data to display to the user
     * @param {string} key - react require a key for list item and we are getting the key from the posts ids
     * @param {function}  deletePost - function is passed to each stack item and is called with the stack item id and type
     * @param {string} id - the id of each post is passed to the stack item to be used with CRUD functions
     * @param {string} type - we pass a post type manually to the stack item to be used with CRUD 
     * functions and tell the CRUD function what route to use and state to update
     * @param {function} setDelete - set the state for the delete confirm dialog with the appropriate post type and id
     */const adsPostsListItems = useMemo(() => {
        return (
            <Stack sx={{
                marginY: theme.spacing(2), paddingY: theme.spacing(1), rowGap: theme.spacing(1), overflowX: 'hidden',
            }}>
                {allPostsData.adsPostsData.map((post) => {
                    return <StackItem
                        data={post}
                        key={post._id}
                        id={post._id}
                        type={'ads'}
                        setDelete={setConfirmPostDeleteDialogState}
                        setUpdate={setUpdatePostDialogData}
                    />
                })}
            </Stack>
        )
    }, [allPostsData.adsPostsData])
    ////////////////////////////////////////////////////



    // switch english title from props to arabic
    const translate = {
        news: 'أخبار',
        ads: 'الإعلانات'
    }

    // return a new menu if menu tab is pressed in drawer
    // or the ads menu if menu tab is pressed
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    rowGap: theme.spacing(3),
                    flexWrap: 'wrap',
                    paddingBottom: theme.spacing(3),
                }}
            >

                <Typography variant="h3"
                    sx={{ flexGrow: 1000, flexBasis: '80%' }}
                >
                    {translate[activeMenu]}
                </Typography>

                <Button
                    size="large"
                    endIcon={<PostAddIcon />}
                    variant="contained"
                    color="secondary"
                    sx={{ height: 'fit-content', flexGrow: 1 }}
                    onClick={openAddPostForm}
                >
                    إنشاء منشور
                </Button>
            </Box>

            <Divider />

            {(activeMenu === 'news') && newsPostsListItems}
            {(activeMenu === 'ads') && adsPostsListItems}

            <NewPostModal
                type={activeMenu}
                formState={formState}
                setFormState={formDispatch}
                submit={createNewPost}
            />

            <EditPostModal
                type={activeMenu}
                formState={updatePostDialogState}
                setFormState={setUpdatePostDialogData}
                submit={updatePost}
            />

            <DeleteConfirmDialog
                deletePost={deletePost}
                state={confirmPostDeleteDialogState}
                setState={setConfirmPostDeleteDialogState} />

            <SimpleSnackbar setOpen={SetSnackState} state={SnackState} />

        </>

    )
}


export default MainComponent