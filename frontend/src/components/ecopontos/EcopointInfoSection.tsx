import React from 'react';
import { FaInfoCircle, FaHandsHelping, FaLeaf, FaCity } from 'react-icons/fa';

const EcopointInfoSection: React.FC = () => {
    return (
        <section className="py-5 mb-5">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                <div className="row g-0">
                    <div className="col-lg-4 background-gradient-green d-flex align-items-center justify-content-center p-5 text-white text-center">
                        <div className="p-2">
                            <FaInfoCircle size={80} className="mb-4 opacity-75" />
                            <h2 className="fw-bold mb-0">O que é um Ecoponto?</h2>
                        </div>
                    </div>
                    <div className="col-lg-8 bg-white p-4 p-md-5">
                        <p className="lead text-muted mb-4">
                            Ecopontos são locais estratégicos de <strong>entrega voluntária</strong> onde cidadãos podem descartar resíduos recicláveis de forma organizada e segura. Eles funcionam como elos fundamentais entre a comunidade e as associações de catadores.
                        </p>
                        
                        <div className="row g-4">
                            <div className="col-md-6">
                                <div className="d-flex gap-3 align-items-start">
                                    <div className="bg-success-subtle p-3 rounded-circle text-success">
                                        <FaHandsHelping size={24} />
                                    </div>
                                    <div>
                                        <h5 className="fw-bold mb-2">Engajamento Social</h5>
                                        <p className="small text-secondary mb-0">
                                            Fortalece o trabalho da <strong>RECICRATIÚ</strong>, garantindo que o material chegue limpo e pronto para a triagem.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="d-flex gap-3 align-items-start">
                                    <div className="bg-success-subtle p-3 rounded-circle text-success">
                                        <FaLeaf size={24} />
                                    </div>
                                    <div>
                                        <h5 className="fw-bold mb-2">Preservação Ambiental</h5>
                                        <p className="small text-secondary mb-0">
                                            Evita o descarte irregular em rios e terrenos baldios, protegendo a biodiversidade local.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="d-flex gap-3 align-items-start">
                                    <div className="bg-success-subtle p-3 rounded-circle text-success">
                                        <FaCity size={24} />
                                    </div>
                                    <div>
                                        <h5 className="fw-bold mb-2">Cidade mais Limpa</h5>
                                        <p className="small text-secondary mb-0">
                                            Contribui diretamente para a saúde pública e a estética urbana da nossa Crateús.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="d-flex gap-3 align-items-start">
                                    <div className="bg-success-subtle p-3 rounded-circle text-success">
                                        <FaLeaf size={24} />
                                    </div>
                                    <div>
                                        <h5 className="fw-bold mb-2">Economia Circular</h5>
                                        <p className="small text-secondary mb-0">
                                            Transforma o que seria "lixo" em recurso econômico, gerando renda para famílias de catadores.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EcopointInfoSection;
