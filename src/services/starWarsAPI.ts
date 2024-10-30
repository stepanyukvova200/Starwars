import axios from 'axios';

const API_BASE_URL = 'https://sw-api.starnavi.io';

export const fetchHeroes = async (page: number) => {
    const response = await axios.get(`${API_BASE_URL}/people?page=${page}`);
    return response.data;
};

export const fetchHeroDetails = async (heroId: string) => {
    const response = await axios.get(`${API_BASE_URL}/people/${heroId}/`);
    return response.data;
};

export const fetchFilmDetails = async (filmId: number) => {
    const response = await axios.get(`${API_BASE_URL}/films/${filmId}/`);
    return response.data;
};

export const fetchStarshipDetails = async (starshipId: number) => {
    const response = await axios.get(`${API_BASE_URL}/starships/${starshipId}/`);
    return response.data;
};
