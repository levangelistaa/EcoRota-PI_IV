import React, { useEffect, useState } from 'react';
import { FaTimes, FaHistory, FaEye, FaSearch } from 'react-icons/fa';
import { reportService } from '../../services/reportService';
import type { ProblemReport } from '../../services/reportService';
import { toast } from 'react-hot-toast';

interface UserReportsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onViewDetail: (report: ProblemReport) => void;
}

const UserReportsModal: React.FC<UserReportsModalProps> = ({ isOpen, onClose, onViewDetail }) => {
    const [reports, setReports] = useState<ProblemReport[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen) {
            loadUserReports();
        }
    }, [isOpen]);

    async function loadUserReports() {
        try {
            setLoading(true);
            const subscriberData = localStorage.getItem('subscriberData');
            if (!subscriberData) {
                setReports([]);
                return;
            }

            const { id: subscriberId } = JSON.parse(subscriberData);
            const allReports = await reportService.list();
            
            // Note: Since we don't have a specific endpoint for user reports, 
            // we filter on front as per previous strategy.
            const userReports = allReports.filter(r => r.subscriberId === subscriberId);
            
            // Sort by date (newest first)
            userReports.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            
            setReports(userReports);
        } catch (error) {
            console.error('Erro ao carregar seus relatos:', error);
            toast.error('Não foi possível carregar seu histórico de relatos.');
        } finally {
            setLoading(false);
        }
    }

    if (!isOpen) return null;

    const getStatusBadge = (status: ProblemReport['status']) => {
        switch (status) {
            case 'PENDING': return <span className="badge bg-warning text-dark px-2 py-1 br-8">Pendente</span>;
            case 'IN_ANALYSIS': return <span className="badge bg-info text-dark px-2 py-1 br-8">Em Análise</span>;
            case 'RESOLVED': return <span className="badge bg-success text-white px-2 py-1 br-8">Resolvido</span>;
            case 'REJECTED': return <span className="badge bg-danger text-white px-2 py-1 br-8">Rejeitado</span>;
            default: return <span className="badge bg-secondary px-2 py-1 br-8">{status}</span>;
        }
    };

    return (
        <div className="modal-entrance-wrapper">
            <div className="modal-dialog modal-lg w-100 mw-800">
                <div className="modal-content modal-entrance-content br-24 overflow-hidden border-0 shadow-lg">
                    {/* Header */}
                    <div className="bg-dark text-white p-4 text-center position-relative">
                        <button 
                            onClick={onClose}
                            className="btn border-0 p-2 position-absolute top-0 end-0 mt-2 me-2 text-white hover-opacity"
                        >
                            <FaTimes size={20} />
                        </button>
                        <div className="mb-2 bg-success rounded-circle d-inline-flex p-3 shadow-sm">
                            <FaHistory size={26} />
                        </div>
                        <h4 className="fw-bold mb-0">Meu Histórico de Relatos</h4>
                        <p className="small text-secondary mb-0 mt-1">Acompanhe o status dos problemas que você reportou</p>
                    </div>

                    <div className="p-4 bg-white" style={{ minHeight: '300px', maxHeight: '60vh', overflowY: 'auto' }}>
                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-success mb-3"></div>
                                <p className="text-muted">Carregando seus relatos...</p>
                            </div>
                        ) : reports.length === 0 ? (
                            <div className="text-center py-5">
                                <div className="mb-3 opacity-25">
                                    <FaSearch size={50} />
                                </div>
                                <h5 className="text-muted">Nenhum relato encontrado</h5>
                                <p className="small text-secondary">Você ainda não reportou nenhum problema ou seus relatos foram removidos.</p>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Protocolo</th>
                                            <th>Tipo / Descrição</th>
                                            <th>Status</th>
                                            <th className="text-center">Ação</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reports.map((report) => (
                                            <tr key={report.id}>
                                                <td>
                                                    <span className="fw-bold text-success small">{report.protocol}</span>
                                                    <div className="text-muted" style={{ fontSize: '10px' }}>
                                                        {new Date(report.createdAt).toLocaleDateString('pt-BR')}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="fw-bold small text-dark">{report.problemType}</div>
                                                    <div className="text-truncate text-muted small" style={{ maxWidth: '200px' }}>
                                                        {report.description}
                                                    </div>
                                                </td>
                                                <td>{getStatusBadge(report.status)}</td>
                                                <td className="text-center">
                                                    <button 
                                                        onClick={() => onViewDetail(report)}
                                                        className="btn btn-sm btn-outline-success rounded-circle p-2 d-flex align-items-center justify-content-center mx-auto"
                                                        title="Ver Detalhes"
                                                    >
                                                        <FaEye size={14} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                    
                    <div className="p-3 bg-light text-center border-top">
                        <button onClick={onClose} className="btn btn-secondary px-5 br-12">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserReportsModal;
