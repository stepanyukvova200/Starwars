import React, { useState } from 'react';
import HeroList from './components/HeroList';
import HeroDetailGraph from './components/HeroDetailGraph';
import './styles/App.css';

const App: React.FC = () => {
    const [selectedHeroId, setSelectedHeroId] = useState<string | null>(null);

    return (
        <div className="app-container">
            <div className="sidebar">
                <HeroList onHeroSelect={setSelectedHeroId} />
            </div>
            <div className="content">
                {selectedHeroId && <HeroDetailGraph heroId={selectedHeroId} />}
            </div>
        </div>
    );
};

export default App;
