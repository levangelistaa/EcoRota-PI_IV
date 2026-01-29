import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaUsers, FaMapMarkedAlt, FaExclamationTriangle, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { neighborhoodService } from '../../services/neighborhoodService';
import { subscriberService } from '../../services/subscriberService';
import { reportService } from '../../services/reportService';

interface DashboardStatistics {
  neighborhoodsCount: number;
  activeSubscribersCount: number;
  pendingReportsCount: number;
}

const Dashboard: React.FC = () => {
    const { administrator, signOut } = useAuth();
    const [stats, setStats] = useState<DashboardStatistics | null>(null);

    useEffect(() => {
        loadStats();
    }, []);

    async function loadStats() {
        try {
            const [neighborhoods, subscribers, reports] = await Promise.all([
                neighborhoodService.list(),
                subscriberService.list(),
                reportService.list()
            ]);
            
            setStats({
                neighborhoodsCount: neighborhoods.length,
                activeSubscribersCount: subscribers.length,
                pendingReportsCount: reports.filter(r => r.status === 'PENDING').length
            });
        } catch (error) {
            console.error('Erro ao carregar estatísticas:', error);
        }
    }

    const modules = [
        { 
            title: 'Bairros e Rotas', 
            icon: <FaMapMarkedAlt />, 
            count: stats ? `${stats.neighborhoodsCount} Bairros` : 'Carregando...', 
            color: 'bg-primary' 
        },
        { 
            title: 'Assinantes', 
            icon: <FaUsers />, 
            count: stats ? `${stats.activeSubscribersCount} Ativos` : 'Carregando...', 
            color: 'bg-success' 
        },
        { 
            title: 'Relatos de Problemas', 
            icon: <FaExclamationTriangle />, 
            count: stats ? `${stats.pendingReportsCount} Pendentes` : 'Carregando...', 
            color: 'bg-warning' 
        },
    ];

    return (
        <div className="container py-5">
            <header className="d-flex justify-content-between align-items-center mb-5">
                <div>
                    <h1 className="fw-bold text-dark">Bem-vindo, {administrator?.name}</h1>
                    <p className="text-secondary text-uppercase small ls-wider">Painel de Administração do EcoRota</p>
                </div>
                <div className="d-flex gap-2">
                    <Link to="/admin/profile" className="btn btn-outline-primary d-flex align-items-center gap-2">
                        <FaUser /> Perfil
                    </Link>
                    <button className="btn btn-outline-danger d-flex align-items-center gap-2" onClick={signOut}>
                        <FaSignOutAlt /> Sair
                    </button>
                </div>
            </header>

            <div className="row g-4 mb-5">
                {modules.map((m, i) => (
                    <div className="col-md-4" key={i}>
                        <div className={`card border-0 shadow-sm rounded-4 p-4 text-white ${m.color}`}>
                            <div className="d-flex justify-content-between align-items-start">
                                <div className="fs-1 opacity-50">{m.icon}</div>
                                <div className="text-end">
                                    <h3 className="h5 mb-1">{m.title}</h3>
                                    <p className="mb-0 fw-bold">{m.count}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-4">
                <h4 className="fw-bold mb-4">Gerenciar Recursos</h4>
                <div className="row g-3">
                    <div className="col-md-6 col-lg-4">
                        <Link to="/admin/neighborhoods" className="btn btn-outline-primary w-100 py-3 rounded-3 d-flex align-items-center justify-content-center gap-2">
                            <FaMapMarkedAlt /> Bairros
                        </Link>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <Link to="/admin/subscribers" className="btn btn-outline-success w-100 py-3 rounded-3 d-flex align-items-center justify-content-center gap-2">
                            <FaUsers /> Assinantes
                        </Link>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <Link to="/admin/users" className="btn btn-outline-dark w-100 py-3 rounded-3 d-flex align-items-center justify-content-center gap-2">
                            <FaUsers /> Administradores
                        </Link>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <Link to="/admin/routes" className="btn btn-outline-info w-100 py-3 rounded-3 d-flex align-items-center justify-content-center gap-2">
                            <FaMapMarkedAlt /> Rotas
                        </Link>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <Link to="/admin/ecopoints" className="btn btn-outline-success w-100 py-3 rounded-3 d-flex align-items-center justify-content-center gap-2">
                            <FaMapMarkedAlt /> Ecopontos
                        </Link>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <Link to="/admin/reports" className="btn btn-outline-warning w-100 py-3 rounded-3 d-flex align-items-center justify-content-center gap-2">
                            <FaExclamationTriangle /> Problemas Reportados
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
