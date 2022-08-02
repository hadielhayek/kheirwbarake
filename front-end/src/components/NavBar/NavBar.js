import { AppBar, Badge, Button, ButtonBase, IconButton, Tab, Tabs, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../stateProviders/userStateProvider"
import { basketCounterContext } from "../../stateProviders/basketCounterProvider"
import DrawerComponent from "./Drawer";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import HomeIcon from '@mui/icons-material/Home';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";



/**  Main NavBar component
 * - use the global user state context to know if a user is logged in or not
 */export default function NavBar() {

    const theme = useTheme()
    const Navigate = useNavigate() //create an instance of useNavigate hooks for
    const { state, dispatch } = useContext(userContext) //user state from userStateProvider
    const isMobileView = useMediaQuery(theme.breakpoints.down("md")) //mediaquery
    const currentLocation = useLocation().pathname; //get current location
    const [activeTab, setActiveTab] = useState(false) //current active tab
    //login handler


    const handleNavigation = (value) => {
        if (value)
            Navigate(value)
    }

    useEffect(() => {
        if (currentLocation === '/' || currentLocation === '/store' || currentLocation === '/aboutus'
        ) return setActiveTab(currentLocation)
        if (currentLocation.split('/')[1] === 'store') return setActiveTab('/store')
        setActiveTab(false)
    }, [currentLocation])

    const { state: basketCounter } = useContext(basketCounterContext)

    return (
        <>
            <AppBar>
                <Toolbar >
                    <Typography flexGrow={1}>خير وبركة</Typography>


                    {isMobileView ?
                        <>
                            <IconButton onClick={() => handleNavigation(null, '/basket')} sx={{ margin: 2, }}>
                                <Badge badgeContent={basketCounter.length} color="error">
                                    <ShoppingBasketIcon size="small" sx={{ color: (currentLocation === '/basket') ? theme.palette.common.white : theme.palette.grey[500] }} />
                                </Badge>
                            </IconButton>

                            <DrawerComponent activeTab={activeTab} />
                        </>
                        :
                        <>
                            <Tabs value={activeTab} onChange={(e, value) => { handleNavigation(value) }}
                                centered={true} indicatorColor="secondary" textColor="inherit" sx={{ flexGrow: 0.2 }}
                            >

                                <Tab value={'/'} label="الصفحة الرئيسية" icon={<HomeIcon fontSize="xs" />} iconPosition={'start'} />
                                <Tab value={'/store'} label="المتجر" icon={<ShoppingCartIcon fontSize="xs" />} iconPosition={'start'} />
                                <Tab value={'/aboutus'} label="من نحن" />

                            </Tabs>

                            <Box>
                                <IconButton onClick={() => handleNavigation('/basket')} sx={{ margin: 2, }}>
                                    <Badge badgeContent={basketCounter.length} color="error">
                                        <ShoppingBasketIcon size="small" sx={{ color: (currentLocation === '/basket') ? theme.palette.common.white : theme.palette.grey[500] }} />
                                    </Badge>
                                </IconButton>

                                {state.isLogin ?
                                    <>
                                        <Button variant='outlined' color={'inherit'} sx={{ marginLeft: "10px" }}>الحساب</Button>
                                        <Button variant="contained" color="secondary" sx={{ marginLeft: "10px" }}>تسجيل خروج</Button>
                                    </>
                                    :
                                    <>
                                        <Button onClick={() => handleNavigation('/login')} variant='outlined' color={'inherit'} sx={{ marginLeft: "10px" }}>تسجيل دخول</Button>
                                        <Button onClick={() => handleNavigation('/signup')} variant="contained" color="secondary" sx={{ marginLeft: "10px" }}>إنشاء حساب</Button>
                                    </>
                                }
                            </Box>
                        </>
                    }
                </Toolbar>
            </AppBar>
            <Toolbar sx={{ height: '72px' }} />
            <Outlet />
        </>
    )
}