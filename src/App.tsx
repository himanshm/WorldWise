import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import RootLayout from './pages/Root.tsx';
import HomePage from './pages/Home.tsx';
import ProductPage from './pages/Product.tsx';
import PricingPage from './pages/Pricing.tsx';

const routeDefinitions = createRoutesFromElements(
  <Route path='/' element={<RootLayout />}>
    <Route index element={<HomePage />} />
    <Route path='product' element={<ProductPage />} />
    <Route path='pricing' element={<PricingPage />} />
  </Route>
);

const router = createBrowserRouter(routeDefinitions);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
