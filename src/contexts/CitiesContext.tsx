import { ReactNode, createContext, useState, useEffect } from 'react';
const BASE_URL = `http://localhost:8080`;

interface Position {
  lat: number;
  lng: number;
}

export interface CityType {
  id: number;
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
};

type CitiesContextProviderProps = {
  children: ReactNode;
};

export const CitiesContext = createContext<CitiesState | null>(null);

function CitiesContextProvider({ children }: CitiesContextProviderProps) {
  const [cities, setCities] = useState<CityType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const contextValue: CitiesState = {
    cities,
    isLoading,
  };
  return (
    <CitiesContext.Provider value={contextValue}>
      {children}
    </CitiesContext.Provider>
  );
}

export default CitiesContextProvider;
