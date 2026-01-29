import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

interface PartnerCardProps {
    nome: string;
    qtd: number;
}

const PartnerCard: React.FC<PartnerCardProps> = ({ nome, qtd }) => {
    return (
        <div className="col-md-4 col-lg-3">
            <div className="card h-100 border-0 shadow-sm text-center p-3 hover-lift border-top border-success border-5 rounded-4 bg-white">
                <div className="card-body">
                    <div className="text-success mb-3 bg-light d-inline-flex p-3 rounded-circle">
                        <FaMapMarkerAlt size={28} />
                    </div>
                    <h6 className="fw-bold mb-1">{nome}</h6>
                    <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-2 mt-2">
                        {qtd} {qtd > 1 ? 'Ecopontos' : 'Ecoponto'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PartnerCard;
