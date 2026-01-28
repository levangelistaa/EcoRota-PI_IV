import { useState, useEffect } from 'react';
import MapSection from '../components/home/MapSection';
import CalendarSection from '../components/home/CalendarSection';
import Sidebar from '../components/home/Sidebar';
import SubscriptionModal from '../components/common/SubscriptionModal';
import { useAuth } from '../context/AuthContext';

function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { signed } = useAuth();

    useEffect(() => {
        const hasSubscribed = localStorage.getItem('hasSubscribed');
        
        // Don't show modal if already subscribed OR if an admin is logged in
        if (!hasSubscribed && !signed) {
            // Show modal after a small delay for better UX
            const timer = setTimeout(() => {
                setIsModalOpen(true);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [signed]);

    return (
        <div className="home-page">
            <MapSection />

            <div className="container py-5">
                <div className="row g-4">
                    <CalendarSection />
                    <Sidebar openSubscriptionModal={() => setIsModalOpen(true)} />
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