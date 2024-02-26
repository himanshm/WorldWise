import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import HomePage from './pages/Home.tsx';
import ProductPage from './pages/Product.tsx';
import PricingPage from './pages/Pricing.tsx';
import NavigationPage from './pages/Navigation.tsx';
import Login from './pages/Login.tsx';

const routeDefinitions = createRoutesFromElements(
  <Route>
    <Route index element={<HomePage />} />
    <Route path='product' element={<ProductPage />} />
    <Route path='pricing' element={<PricingPage />} />
    <Route path='login' element={<Login />} />
    <Route path='app' element={<NavigationPage />} />
  </Route>
);

const router = createBrowserRouter(routeDefinitions);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
