import React, { useContext, useState } from 'react'
import { userContext } from "../../stateProviders/userStateProvider"
import { useNavigate } from 'react-router-dom'

import { Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import HelpIcon from '@mui/icons-material/Help';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CreateIcon from '@mui/icons-material/Create';

/**  Drawer component that will act as the navigation sidebar when in mobile view
 * - use the global user state context to know if a user is logged in or not
 */function DrawerComponent({ activeTab }) {
    const { state, dispatch } = useContext(userContext) //user state from userStateProvider
    const Navigate = useNavigate() //create an instance of useNavigate hooks for
    const [openDrawer, setOpenDrawer] = useState(false)

    //login handler
    const handleNavigation = (value) => {
        if (!value) return //guard clause if no value is passed in
        Navigate(value)
    }


    return (
        <>
            <Drawer open={openDrawer}
                anchor={'right'}
                onClose={() => { setOpenDrawer(false) }}
            >
                <List sx={{ flexGrow: 1 }}>
                    <ListItemButton onClick={() => handleNavigation('/')}
                        selected={activeTab === '/'}
                    >
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText> الصفحة الرئيسية</ListItemText>
                    </ListItemButton>

                    <ListItemButton onClick={() => handleNavigation('/store')}
                        selected={activeTab === '/store'}
                    >
                        <ListItemIcon>
                            <ShoppingCartIcon />
                        </ListItemIcon>
                        <ListItemText> المتجر</ListItemText>
                    </ListItemButton>

                    <ListItemButton onClick={() => handleNavigation('/aboutus')}
                        selected={activeTab === '/aboutus'}
                    >
                        <ListItemIcon>
                            <HelpIcon />
                        </ListItemIcon>
                        <ListItemText> من نحن</ListItemText>
                    </ListItemButton>
                </List>

                <Divider />

                <List>
                    {state.isLogin ?
                        <>
                            <ListItemButton onClick={() => handleNavigation('/userprofile')}>
                                <ListItemIcon>
                                    <AccountBoxIcon />
                                </ListItemIcon>
                                <ListItemText>الحساب</ListItemText>
                            </ListItemButton>

                            <ListItemButton onClick={() => handleNavigation('/')}>
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText>تسجيل خروج</ListItemText>
                            </ListItemButton>
                        </>
                        :
                        <>
                            <ListItemButton onClick={() => handleNavigation('/login')}>
                                <ListItemIcon>
                                    <LoginIcon />
                                </ListItemIcon>
                                <ListItemText>تسجيل دخول</ListItemText>
                            </ListItemButton>

                            <ListItemButton onClick={() => handleNavigation('/signup')}>
                                <ListItemIcon>
                                    <CreateIcon />
                                </ListItemIcon>
                                <ListItemText>إنشاء حساب</ListItemText>
                            </ListItemButton>
                        </>
                    }
                </List>
            </Drawer>
            <IconButton onClick={() => setOpenDrawer(!openDrawer)} color="inherit">
                <MenuIcon />
            </IconButton>
        </>
    )
}

export default DrawerComponent
