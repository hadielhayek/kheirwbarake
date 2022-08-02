import RTL from './config/RTL'
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar/NavBar'
import Home from "./pages/Home"
import AboutUs from "./pages/aboutUs"
import NotFound from './pages/notFound'
import DashBoard from './pages/dashBoard';
import Profile from './pages/Profile';
import Store from './pages/Store';
import Products from './pages/Products';
import { useContext } from 'react';
import { categoriesContext } from './stateProviders/ProductsDataProvider'
import ScrollToTop from './stateProviders/ScrollToTop';
import Basket from './pages/Basket'
import Login from './pages/Login';
import Signup from './pages/Signup';


function App() {

  const CategoriesData = useContext(categoriesContext)

  return (
    <RTL>

      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            <Route path={"/admin"} element={<DashBoard />} />
            <Route path={"/login"} element={<Login />} />

            <Route element={<NavBar />} >
              <Route index element={<Home />} />
              <Route path={'/aboutus'} element={<AboutUs />} />
              <Route path={'/basket'} element={<Basket />} />
              <Route path={'/signup'} element={<Signup />} />
              <Route path={'/store'} element={<Store categories={CategoriesData} />} />

              {CategoriesData.map(({ id, slug, products, name }) => {
                return <Route key={id} path={`/store/category/${encodeURIComponent(slug)}`} element={<Products products={products} title={name} />} />
              })}

              <Route path={'/profile'} element={<Profile />} />

            </Route>
            <Route path={'*'} element={<NotFound />} />
          </Routes>
        </ScrollToTop>

      </BrowserRouter>
    </RTL>
  );
}

export default App;
