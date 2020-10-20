import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapIcon from '../utils/mapIcon'

import mapMarkerImg from '../images/local.svg';

import '../styles/pages/orfanato-map.css';
import api from '../services/api';

interface Orfanato {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrfanatoMap() {
    const [orfanatos, setOrfanatos] = useState<Orfanato[]>([]);

    console.log(orfanatos);

    useEffect(() => {
        api.get('orfanatos').then(response => {
            setOrfanatos(response.data);
        })
    }, []);


    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />

                    <h2>Escolha um orfanato no map</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Osasco</strong>
                    <span>São Paulo</span>
                </footer>
            </aside>

            <Map
                center={[-23.5028905, -46.7745237]}
                zoom={13.75}
                style={{ width: '100%', height: '100%' }}
            >
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
                <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                {orfanatos.map(orfanato => {
                    return (
                        <Marker
                            key={orfanato.id}
                            icon={mapIcon}
                            position={[orfanato.latitude, orfanato.longitude]}
                        >
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                {orfanato.name}
                                <Link to={`/orfanatos/${orfanato.id}`}>
                                    <FiArrowRight size={20} color="#FFF" />
                                </Link>
                            </Popup>
                        </Marker>
                    )
                })}
            </Map>

            <Link to="/orfanatos/create" className="create-orfanato">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    )
}

export default OrfanatoMap;