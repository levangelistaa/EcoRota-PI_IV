import React, { useState } from 'react';

interface JustificationModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: (justification: string) => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
}

const JustificationModal: React.FC<JustificationModalProps> = ({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = 'Salvar',
    cancelText = 'Cancelar'
}) => {
    const [justification, setJustification] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleConfirm = () => {
        if (!justification.trim() || justification.trim().length < 10) {
            setError('A justificativa deve ter pelo menos 10 caracteres.');
            return;
        }
        onConfirm(justification);
        setJustification('');
        setError('');
    };

    const handleCancel = () => {
        setJustification('');
        setError('');
        onCancel();
    };

    return (
        <>
            <div className="modal fade show d-block modal-backdrop-confirm" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg rounded-4">
                        <div className="modal-header border-0 pb-0">
                            <h5 className="modal-title fw-bold text-dark">{title}</h5>
                            <button type="button" className="btn-close" onClick={handleCancel}></button>
                        </div>
                        <div className="modal-body py-4">
                            <p className="text-secondary mb-3">{message}</p>
                            <textarea
                                className={`form-control ${error ? 'is-invalid' : ''}`}
                                rows={4}
                                placeholder="Digite a justificativa aqui..."
                                value={justification}
                                onChange={(e) => {
                                    setJustification(e.target.value);
                                    if (error) setError('');
                                }}
                            ></textarea>
                            {error && <div className="invalid-feedback">{error}</div>}
                        </div>
                        <div className="modal-footer border-0 pt-0">
                            <button type="button" className="btn btn-light rounded-pill px-4" onClick={handleCancel}>
                                {cancelText}
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-primary rounded-pill px-4" 
                                onClick={handleConfirm}
                            >
                                {confirmText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>
    );
};

export default JustificationModal;
