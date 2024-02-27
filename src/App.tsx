import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import HomePage from './pages/Home.tsx';
import ProductPage from './pages/Product.tsx';
import PricingPage from './pages/Pricing.tsx';
import Login from './pages/Login.tsx';
import AppLayoutPage from './pages/AppLayout.tsx';
import CityList from './components/city/CityList.tsx';
import CountryList from './components/country/CountryList.tsx';
import City from './components/city/City.tsx';
import Form from './components/Form.tsx';
import CitiesContextProvider from './contexts/CitiesContext.tsx';

function App() {
  const routeDefinitions = createRoutesFromElements(
    <Route>
      <Route index element={<HomePage />} />
      <Route path='product' element={<ProductPage />} />
      <Route path='pricing' element={<PricingPage />} />
      <Route path='login' element={<Login />} />
      <Route path='app' element={<AppLayoutPage />}>
        <Route index element={<Navigate to='cities' replace />} />
        <Route path='cities' element={<CityList />} />
        <Route path='cities/:id' element={<City />} />
        <Route path='countries' element={<CountryList />} />
        <Route path='form' element={<Form />} />
      </Route>
    </Route>
  );

  const router = createBrowserRouter(routeDefinitions);

  return (
    <CitiesContextProvider>
      <RouterProvider router={router} />
    </CitiesContextProvider>
  );
}

export default App;
