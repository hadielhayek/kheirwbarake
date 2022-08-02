import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from '@mui/material';
import "./index.css";
import axios from 'axios';
import UserStateProvider from './stateProviders/userStateProvider';
import ProductDataProvider from './stateProviders/ProductsDataProvider';
import BasketCounterProvider from './stateProviders/basketCounterProvider';


//axios default prefix
axios.defaults.baseURL = 'http://localhost:5000/api/v1/'

//=== custom theme ===//
const theme = createTheme({
  direction: 'rtl',


  palette: {
    primary: { main: '#3F403F', light: '#000', contrastText: "#fff" },
    secondary: { main: '#3E885B', light: '#60993E' },
    warning: { main: '#FFC163' },
    default: { main: '#3F403F' },
    background: {
      default: "#ECE2D0",
      paper: "#D9D9D9",
    },
  },


});




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <ProductDataProvider>
        <UserStateProvider>
          <BasketCounterProvider>
            <App />
          </BasketCounterProvider>
        </UserStateProvider>
      </ProductDataProvider>

    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
