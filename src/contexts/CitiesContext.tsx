import { ReactNode, createContext, useState, useEffect } from 'react';
const BASE_URL = `http://localhost:8080`;

export interface Position {
  lat: number;
  lng: number;
}

export interface CityType {
  id: string;
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: Position;
}

// Define type for the state
export type CitiesState = {
  cities: CityType[];
  isLoading: boolean;
  currentCity: CityType;
  getCity: (id: string) => void;
};

type CitiesContextProviderProps = {
  children: ReactNode;
};

const defaultCity: CityType = {
  cityName: 'Barcelona',
  country: 'Spain',
  emoji: '🇪🇸',
  date: '2030-02-18T04:20:33.123Z',
  notes: '',
  position: {
    lat: 41.38635744222116,
    lng: 2.1786412498238494,
  },
  id: '11649417',
};

export const CitiesContext = createContext<CitiesState | null>(null);

function CitiesContextProvider({ children }: CitiesContextProviderProps) {
  const [cities, setCities] = useState<CityType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState<CityType>(defaultCity);

  useEffect(() => {
    const fetchCities = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data: CityType[] = await res.json();
        setCities(data);
      } catch {
        alert('There was an error loading data!');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  async function getCity(id: string) {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data: CityType = await res.json();
      setCurrentCity(data);
    } catch {
      alert('There was an error loading data!');
    } finally {
      setIsLoading(false);
    }
  }

  const contextValue: CitiesState = {
    cities,
    isLoading,
    currentCity,
    getCity,
  };
  return (
    <CitiesContext.Provider value={contextValue}>
      {children}
    </CitiesContext.Provider>
  );
}

export default CitiesContextProvider;
