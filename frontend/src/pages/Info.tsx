import HistorySection from '../components/info/HistorySection';
import ParticipationSection from '../components/info/ParticipationSection';
import DisposalGuide from '../components/info/DisposalGuide';
import SpecialMaterials from '../components/info/SpecialMaterials';
import heroBg from '../assets/images/hero-info.png';

const Info = () => {
    return (
        <div className="pb-5">
            {/* Hero Section - Visual Eco Hero */}
            <div 
                className="py-5 mb-5 shadow-sm border-bottom border-success border-4 d-flex align-items-center" 
                style={{ 
                    backgroundImage: `linear-gradient(rgba(27, 94, 32, 0.6), rgba(0, 0, 0, 0.7)), url(${heroBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '300px'
                }}
            >
                <div className="container py-4 text-center text-white">
                    <h1 className="display-3 fw-bold mb-3 text-shadow-sm">Central de Informações</h1>
                    <p className="lead mx-auto mw-800 text-white text-opacity-90 fw-semibold">
                        Tudo o que você precisa saber sobre a RECICRATIÚ, o processo de coleta seletiva e como descartar seus resíduos com responsabilidade.
                    </p>
                </div>
            </div>

            <div className="container">
                <HistorySection />
                <ParticipationSection />
                <DisposalGuide />
                <SpecialMaterials />
            </div>
        </div>
    );
};

export default Info;
