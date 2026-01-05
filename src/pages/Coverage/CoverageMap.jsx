import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


// Fix default marker icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl:
        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl:
        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const CoverageMap = ({sersviceCenters}) => {
    // Center of Bangladesh (Dhaka)
    const position = [23.6850, 90.3563];

    const customIcon = new L.Icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconSize: [40, 40],    
        iconAnchor: [20, 40],      
        // popupAnchor: [0, -40],   
    });

    return (
        <div className="w-full h-[400px] rounded-xl overflow-hidden">
            <MapContainer
                center={position}
                zoom={7}
                scrollWheelZoom={false}
                className="h-full w-full"
            >
                {/* Map tiles */}
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Marker */}
                <Marker position={position} icon={customIcon}>
                    <Popup>
                        We are available across Bangladesh!
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default CoverageMap;
