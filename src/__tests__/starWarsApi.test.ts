// src/__tests__/starWarsApi.test.ts

import axios from 'axios';
import { fetchHeroes } from '../services/starWarsAPI';
import { vi } from 'vitest';

vi.mock('axios');

describe('starWarsApi', () => {
    it('fetches heroes data', async () => {
        const mockedData = { results: [{ name: 'Obi-Wan Kenobi' }] };
        axios.get.mockResolvedValue({ data: mockedData });

        const data = await fetchHeroes(1);

        // Use the correct URL structure as per your API setup
        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/people?page=1'));
        expect(data.results[0].name).toBe('Obi-Wan Kenobi');
    });
});
