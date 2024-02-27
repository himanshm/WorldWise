import { useState } from 'react';

import { Position } from '../contexts/CitiesContext';

interface GeolocationState {
  isLoading: boolean;
  position: Position | null;
  error: string | null;
  getPosition: () => void;
}

export function useGeolocation(defaultPosition?: Position): GeolocationState {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [position, setPosition] = useState<Position | null>(
    defaultPosition || null
  );
  const [error, setError] = useState<string | null>(null);

  function getPosition(): void {
    if (!navigator.geolocation) {
      setError('Your browser does not support geolocation');
      return;
    }

    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });

        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, position, error, getPosition };
}
