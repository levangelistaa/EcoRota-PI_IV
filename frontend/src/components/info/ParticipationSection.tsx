import React from 'react';
import { FaBullhorn, FaRecycle, FaHandSparkles, FaCompressArrowsAlt } from 'react-icons/fa';

const ParticipationSection: React.FC = () => {
    const steps = [
        { 
            id: 1, 
            icon: <FaRecycle size={32} />, 
            title: "Separação", 
            description: "Tenha duas lixeiras: uma para **resíduos secos** (papel, plástico, vidro, metal) e outra para **orgânicos/úmidos**." 
        },
        { 
            id: 2, 
            icon: <FaHandSparkles size={32} />, 
            title: "Higienização", 
            description: "Passe uma água rápida nas embalagens de alimento para remover excessos. Isso evita mau cheiro e atração de insetos." 
        },
        { 
            id: 3, 
            icon: <FaCompressArrowsAlt size={32} />, 
            title: "Compactação", 
            description: "Amasse garrafas PET, latas e desmonte caixas de papelão. Isso otimiza o espaço no caminhão e na sua lixeira." 
        }
    ];

    return (
        <section id="coleta" className="mb-5">
            <div className="text-center mb-5">
                <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill fw-bold small text-uppercase letter-spacing-1 mb-2">
                    Faça sua parte
                </span>
                <h2 className="fw-bold display-6">Como Participar da Coleta Seletiva</h2>
                <p className="text-muted mx-auto mw-600">
                    Siga estes 3 passos simples para garantir que seus resíduos sejam reciclados corretamente.
                </p>
            </div>

            <div className="row g-4 mb-4">
                {steps.map((step) => (
                    <div className="col-md-4" key={step.id}>
                        <div className="card h-100 border-0 shadow-sm hover-lift transition-all p-3 text-center rounded-4">
                            <div className="card-body">
                                <div className="d-inline-flex align-items-center justify-content-center bg-success text-white rounded-circle mb-4 shadow-sm" style={{ width: '80px', height: '80px' }}>
                                    {step.icon}
                                </div>
                                <h4 className="fw-bold mb-3">{step.title}</h4>
                                <p className="text-muted">
                                    {step.description.split('**').map((part, index) => 
                                        index % 2 === 1 ? <strong key={index} className="text-success">{part}</strong> : part
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="alert alert-success d-flex align-items-start align-items-md-center gap-3 p-4 rounded-4 shadow-sm border-0 bg-success bg-opacity-10" role="alert">
                <div className="bg-success text-white p-3 rounded-circle flex-shrink-0 shadow-sm">
                    <FaBullhorn size={24} />
                </div>
                <div>
                    <h5 className="alert-heading fw-bold text-success mb-1">Dica Importante!</h5>
                    <p className="mb-0 text-dark opacity-75">
                        Os caminhões da coleta seletiva tocam uma <strong>"musiquinha de flauta"</strong> característica. Quando ouvir, é hora de colocar seus recicláveis na calçada!
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ParticipationSection;
