import React, { useEffect, useState } from 'react';
import { FaSearch, FaHistory } from 'react-icons/fa';
import { neighborhoodService } from '../../services/neighborhoodService';
import type { Neighborhood } from '../../services/neighborhoodService';
import { subscriberService } from '../../services/subscriberService';
import type { Subscriber } from '../../services/subscriberService';
import { toast } from 'react-hot-toast';
import ReportProblemModal from '../common/ReportProblemModal';
import UserReportsModal from '../common/UserReportsModal';
import ReportDetailsModal from '../common/ReportDetailsModal';
import type { ProblemReport } from '../../services/reportService';

interface SidebarProps {
    openSubscriptionModal: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ openSubscriptionModal }) => {
    const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredResults, setFilteredResults] = useState<Neighborhood[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    const [selectedReportForDetail, setSelectedReportForDetail] = useState<ProblemReport | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            const [neighborhoodsData, subscribersData] = await Promise.all([
                neighborhoodService.list(),
                subscriberService.list()
            ]);
            setNeighborhoods(neighborhoodsData);
            setSubscribers(subscribersData);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
    }

    useEffect(() => {
        if (searchTerm.trim()) {
            const filtered = neighborhoods.filter(n =>
                n.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredResults(filtered);
            setShowResults(true);
        } else {
            setFilteredResults([]);
            setShowResults(false);
        }
    }, [searchTerm, neighborhoods]);

    function handleSelectNeighborhood(neighborhood: Neighborhood) {
        setSearchTerm(neighborhood.name);
        setShowResults(false);
    }

    function handleReportClick() {
        const subscriberData = localStorage.getItem('subscriberData');
        if (!subscriberData) {
            toast.error('Apenas usuários inscritos podem relatar problemas. Por favor, inscreva-se primeiro!', {
                duration: 5000
            });
            openSubscriptionModal();
            return;
        }
        setIsReportModalOpen(true);
    }

    const hasSubscription = !!localStorage.getItem('subscriberData');

    function getNeighborhoodName(subscriberId: number): string {
        const sub = subscribers.find(s => s.id === subscriberId);
        if (!sub) return 'Assinante não encontrado';
        return neighborhoods.find(n => n.id === sub.neighborhoodId)?.name || 'Bairro N/A';
    }

    function getSubscriberEmail(subscriberId: number): string {
        return subscribers.find(s => s.id === subscriberId)?.email || 'E-mail não encontrado';
    }

    return (
        <aside className="col-lg-4 d-flex flex-column gap-3">
            <div id="buscar-bairro" className="position-relative">
                <div className="input-group shadow-sm">
                    <span className="input-group-text bg-white border-end-0">
                        <FaSearch className="text-muted" />
                    </span>
                    <input 
                        type="text" 
                        className="form-control border-start-0" 
                        placeholder="Procurar seu bairro..." 
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        onFocus={() => searchTerm && setShowResults(true)}
                    />
                </div>
                
                {showResults && filteredResults.length > 0 && (
                    <div className="search-results-dropdown z-1000 max-h-200">
                        {filteredResults.map(neighborhood => (
                            <div 
                                key={neighborhood.id}
                                className="search-result-item cursor-pointer"
                                onClick={() => handleSelectNeighborhood(neighborhood)}
                            >
                                <strong>{neighborhood.name}</strong>
                                <small className="text-muted d-block">CEP: {neighborhood.postalCode}</small>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div id="relatar-problema" className="card bg-dark text-white p-4 text-center border-0 rounded-4 shadow">
                <h3 className="h5">Dúvidas sobre a coleta?</h3>
                <p className="small text-secondary mb-4">Consulte os horários ou relate problemas abaixo.</p>
                
                <div className="d-flex flex-column gap-2">
                    <button 
                        className="btn btn-success fw-bold w-100 py-2 br-12"
                        onClick={handleReportClick}
                    >
                        Relatar Problema
                    </button>

                    {hasSubscription && (
                        <button 
                            className="btn btn-outline-light fw-bold w-100 py-2 br-12 d-flex align-items-center justify-content-center gap-2"
                            onClick={() => setIsHistoryModalOpen(true)}
                        >
                            <FaHistory size={14} /> Meus Relatos
                        </button>
                    )}
                </div>
            </div>

            <ReportProblemModal 
                isOpen={isReportModalOpen} 
                onClose={() => setIsReportModalOpen(false)} 
            />

            <UserReportsModal 
                isOpen={isHistoryModalOpen}
                onClose={() => setIsHistoryModalOpen(false)}
                onViewDetail={(report) => {
                    setSelectedReportForDetail(report);
                }}
            />

            <ReportDetailsModal 
                isOpen={!!selectedReportForDetail}
                report={selectedReportForDetail}
                neighborhoodName={selectedReportForDetail ? getNeighborhoodName(selectedReportForDetail.subscriberId) : ''}
                subscriberEmail={selectedReportForDetail ? getSubscriberEmail(selectedReportForDetail.subscriberId) : ''}
                onClose={() => setSelectedReportForDetail(null)}
            />
        </aside>
    );
};

export default Sidebar;
