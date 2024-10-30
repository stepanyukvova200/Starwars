// src/__tests__/Loader.test.tsx

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loader from '../components/Loader';
import '@testing-library/jest-dom';

describe('Loader Component', () => {
    it('displays loading message', () => {
        render(<Loader />);

        // Ensure loading message is displayed correctly
        expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    });
});
