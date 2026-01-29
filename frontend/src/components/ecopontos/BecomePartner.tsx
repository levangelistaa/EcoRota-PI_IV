import React from 'react';
import { FaHandshake, FaWhatsapp } from 'react-icons/fa';
import qrcode from '../../images/QRCODE.png';

const BecomePartner: React.FC = () => {
    return (
        <section id="como-contribuir" className="bg-dark text-white rounded-5 p-4 p-lg-5 shadow-lg position-relative overflow-hidden mb-5">
            {/* Background Icon - More subtle to avoid overlap issues */}
            <div className="position-absolute top-50 end-0 translate-middle-y p-5 opacity-05 d-none d-lg-block" style={{ opacity: 0.05 }}>
                <FaHandshake size={300} />
            </div>
            
            <div className="row align-items-center position-relative">
                <div className="col-lg-7">
                    <div className="d-inline-flex align-items-center bg-success bg-opacity-25 text-success px-3 py-1 rounded-pill mb-4 fw-bold small">
                        <FaHandshake className="me-2" /> SEJA UM PARCEIRO
                    </div>
                    <h2 className="fw-bold display-6 mb-4">
                        Sua empresa pode fazer a diferença
                    </h2>
                    <p className="text-white text-opacity-75 lead fs-6 mb-5">
                        Junte-se à rede de sustentabilidade de Crateús. Ao hospedar um ecoponto, sua empresa demonstra compromisso ambiental e atrai clientes conscientes.
                    </p>
                    
                    <div className="d-flex flex-wrap align-items-center gap-4">
                        <div className="d-flex align-items-center gap-3 bg-white bg-opacity-10 p-3 rounded-4 border border-white border-opacity-10">
                            <div className="bg-success text-white p-3 rounded-circle shadow-sm">
                                <FaWhatsapp size={28} />
                            </div>
                            <div>
                                <span className="d-block small text-white text-opacity-50 text-uppercase letter-spacing-1">Disque Coleta Seletiva</span>
                                <span className="fs-5 fw-bold font-monospace">(88) 9 9452-5936</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-5 text-center mt-5 mt-lg-0">
                    <div className="bg-white p-4 rounded-4 d-inline-block shadow-lg hover-lift border border-light">
                        <img
                            src={qrcode}
                            alt="QR Code para contacto"
                            className="img-180 mb-3"
                        />
                        <p className="text-dark small fw-bold mb-0">Escaneie para contato direto</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BecomePartner;
