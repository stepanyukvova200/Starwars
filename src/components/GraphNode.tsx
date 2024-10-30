import React from 'react';
import '../styles/GraphNode.css';

interface GraphNodeProps {
    label: string;
}

const GraphNode: React.FC<GraphNodeProps> = ({ label }) => {
    return (
        <div className="graph-node">
            {label}
        </div>
    );
};

export default GraphNode;
