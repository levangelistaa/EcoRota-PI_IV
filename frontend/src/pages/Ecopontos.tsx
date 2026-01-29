import { useEffect, useState } from 'react';
import PartnerCard from '../components/ecopontos/PartnerCard';
import BecomePartner from '../components/ecopontos/BecomePartner';
import EcopointSearch from '../components/ecopontos/EcopointSearch';
import EcopointInfoSection from '../components/ecopontos/EcopointInfoSection';
import heroBg from '../assets/images/hero-ecopontos.png';
import { ecopointService } from '../services/ecopointService';

interface PartnerGroup {
    nome: string;
    qtd: number;
}

const Ecopontos = () => {
    const [parceiros, setParceiros] = useState<PartnerGroup[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEcopoints();
    }, []);

    async function loadEcopoints() {
        try {
            const ecopoints = await ecopointService.list();
            
            const grouped = ecopoints.reduce((acc, ecopoint) => {
                const groupName = ecopoint.partnerName || ecopoint.name;
                const existing = acc.find(p => p.nome === groupName);
                if (existing) {
                    existing.qtd++;
                } else {
                    acc.push({ nome: groupName, qtd: 1 });
                }
                return acc;
            }, [] as PartnerGroup[]);

            grouped.sort((a, b) => b.qtd - a.qtd);
            
            setParceiros(grouped);
        } catch (error) {
            console.error('Erro ao carregar ecopontos:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="pb-5">
            <div 
                className="py-5 mb-5 shadow-sm border-bottom border-success border-4 d-flex align-items-center" 
                style={{ 
                    backgroundImage: `linear-gradient(rgba(27, 94, 32, 0.6), rgba(0, 0, 0, 0.7)), url(${heroBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '300px'
                }}
            >
                <div className="container py-4 text-center text-white">
                    <h1 className="display-3 fw-bold mb-3 text-shadow-sm">Nossos Ecopontos</h1>
                    <p className="lead mx-auto mw-800 text-white text-opacity-90 fw-semibold">
                        A RECICRATIÚ conta com uma rede de parceiros comprometidos com a sustentabilidade. Encontre o ponto de entrega voluntária mais próximo de você.
                    </p>
                </div>
            </div>

            <div className="container">
                <EcopointSearch onEcopointSelect={(ecopoint) => console.log('Selected:', ecopoint)} />

                <div className="mb-4 text-center text-md-start pt-4 border-top">
                    <h3 className="fw-bold mb-4">Pontos de Coleta por Parceiro</h3>
                </div>

                <div id="parceiros" className="row g-4 mb-5">
                    {loading ? (
                        <div className="col-12 text-center py-5">
                            <div className="spinner-border text-success" role="status">
                                <span className="visually-hidden">Carregando...</span>
                            </div>
                        </div>
                    ) : parceiros.length > 0 ? (
                        parceiros.map((p, index) => (
                            <PartnerCard key={index} nome={p.nome} qtd={p.qtd} />
                        ))
                    ) : (
                        <div className="col-12 text-center py-5">
                            <p className="text-muted">Nenhum ecoponto cadastrado no momento.</p>
                        </div>
                    )}
                </div>

                <EcopointInfoSection />
                <BecomePartner />
            </div>
        </div>
    );
};

export default Ecopontos;