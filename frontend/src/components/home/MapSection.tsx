import type { Neighborhood } from '../../services/neighborhoodService';
import type { Ecopoint } from '../../services/ecopointService';

interface MapSectionProps {
    item: Neighborhood | Ecopoint | null;
}

const MapSection: React.FC<MapSectionProps> = ({ item }) => {
    let mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63575.736269348825!2d-40.698428102633876!3d-5.186403600292874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x796f04deb335aa7%3A0x1db43189e3269198!2sCrate%C3%BAs%2C%20CE!5e0!3m2!1spt-BR!2sbr!4v1764565561476!5m2!1spt-BR!2sbr";

    if (item) {
        let query = '';

        if (item.latitude && item.longitude) {
            // Priority 1: Geographic Coordinates
            query = `${item.latitude},${item.longitude}`;
        } else if ('postalCode' in item && item.postalCode) {
            // Priority 2: CEP (only for Neighborhoods)
            query = encodeURIComponent(`${item.postalCode}, Crateús, CE`);
        } else {
            // Priority 3: Name
            query = encodeURIComponent(`${item.name}, Crateús, CE`);
        }
        
        mapSrc = `https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    }

    return (
        <div id="mapa" className="shadow-sm bg-light w-100 h-350 overflow-hidden text-center">
            <iframe
                src={mapSrc}
                title={item ? `Mapa de ${item.name}` : "Mapa de Crateús"}
                className="w-100 h-100 border-0"
                allowFullScreen
                loading="lazy"
            ></iframe>
        </div>
    );
};

export default MapSection;
