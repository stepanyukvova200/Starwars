import React, { useEffect, useState } from 'react';
import ReactFlow, { Node, Edge, Controls } from 'react-flow-renderer';
import { fetchHeroDetails, fetchFilmDetails, fetchStarshipDetails } from '../services/starWarsAPI';
import Loader from './Loader';
import GraphNode from './GraphNode';
import '../styles/HeroDetailGraph.css';

const HeroDetailGraph: React.FC<{ heroId: string }> = ({ heroId }) => {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadHeroData = async () => {
            setLoading(true);
            const hero = await fetchHeroDetails(heroId);
            const heroNode = { id: heroId, data: { label: <GraphNode label={hero.name} /> }, position: { x: 250, y: 0 }, draggable: true };
            const newNodes = [heroNode];
            const newEdges = [];

            let filmPositionY = 400;
            let starshipPositionY = 800;
            const filmPositionXStart = 100;
            const starshipPositionXStart = 150;
            const offsetX = 200;

            for (let i = 0; i < hero.films.length; i++) {
                const filmId = hero.films[i];
                const film = await fetchFilmDetails(filmId);

                const filmNode = {
                    id: `film-${filmId}`,
                    data: { label: <GraphNode label={film.title} /> },
                    position: { x: filmPositionXStart + i * offsetX, y: filmPositionY },
                    draggable: true
                };

                newNodes.push(filmNode);
                newEdges.push({ id: `${heroId}-film-${filmId}`, source: heroId, target: `film-${filmId}` });

                for (let j = 0; j < hero.starships.length; j++) {
                    const starshipId = hero.starships[j];
                    const starship = await fetchStarshipDetails(starshipId);

                    const starshipNode = {
                        id: `starship-${starshipId}`,
                        data: { label: <GraphNode label={starship.name} /> },
                        position: { x: starshipPositionXStart + j * offsetX, y: starshipPositionY },
                        draggable: true
                    };

                    newNodes.push(starshipNode);
                    newEdges.push({ id: `film-${filmId}-starship-${starshipId}`, source: `film-${filmId}`, target: `starship-${starshipId}` });
                }
            }

            setNodes(newNodes);
            setEdges(newEdges);
            setLoading(false);
        };
        loadHeroData();
    }, [heroId]);

    if (loading) {
        return <Loader />;
    }

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            className="hero-detail-graph"
            nodesConnectable={false}
            nodesDraggable={true} // Дозволяє перетягування
            panOnDrag={false} // Забороняє панорамування при перетягуванні
            onNodeDragStop={(event, node) => console.log('Node dragged:', node)} // Перевірка події перетягування
        >
            <Controls />
        </ReactFlow>
    );
};

export default HeroDetailGraph;
