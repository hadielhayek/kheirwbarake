import { Button, Container, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { useContext } from 'react'
import Drawer from '../components/Dashboard/Drawer'
import MainComponent from '../components/Dashboard/MainComponent'
import { userContext } from '../stateProviders/userStateProvider'




const reducer = (state, action) => {
    switch (action.type) {
        case "setNewsData": return { ...state, newsPostsData: action.payload }
        case "setAdsData": return { ...state, adsPostsData: action.payload }
        case 'addNewsPost': return { ...state, newsPostsData: [...state.newsPostsData, action.payload] }
        case 'addAdsPost': return { ...state, adsPostsData: [...state.adsPostsData, action.payload] }
        case 'deleteNewsPost': return { ...state, newsPostsData: [...action.payload] }
        case 'deleteAdsPost': return { ...state, adsPostsData: [...action.payload] }
        case 'update_news': return { ...state, newsPostsData: [...action.payload] }
        case 'update_ads': return { ...state, adsPostsData: [...action.payload] }
        default: return state
    }
}





function DashBoard() {
    const theme = useTheme()
    const isMobileView = useMediaQuery(theme.breakpoints.down('md'))
    const [activeMenu, setActiveMenu] = useState("news")
    const [openModal, setOpenModal] = useState(false)


    const [allPostsData, dispatch] = useReducer(reducer, { newsPostsData: [], adsPostsData: [] })


    // const dispatch = useContext(userContext)

    // fetch all news and ads posts and save them in the allPostsData useReducer hool
    useEffect(() => {
        // get all news posts
        axios.get('news')
            .then((response) => dispatch({ type: 'setNewsData', payload: response.data }))
            .catch((error) => console.error(error))

        // get all ads posts
        axios.get('ads')
            .then((response) => dispatch({ type: 'setAdsData', payload: response.data }))
            .catch((error) => console.error(error))
    }, [])


    return (
        <>
            <Drawer activeMenu={activeMenu} setActiveMenu={setActiveMenu}>

                <Container component="main" sx={{ display: 'flex', minWidth: '200px', flexDirection: 'column', paddingTop: theme.spacing(3), overflowX: 'hidden' }} >

                    <Toolbar />
                    <MainComponent activeMenu={activeMenu} allPostsData={allPostsData} postsDispatcher={dispatch} />

                </Container>

            </Drawer>
        </>
    )
}

export default DashBoard
