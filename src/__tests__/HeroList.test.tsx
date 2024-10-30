// src/__tests__/HeroList.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeroList from '../components/HeroList';
import { vi } from 'vitest';

describe('HeroList Component', () => {
    test('renders hero names', async () => {
        render(<HeroList onHeroSelect={() => {}} />);

        const heroName = await screen.findByText(/obi-wan kenobi/i);
        expect(heroName).toBeInTheDocument();
    });

    test('calls onHeroSelect with correct id', async () => {
        const onHeroSelect = vi.fn();  // Using Vitest's vi.fn() for mocking functions
        render(<HeroList onHeroSelect={onHeroSelect} />);

        const heroName = await screen.findByText(/obi-wan kenobi/i);
        fireEvent.click(heroName);

        expect(onHeroSelect).toHaveBeenCalledWith("10");
    });
});
