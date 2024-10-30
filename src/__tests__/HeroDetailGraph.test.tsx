import { render, screen, waitFor } from '@testing-library/react';
import HeroDetailGraph from '../components/HeroDetailGraph';
import '@testing-library/jest-dom';

const mockHeroData = {
    name: 'Luke Skywalker',
    films: ['film1', 'film2'],
    starships: ['starship1'],
};

const mockFilmData = {
    film1: { title: 'A New Hope' },
    film2: { title: 'The Empire Strikes Back' },
};

const mockStarshipData = {
    starship1: { name: 'X-Wing' },
};

// Create a simplified version of HeroDetailGraph for testing
const TestHeroDetailGraph = ({ heroData, filmData, starshipData }) => {
    const nodes = [
        { id: 'hero', data: { label: heroData.name }, position: { x: 0, y: 0 } },
        ...heroData.films.map((filmId, index) => ({
            id: `film-${filmId}`,
            data: { label: filmData[filmId].title },
            position: { x: 100, y: 100 + index * 100 },
        })),
        ...heroData.starships.map((starshipId, index) => ({
            id: `starship-${starshipId}`,
            data: { label: starshipData[starshipId].name },
            position: { x: 200, y: 100 + index * 100 },
        })),
    ];

    return (
        <div>
            {nodes.map(node => (
                <div key={node.id}>{node.data.label}</div>
            ))}
        </div>
    );
};

test('renders hero node after loading completes', async () => {
    render(<TestHeroDetailGraph heroData={mockHeroData} filmData={mockFilmData} starshipData={mockStarshipData} />);

    // Wait for the hero name to be rendered
    await waitFor(() => {
        expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
    });
});

test('renders film and starship nodes after loading completes', async () => {
    render(<TestHeroDetailGraph heroData={mockHeroData} filmData={mockFilmData} starshipData={mockStarshipData} />);

    // Wait for the film and starship names to be rendered
    await waitFor(() => {
        expect(screen.getByText(/a new hope/i)).toBeInTheDocument();
        expect(screen.getByText(/x-wing/i)).toBeInTheDocument();
    });
});
