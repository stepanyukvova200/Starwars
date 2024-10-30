// src/__tests__/GraphNode.test.tsx

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GraphNode from '../components/GraphNode';

describe('GraphNode', () => {
    it('renders label correctly', () => {
        render(<GraphNode label="Test Node" />);

        // Use getByText and a regex for more flexibility
        expect(screen.getByText(/test node/i)).toBeInTheDocument();
    });
});
