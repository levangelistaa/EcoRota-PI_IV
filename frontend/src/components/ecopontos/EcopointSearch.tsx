import React, { useState, useEffect } from 'react';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import { ecopointService, type Ecopoint } from '../../services/ecopointService';

interface EcopointSearchProps {
    onEcopointSelect: (ecopoint: Ecopoint | null) => void;
}

const EcopointSearch: React.FC<EcopointSearchProps> = ({ onEcopointSelect }) => {
    const [ecopoints, setEcopoints] = useState<Ecopoint[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEcopoints, setFilteredEcopoints] = useState<Ecopoint[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [selectedEcopoint, setSelectedEcopoint] = useState<Ecopoint | null>(null);

    useEffect(() => {
        loadEcopoints();
    }, []);

    async function loadEcopoints() {
        try {
            const data = await ecopointService.list();
            setEcopoints(data);
        } catch (error) {
            console.error('Erro ao carregar ecopontos:', error);
        }
    }

    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredEcopoints([]);
            setShowResults(false);
            return;
        }

        const filtered = ecopoints.filter(e =>
            e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.partnerName?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredEcopoints(filtered);
        setShowResults(true);
    }, [searchTerm, ecopoints]);

    const handleSelect = (ecopoint: Ecopoint) => {
        setSearchTerm(ecopoint.name);
        setSelectedEcopoint(ecopoint);
        setShowResults(false);
        onEcopointSelect(ecopoint);
    };

    let mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63575.736269348825!2d-40.698428102633876!3d-5.186403600292874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x796f04deb335aa7%3A0x1db43189e3269198!2sCrate%C3%BAs%2C%20CE!5e0!3m2!1spt-BR!2sbr!4v1764565561476!5m2!1spt-BR!2sbr";

    if (selectedEcopoint) {
        let query = '';
        if (selectedEcopoint.latitude && selectedEcopoint.longitude) {
            query = `${selectedEcopoint.latitude},${selectedEcopoint.longitude}`;
        } else {
            query = encodeURIComponent(`${selectedEcopoint.name}, Crateús, CE`);
        }
        mapSrc = `https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    }

    return (
        <div className="row g-4 mb-5 align-items-center">
            {/* Search Input Side - Compacted */}
            <div className="col-lg-4">
                <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                    <h4 className="fw-bold mb-3 d-flex align-items-center gap-2">
                        <FaSearch size={20} className="text-success" />
                        Encontrar
                    </h4>
                    <p className="text-muted small mb-4">
                        Pesquise por nome ou parceiro para localizar no mapa.
                    </p>
                    <div className="position-relative">
                        <div className="input-group shadow-sm br-12 overflow-hidden">
                            <span className="input-group-text bg-white border-end-0 px-2">
                                <FaMapMarkerAlt className="text-success" size={14} />
                            </span>
                            <input 
                                type="text" 
                                className="form-control border-start-0 py-2 small" 
                                placeholder="Buscar ecoponto..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onFocus={() => searchTerm && setShowResults(true)}
                            />
                        </div>

                        {showResults && filteredEcopoints.length > 0 && (
                            <div className="search-results-dropdown z-1000 w-100 mt-1 shadow-lg border-0 rounded-3 overflow-hidden">
                                {filteredEcopoints.map(e => (
                                    <div 
                                        key={e.id}
                                        className="search-result-item p-3 border-bottom border-light cursor-pointer hover-bg-light"
                                        onClick={() => handleSelect(e)}
                                    >
                                        <div className="d-flex align-items-center justify-content-between">
                                            <span className="fw-semibold text-dark small">{e.name}</span>
                                            <span className="badge bg-success-subtle text-success border border-success-subtle smaller-badge">Ecoponto</span>
                                        </div>
                                        {e.partnerName && (
                                            <small className="text-muted d-block mt-1" style={{ fontSize: '0.75rem' }}>
                                                Parceiro: {e.partnerName}
                                            </small>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mini Map Side - Increased */}
            <div className="col-lg-8">
                <div className="card border-0 shadow-lg rounded-4 overflow-hidden h-100 bg-white" style={{ minHeight: '400px' }}>
                    <div className="position-relative w-100 h-100">
                        <iframe
                            src={mapSrc}
                            title={selectedEcopoint ? `Mapa de ${selectedEcopoint.name}` : "Mapa de Crateús"}
                            className="w-100 h-100 border-0"
                            style={{ minHeight: '400px' }}
                            allowFullScreen
                            loading="lazy"
                        ></iframe>
                        {!selectedEcopoint && (
                            <div className="position-absolute top-50 start-50 translate-middle text-center w-100 px-3" style={{ pointerEvents: 'none' }}>
                                <div className="bg-white bg-opacity-75 p-2 rounded shadow-sm d-inline-block border border-success border-opacity-25">
                                    <small className="fw-bold text-success">Selecione um ecoponto para visualizar</small>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EcopointSearch;
