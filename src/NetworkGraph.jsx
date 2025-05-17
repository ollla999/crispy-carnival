import React, { useEffect, useRef, useState } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import { generateGraphData, createNodeThreeObject } from './graphDataGenerator';
import './NetworkGraph.css';

const NetworkGraph = () => {
  const fgRef = useRef();
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    setLoading(true);
    const data = generateGraphData();
    setGraphData(data);
    setLoading(false);
  }, []);


  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="network-graph-container">
      {loading && <div className="loading-indicator">Загрузка графа...</div>}
      
      <ForceGraph3D
        ref={fgRef}
        graphData={graphData}
        nodeThreeObject={createNodeThreeObject}
        linkColor={() => '#ffffff'}
        linkWidth={0.2}
        linkOpacity={0.4}
        backgroundColor="#050518"
        width={windowSize.width}
        height={windowSize.height}
        enableNodeDrag={true}
        enableNavigationControls={true}
        showNavInfo={false}
         nodeLabel={(node) => node.name}
      />
    </div>
  );
};

export default NetworkGraph;
