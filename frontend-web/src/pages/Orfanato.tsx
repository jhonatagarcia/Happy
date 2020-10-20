import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";

import { useParams } from 'react-router-dom';

import mapIcon from '../utils/mapIcon'

import '../styles/pages/orphanage.css';
import Sindebar from "../components/Sidebar";
import api from "../services/api";

interface Orfanato {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  description: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: string;
  images: {
    id: string;
    url: string;
  }[];
}

interface OrfanatoParams {
  id: string;
}

export default function Orphanage() {
  const params = useParams<OrfanatoParams>();
  const [orfanato, setOrfanato] = useState<Orfanato>();
  const [activeImageIdex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    api.get(`orfanatos/${params.id}`).then(response => {
      setOrfanato(response.data);
    })
  }, []);

  if (!orfanato) {
    return <p>Carregandp...</p>
  }
  return (
    <div id="page-orphanage">
      <Sindebar />

      <main>
        <div className="orphanage-details">
          <img src={orfanato.images[activeImageIdex].url} alt={orfanato.name} />

          <div className="images">
            {orfanato.images.map((image, index) => {
              return (
                <button key={image.id} 
                className={activeImageIdex == index ? 'active' : ''}
                type="button" 
                onClick={() => {
                  setActiveImageIndex(index);
                }} >
                  <img src={image.url} alt={orfanato.name} />
                </button>
              );
            })}
          </div>

          <div className="orphanage-details-content">
            <h1>{orfanato.name}</h1>
            <p>{orfanato.description}</p>

            <div className="map-container">
              <Map
                center={[orfanato.latitude, orfanato.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={mapIcon} position={[orfanato.latitude, orfanato.longitude]} />
              </Map>

              <footer>
                <a target="_black" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orfanato.latitude},${orfanato.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orfanato.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orfanato.opening_hours}
              </div>
              {orfanato.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
              ) : (
                  <div className="open-on-weekends dont-open">
                    <FiInfo size={32} color="#FF669D" />
                Não atendemos <br />
                fim de semana
                  </div>
                )}
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}