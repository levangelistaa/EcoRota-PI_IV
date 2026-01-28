import { useEffect, useState } from 'react';
import PartnerCard from '../components/ecopontos/PartnerCard';
import BecomePartner from '../components/ecopontos/BecomePartner';
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
        <div className="container py-5">
            {/* CABEÇALHO */}
            <section className="text-center mb-5">
                <h1 className="fw-bolder text-success display-4">Nossos Ecopontos</h1>
                <p className="lead text-secondary mx-auto mw-800">
                    Encontre os pontos de entrega voluntária mantidos pelos nossos parceiros em Crateús.
                </p>
            </section>

            {/* GRID DE PARCEIROS */}
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

            <BecomePartner />
        </div>
    );
};

export default Ecopontos;