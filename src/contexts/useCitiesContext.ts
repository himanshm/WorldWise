import { useContext } from 'react';

import { CitiesContext } from './CitiesContext';

export function useCitiesContext() {
  const citiesContext = useContext(CitiesContext);

  if (citiesContext === null) {
    throw new Error(
      'TimersContext is null - that should not be the case! CitiesContext was used outside the ContextProvider!'
    );
  }

  return citiesContext;
}
