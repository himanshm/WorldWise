import { ReactNode, createContext, useEffect, useReducer } from 'react';
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
  date: string | Date;
  notes: string;
  position: Position;
}

// Define type for the state
export type CitiesState = {
  cities: CityType[];
  isLoading: boolean;
  currentCity: CityType;
  error?: string;
};

const initialState: CitiesState = {
  cities: [],
  isLoading: false,
  currentCity: {} as CityType,
  error: '',
};

type CitiesContextProps = CitiesState & {
  getCity: (id: string) => void;
  createCity: (city: CityType) => void;
  deleteCity: (id: string) => void;
};

type CitiesContextProviderProps = {
  children: ReactNode;
};

type loadingAction = {
  type: 'loading';
};
type citiesLoadedAction = {
  type: 'cities/loaded';
  payload: CityType[];
};
type cityAction = {
  type: 'city/loaded' | 'city/created';
  payload: CityType;
};

type cityDeletedAction = {
  type: 'city/deleted';
  payload: string;
};
type rejectedAction = {
  type: 'rejected';
  payload: string;
};

type CitiesAction =
  | loadingAction
  | citiesLoadedAction
  | cityAction
  | cityDeletedAction
  | rejectedAction;

export const CitiesContext = createContext<CitiesContextProps | null>(null);

const CitiesReducer = function (
  state: CitiesState,
  action: CitiesAction
): CitiesState {
  if (action.type === 'loading') {
    return { ...state, isLoading: true };
  }

  if (action.type === 'cities/loaded') {
    return { ...state, isLoading: false, cities: action.payload };
  }

  if (action.type === 'city/loaded') {
    return { ...state, isLoading: false, currentCity: action.payload };
  }

  if (action.type === 'city/created') {
    return {
      ...state,
      isLoading: false,
      cities: [...state.cities, action.payload],
      currentCity: action.payload,
    };
  }

  if (action.type === 'city/deleted') {
    return {
      ...state,
      isLoading: false,
      cities: state.cities.filter((city) => city.id !== action.payload),
      currentCity: {} as CityType,
    };
  }

  if (action.type === 'rejected') {
    return { ...state, isLoading: false, error: action.payload };
  }

  return { ...state };
};

function CitiesContextProvider({ children }: CitiesContextProviderProps) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    CitiesReducer,
    initialState
  );
  useEffect(() => {
    const fetchCities = async () => {
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data: CityType[] = await res.json();
        dispatch({ type: 'cities/loaded', payload: data });
      } catch {
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading cities...',
        });
      }
    };

    fetchCities();
  }, []);

  async function getCity(id: string) {
    if (id === currentCity.id) return;
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data: CityType = await res.json();
      dispatch({ type: 'city/loaded', payload: data });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error loading city...',
      });
    }
  }

  async function createCity(newCity: CityType) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data: CityType = await res.json();

      dispatch({ type: 'city/created', payload: data });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error creating the city...',
      });
    }
  }

  async function deleteCity(id: string) {
    dispatch({ type: 'loading' });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });

      dispatch({ type: 'city/deleted', payload: id });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error deleting city!',
      });
    }
  }

  const contextValue: CitiesContextProps = {
    cities,
    isLoading,
    currentCity,
    getCity,
    createCity,
    deleteCity,
  };
  return (
    <CitiesContext.Provider value={contextValue}>
      {children}
    </CitiesContext.Provider>
  );
}

export default CitiesContextProvider;

/*The two options that we have when it comes to passing down the value into our context. When we are working with asynchronous data and code we have two options when it comes to the dispatch function. So the first option is to pass in all the state plus the dispatch function into the value and then we can use the dispatch function inside the components to update state.

However, since we're dealing with asynchronous data we cannot have all the logic inside the reducer and so in the case that we were passing the dispatch function into the context then we would have to have this function here inside the component that dispatches the action And you can try that out for yourself, of course.

So you can remove this function from here and not pass it into the context, but instead pass in dispatch. But then you would have to pass all this data fetching logic into that component which is not really what we want if we want to keep the components nice and clean and therefore we are using the second option hich is to not pass the dispatch function into the context but instead to use it here inside these event handler functions, which these are.

So these are event handler functions that are called for example, here on the click of this delete button. And so then this time we use the dispatch inside of these functions.

And then it is these functions that we pass here into the context, okay?

But if we were not dealing with asynchronous data then it would be better to just pass the dispatch function and then create the actions right inside the components. */
