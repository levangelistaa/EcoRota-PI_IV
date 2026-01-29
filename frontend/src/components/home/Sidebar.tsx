import React, { useEffect, useState } from 'react';
import { FaSearch, FaHistory } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
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
    onSearchChange: (searchTerm: string) => void;
    onItemSelect: (item: Neighborhood | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ openSubscriptionModal, onSearchChange, onItemSelect }) => {
    const { signed, isSubscriber } = useAuth();
    const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredNeighborhoods, setFilteredNeighborhoods] = useState<Neighborhood[]>([]);
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
        onSearchChange(searchTerm);
        if (!searchTerm.trim()) {
            onItemSelect(null);
            setFilteredNeighborhoods([]);
            setShowResults(false);
            return;
        }

        const searchTermLower = searchTerm.toLowerCase();

        const filteredN = neighborhoods.filter(n =>
            n.name.toLowerCase().includes(searchTermLower)
        );

        setFilteredNeighborhoods(filteredN);
        setShowResults(true);

        const exactN = neighborhoods.find(n => n.name.toLowerCase() === searchTermLower);
        if (exactN) {
            onItemSelect(exactN);
        } else {
            onItemSelect(null);
        }
    }, [searchTerm, neighborhoods, onSearchChange, onItemSelect]);

    function handleSelect(item: Neighborhood) {
        setSearchTerm(item.name);
        setShowResults(false);
        onItemSelect(item);
    }

    function handleReportClick() {
        if (!isSubscriber) {
            toast.error('Apenas usuários inscritos podem relatar problemas. Por favor, inscreva-se primeiro!', {
                duration: 5000
            });
            openSubscriptionModal();
            return;
        }
        setIsReportModalOpen(true);
    }

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
                
                {showResults && filteredNeighborhoods.length > 0 && (
                    <div className="search-results-dropdown z-1000 max-h-200">
                        {filteredNeighborhoods.map(neighborhood => (
                            <div 
                                key={`n-${neighborhood.id}`}
                                className="search-result-item cursor-pointer"
                                onClick={() => handleSelect(neighborhood)}
                            >
                                <div className="d-flex align-items-center justify-content-between">
                                    <strong>{neighborhood.name}</strong>
                                    <span className="badge bg-primary-subtle text-primary border border-primary-subtle br-8 small">Bairro</span>
                                </div>
                                <small className="text-muted d-block">CEP: {neighborhood.postalCode}</small>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {!signed ? (
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

                        {isSubscriber && (
                            <button 
                                className="btn btn-outline-light fw-bold w-100 py-2 br-12 d-flex align-items-center justify-content-center gap-2"
                                onClick={() => setIsHistoryModalOpen(true)}
                            >
                                <FaHistory size={14} /> Meus Relatos
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <div id="admin-shortcut" className="card bg-success text-white p-4 text-center border-0 rounded-4 shadow border-bottom border-success border-4">
                    <h3 className="h5 fw-bold">Painel do Servidor</h3>
                    <p className="small text-white text-opacity-75 mb-4">Você está conectado como administrador.</p>
                    
                    <div className="d-flex flex-column gap-2">
                        <a 
                            href="/admin/dashboard" 
                            className="btn btn-light text-success fw-bold w-100 py-2 br-12 shadow-sm"
                        >
                            Acessar Dashboard
                        </a>
                    </div>
                </div>
            )}

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
