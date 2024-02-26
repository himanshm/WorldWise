import {
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
import { useEffect, useState } from 'react';

// Define types for the city data
interface Position {
  lat: number;
  lng: number;
}

export interface City {
  id: string;
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: Position;
}

// Define type for the state
export type CitiesState = City[];

const BASE_URL = `http://localhost:8080`;

function App() {
  const [cities, setCities] = useState<CitiesState>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data: CitiesState = await res.json();
        setCities(data);
      } catch {
        alert('There was an error loading data!');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  const routeDefinitions = createRoutesFromElements(
    <Route>
      <Route index element={<HomePage />} />
      <Route path='product' element={<ProductPage />} />
      <Route path='pricing' element={<PricingPage />} />
      <Route path='login' element={<Login />} />
      <Route path='app' element={<AppLayoutPage />}>
        <Route
          index
          element={<CityList cities={cities} isLoading={isLoading} />}
        />
        <Route
          path='cities'
          element={<CityList cities={cities} isLoading={isLoading} />}
        />
        <Route path='countries' element={<p>List of countries</p>} />
        <Route path='form' element={<p>Form</p>} />
      </Route>
    </Route>
  );

  const router = createBrowserRouter(routeDefinitions);

  return <RouterProvider router={router} />;
}

export default App;
