import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import styles from './Map.module.css';
import { CityType } from '../../contexts/CitiesContext';
import { useEffect, useState } from 'react';
import { useCitiesContext } from '../../contexts/useCitiesContext';
import { useGeolocation } from '../../hooks/useGeolocation';
import Button from '../UI/Button';

type Position = [lat: number, lng: number];

type ChangeCenterTypes = {
  position: Position;
};

function ChangeCenter({ position }: ChangeCenterTypes) {
  const map = useMap();
  const newPosition: LatLngExpression = position;
  map.setView(newPosition);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });

  return null;
}

function Map() {
  const { cities } = useCitiesContext();
  const [mapPosition, setMapPosition] = useState<Position>([40, 0]);
  const [searchParams] = useSearchParams();
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const mapLat = searchParams.get('lat');
  const mapLng = searchParams.get('lng');

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([+mapLat, +mapLng]);
  }, [mapLat, mapLng]);

  // Synchronize geoLocationPositon with setMapPosition
  useEffect(() => {
    if (geolocationPosition)
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button btntype='position' onClick={getPosition}>
          {isLoadingPosition ? 'Loading ...' : 'Use your Position'}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        />
        {cities.map((city: CityType) => (
          <Marker
            key={city.id}
            position={[+city.position.lat, +city.position.lng]}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

export default Map;
