import React, { useEffect, useState } from 'react';
import { fetchHeroes } from '../services/starWarsAPI';
import Loader from './Loader';
import '../styles/HeroList.css';

const HeroList: React.FC<{ onHeroSelect: (id: string) => void }> = ({ onHeroSelect }) => {
    const [heroes, setHeroes] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadHeroes = async () => {
            setLoading(true);
            const data = await fetchHeroes(page);
            setHeroes((prev) => [...prev, ...data.results]);
            setLoading(false);
        };
        loadHeroes();
    }, [page]);

    const loadMore = () => setPage((prevPage) => prevPage + 1);

    return (
        <div className="hero-list">
            <ul className="hero-list-items">
                {heroes.map((hero) => (
                    <li
                        key={hero.url}
                        onClick={() => onHeroSelect(hero.url.split('/').slice(-2, -1)[0])}
                        className="hero-list-item"
                    >
                        {hero.name}
                    </li>
                ))}
            </ul>
            {loading ? <Loader /> : <button className="load-more" onClick={loadMore}>Load More</button>}
        </div>
    );
};

export default HeroList;
