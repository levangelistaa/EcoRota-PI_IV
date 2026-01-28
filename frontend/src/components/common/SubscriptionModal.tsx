import React, { useState, useEffect } from 'react';
import { neighborhoodService, type Neighborhood } from '../../services/neighborhoodService';
import { subscriberService } from '../../services/subscriberService';
import { toast } from 'react-hot-toast';
import { FaBell, FaTimes, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

interface SubscriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose }) => {
    const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
    const [form, setForm] = useState({
        email: '',
        street: '',
        number: '',
        complement: '',
        neighborhoodId: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            loadNeighborhoods();
        }
    }, [isOpen]);

    async function loadNeighborhoods() {
        try {
            const data = await neighborhoodService.list();
            setNeighborhoods(data);
        } catch (error) {
            console.error('Erro ao carregar bairros:', error);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        const payload = {
            email: form.email,
            street: form.street,
            number: form.number,
            complement: form.complement || undefined,
            neighborhoodId: Number(form.neighborhoodId)
        };

        try {
            const subscriber = await subscriberService.register(payload);
            toast.success('Inscrição realizada com sucesso! Você receberá atualizações sobre seu bairro.', {
                duration: 6000
            });
            localStorage.setItem('hasSubscribed', 'true');
            const essentialData = { 
                id: subscriber.id, 
                email: subscriber.email,
                neighborhoodId: subscriber.neighborhoodId 
            };
            localStorage.setItem('subscriberData', JSON.stringify(essentialData));
            onClose();
        } catch (error) {
            console.error('Erro ao inscrever:', error);
            toast.error('Erro ao realizar inscrição. Verifique os dados.');
        } finally {
            setLoading(false);
        }
    }

    if (!isOpen) return null;

    return (
        <div className="modal-entrance-wrapper">
            <div className="modal-dialog modal-lg w-100 mw-900">
                <div className="modal-content modal-entrance-content overflow-hidden shadow-lg">
                    <div className="row g-0 opacity-1">
                        {/* Left Side: Visual / Info */}
                        <div className="col-lg-5 d-none d-lg-flex flex-column justify-content-center align-items-center text-white p-5 text-center modal-entrance-info-side">
                                <div className="mb-4 bg-white bg-opacity-25 rounded-circle p-4">
                                    <FaBell size={60} />
                                </div>
                                <h3 className="fw-bold mb-3">Fique por dentro!</h3>
                                <p className="opacity-75">
                                    Inscreva-se para receber avisos sobre coletas de lixo, rotas e eventos especiais no seu bairro.
                                </p>
                            </div>

                            {/* Right Side: Form */}
                            <div className="col-lg-7 p-4 p-md-5 bg-white position-relative">
                                <button 
                                    onClick={onClose}
                                    className="btn border-0 p-2 position-absolute top-0 end-0 mt-3 me-3 text-muted hover-opacity"
                                >
                                    <FaTimes size={24} />
                                </button>

                                <div className="d-lg-none text-center mb-4">
                                    <div className="bg-success d-inline-block rounded-circle p-3 text-white mb-2">
                                        <FaBell size={32} />
                                    </div>
                                    <h4 className="fw-bold">Fique por dentro!</h4>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold text-muted text-uppercase letter-spacing-1">
                                            <FaEnvelope className="me-2" /> E-mail para Avisos
                                        </label>
                                        <input 
                                            type="email" 
                                            className="form-control form-control-lg border-2 br-12" 
                                            required 
                                            placeholder="seu@email.com"
                                            value={form.email}
                                            onChange={e => setForm({...form, email: e.target.value})}
                                        />
                                    </div>

                                    <div className="row g-2 mb-3">
                                        <div className="col-md-8">
                                            <label className="form-label small fw-bold text-muted text-uppercase letter-spacing-1">Rua</label>
                                            <input 
                                                type="text" 
                                                className="form-control border-2 br-12" 
                                                required 
                                                placeholder="Nome da rua"
                                                value={form.street}
                                                onChange={e => setForm({...form, street: e.target.value})}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label small fw-bold text-muted text-uppercase letter-spacing-1">Nº</label>
                                            <input 
                                                type="text" 
                                                className="form-control border-2 br-12" 
                                                required 
                                                placeholder="123"
                                                value={form.number}
                                                onChange={e => setForm({...form, number: e.target.value})}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label small fw-bold text-muted text-uppercase letter-spacing-1">Complemento</label>
                                        <input 
                                            type="text" 
                                            className="form-control border-2 br-12" 
                                            placeholder="Ex: Apto 101, Ao lado da padaria"
                                            value={form.complement}
                                            onChange={e => setForm({...form, complement: e.target.value})}
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label small fw-bold text-muted text-uppercase letter-spacing-1">
                                            <FaMapMarkerAlt className="me-2" /> Seu Bairro
                                        </label>
                                        <select 
                                            className="form-select border-2 br-12" 
                                            required
                                            value={form.neighborhoodId}
                                            onChange={e => setForm({...form, neighborhoodId: e.target.value})}
                                        >
                                            <option value="">Selecione...</option>
                                            {neighborhoods.map(n => (
                                                <option key={n.id} value={n.id}>{n.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="d-grid gap-2">
                                        <button 
                                            type="submit" 
                                            className="btn btn-success btn-lg fw-bold border-0 py-3 shadow-sm hover-grow br-14 btn-green-gradient" 
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                            ) : 'Quero Receber Avisos'}
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={() => {
                                                localStorage.setItem('hasSubscribed', 'dismissed');
                                                onClose();
                                            }}
                                            className="btn btn-link text-muted text-decoration-none small pt-2"
                                        >
                                            Não, obrigado. Não quero ser avisado.
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default SubscriptionModal;
