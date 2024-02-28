import { Suspense, lazy } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/Login.tsx';

import CityList from './components/city/CityList.tsx';
import CountryList from './components/country/CountryList.tsx';
import City from './components/city/City.tsx';
import Form from './components/form/Form.tsx';
import SpinnerFullPage from './components/UI/SpinnerFullPage.tsx';

const HomePage = lazy(() => import('./pages/Home.tsx'));
const ProductPage = lazy(() => import('./pages/Product.tsx'));
const PricingPage = lazy(() => import('./pages/Pricing.tsx'));
const AppLayoutPage = lazy(() => import('./pages/AppLayout.tsx'));
const ProtectedRoutePage = lazy(() => import('./pages/ProtectedRoute.tsx'));

// You could also create a layout route that wraps a React.Suspense around an Outlet component.

const SuspenseLayout = () => (
  <Suspense fallback={<SpinnerFullPage />}>
    <Outlet />
  </Suspense>
);

const Root = (
  <Route element={<SuspenseLayout />}>
    <Route index element={<HomePage />} />
    <Route path='product' element={<ProductPage />} />
    <Route path='pricing' element={<PricingPage />} />
    <Route path='login' element={<Login />} />
    <Route
      path='app'
      element={
        <ProtectedRoutePage>
          <AppLayoutPage />
        </ProtectedRoutePage>
      }
    >
      <Route index element={<Navigate to='cities' replace />} />
      <Route path='cities' element={<CityList />} />
      <Route path='cities/:id' element={<City />} />
      <Route path='countries' element={<CountryList />} />
      <Route path='form' element={<Form />} />
    </Route>
  </Route>
);

export default Root;
