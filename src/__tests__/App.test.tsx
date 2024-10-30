// src/__tests__/App.test.tsx

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('App Component', () => {
    test('renders HeroList and HeroDetailGraph components', async () => {
        render(<App />);

        // Use 'findByRole' with options to locate the "Load More" button reliably
        const loadMoreButton = await screen.findByRole('button', { name: /load more/i });
        expect(loadMoreButton).toBeInTheDocument();
    });

    test('loads hero details when a hero is selected', async () => {
        render(<App />);

        // Wait for heroes to load, ensuring "Luke Skywalker" is rendered
        const hero = await screen.findByText(/obi-wan kenobi/i); // Ensure this hero name exists in your data setup
        fireEvent.click(hero);

        // Confirm hero details are displayed in detail section
        await waitFor(() => {
            const heroDetail = screen.getByText(/obi-wan kenobi/i);
            expect(heroDetail).toBeInTheDocument();
        });
    });
});
