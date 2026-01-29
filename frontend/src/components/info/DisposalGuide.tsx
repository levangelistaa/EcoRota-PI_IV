import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from 'react-icons/fa';

const DisposalGuide: React.FC = () => {
    return (
        <section id="materiais" className="mb-5">
            <h2 className="text-center fw-bold mb-4 display-6">Guia de Descarte Correto</h2>
            <div className="row g-4">
                {/* O QUE COLOCAR */}
                <div className="col-lg-6">
                    <div className="card h-100 border-0 shadow-lg rounded-4 overflow-hidden">
                        <div className="card-header bg-success text-white py-4 text-center">
                            <FaCheckCircle size={48} className="mb-2 opacity-75" />
                            <h3 className="fw-bold mb-0">Pode Reciclar</h3>
                        </div>
                        <div className="card-body p-4 p-lg-5 bg-light">
                            <p className="text-center text-muted mb-4 opacity-75">Estes materiais <strong>DEVEM</strong> ser separados para a coleta seletiva:</p>
                            <div className="d-grid gap-3">
                                {[
                                    { label: "Papel", details: "Papelão, jornais, revistas, folhas de caderno, caixas." },
                                    { label: "Plástico", details: "Garrafas PET, embalagens de limpeza, potes (iogurte, margarina)." },
                                    { label: "Vidro", details: "Garrafas, frascos de conserva, copos (cuidado ao manusear)." },
                                    { label: "Metal", details: "Latas de alumínio (cerveja, refrigerante), latas de conserva." }
                                ].map((item, idx) => (
                                    <div key={idx} className="d-flex align-items-center bg-white p-3 rounded-3 shadow-sm border-start border-success border-5 h-100">
                                        <div className="flex-grow-1">
                                            <h6 className="fw-bold text-success mb-1">{item.label}</h6>
                                            <p className="text-muted small mb-0">{item.details}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* O QUE NÃO COLOCAR */}
                <div className="col-lg-6">
                    <div className="card h-100 border-0 shadow-lg rounded-4 overflow-hidden">
                        <div className="card-header bg-danger text-white py-4 text-center">
                            <FaTimesCircle size={48} className="mb-2 opacity-75" />
                            <h3 className="fw-bold mb-0">Não Reciclamos</h3>
                        </div>
                        <div className="card-body p-4 p-lg-5 bg-light">
                            <p className="text-center text-muted mb-4 opacity-75">Estes itens <strong>NÃO</strong> devem ir para a coleta seletiva comum:</p>
                            <div className="d-grid gap-3 mb-4">
                                {[
                                    { label: "Orgânicos", details: "Restos de comida, cascas de frutas, folhas." },
                                    { label: "Perigosos", details: "Pilhas, baterias, tintas, solventes." },
                                    { label: "Hospitalares", details: "Seringas, agulhas, curativos." },
                                    { label: "Rejeitos", details: "Papel higiênico, fraldas, absorventes, guardanapos sujos." }
                                ].map((item, idx) => (
                                    <div key={idx} className="d-flex align-items-center bg-white p-3 rounded-3 shadow-sm border-start border-danger border-4 h-100">
                                        <div className="flex-grow-1">
                                            <h6 className="fw-bold text-danger mb-1">{item.label}</h6>
                                            <small className="text-muted">{item.details}</small>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="alert alert-warning d-flex align-items-center gap-3 border-0 shadow-sm rounded-3 mb-0">
                                <FaExclamationTriangle className="text-warning fs-3 flex-shrink-0" />
                                <div>
                                    <small className="fw-bold text-dark d-block">Atenção Especial!</small>
                                    <small className="text-muted">Pilhas e lâmpadas devem ser levadas a pontos de coleta específicos ou à SEMAM.</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DisposalGuide;
