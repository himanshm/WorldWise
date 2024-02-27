import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import styles from './Map.module.css';
import { Position } from '../../contexts/CitiesContext';
import { useState } from 'react';

function Map() {
  const navigate = useNavigate();
  const [mapPosition, setMapPosition] = useState<Position>({ lat: 40, lng: 0 });
  // const [searchParams, setSearchParams] = useSearchParams();

  // const lat = searchParams.get('lat');
  // const lng = searchParams.get('lng');
  return (
    <div className={styles.mapContainer}>
      <MapContainer
        className={styles.map}
        center={[mapPosition.lat, mapPosition.lng]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        />
        <Marker position={[mapPosition.lat, mapPosition.lng]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
