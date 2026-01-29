import { useState, useEffect } from 'react';
import MapSection from '../components/home/MapSection';
import CalendarSection from '../components/home/CalendarSection';
import Sidebar from '../components/home/Sidebar';
import SubscriptionModal from '../components/common/SubscriptionModal';
import { useAuth } from '../context/AuthContext';
import type { Neighborhood } from '../services/neighborhoodService';
import type { Ecopoint } from '../services/ecopointService';

function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filterTerm, setFilterTerm] = useState('');
    const [selectedItem, setSelectedItem] = useState<Neighborhood | Ecopoint | null>(null);
    const { signed } = useAuth();

    useEffect(() => {
        const hasSubscribed = localStorage.getItem('hasSubscribed');
        
        if (!hasSubscribed && !signed) {
            const timer = setTimeout(() => {
                setIsModalOpen(true);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [signed]);

    return (
        <div className="home-page">
            <MapSection item={selectedItem} />

            <div className="container py-5">
                <div className="row g-4">
                    <CalendarSection filterTerm={filterTerm} />
                    <Sidebar 
                        openSubscriptionModal={() => setIsModalOpen(true)} 
                        onSearchChange={(term: string) => setFilterTerm(term)}
                        onItemSelect={(item) => setSelectedItem(item)}
                    />
                </div>
            </div>

            <SubscriptionModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </div>
    );
}

export default Home;