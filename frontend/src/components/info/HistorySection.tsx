import React from 'react';
import { FaHistory, FaAward, FaUsers, FaLeaf } from 'react-icons/fa';

const HistorySection: React.FC = () => {
    return (
        <section id="historia" className="mb-5">
            <div className="card border-0 shadow-lg overflow-hidden rounded-4">
                <div className="card-header bg-success text-white p-4 text-center border-0 background-gradient-green">
                    <FaHistory size={48} className="mb-3 opacity-75" />
                    <h2 className="fw-bold mb-1">Trajetória da RECICRATIÚ</h2>
                    <p className="opacity-90 mb-0">Transformando vidas e o meio ambiente desde 2010</p>
                </div>
                <div className="card-body p-4 p-lg-5 bg-white">
                    <div className="row g-4 align-items-center">
                        <div className="col-lg-6">
                            <h4 className="text-success fw-bold mb-3">Nossa Origem</h4>
                            <p className="text-muted lead fs-6">
                                A <strong>Associação de Catadores de Materiais Recicláveis de Crateús (RECICRATIÚ)</strong> nasceu em 2010, fruto da luta de trabalhadores que buscavam dignidade e reconhecimento. 
                                O que começou como um pequeno grupo se tornou uma força vital para a sustentabilidade da nossa região.
                            </p>
                            <p className="text-muted">
                                Nosso foco vai além da coleta: trabalhamos pela <strong>inclusão social</strong>, garantindo renda justa para dezenas de famílias, e pela <strong>educação ambiental</strong>, conscientizando a população sobre a importância do descarte correto.
                            </p>
                        </div>
                        <div className="col-lg-6">
                            <div className="d-flex flex-column gap-3">
                                <div className="d-flex align-items-start gap-3 p-3 rounded-3 bg-light border border-light-subtle hover-shadow transition-all">
                                    <div className="bg-success text-white rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                                        <FaAward size={24} />
                                    </div>
                                    <div>
                                        <h6 className="fw-bold text-dark mb-1">Reconhecimento Nacional</h6>
                                        <p className="text-secondary small mb-0">
                                            Em 2013, fomos honrados com o <strong>Selo Pró-Catador</strong> do Governo Federal, certificando a qualidade e impacto do nosso trabalho.
                                        </p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-start gap-3 p-3 rounded-3 bg-light border border-light-subtle hover-shadow transition-all">
                                    <div className="bg-primary text-white rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                                        <FaUsers size={24} />
                                    </div>
                                    <div>
                                        <h6 className="fw-bold text-dark mb-1">Impacto Social</h6>
                                        <p className="text-secondary small mb-0">
                                            Geramos emprego e renda, tirando catadores da informalidade e proporcionando condições de trabalho seguras e dignas.
                                        </p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-start gap-3 p-3 rounded-3 bg-light border border-light-subtle hover-shadow transition-all">
                                    <div className="bg-warning text-white rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                                        <FaLeaf size={24} />
                                    </div>
                                    <div>
                                        <h6 className="fw-bold text-dark mb-1">Compromisso Ambiental</h6>
                                        <p className="text-secondary small mb-0">
                                            Retiramos toneladas de resíduos das ruas mensalmente, devolvendo-os à cadeia produtiva e preservando os recursos naturais.
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

export default HistorySection;
