// graphDataGenerator.js
import * as THREE from 'three';

export const generateGraphData = () => {
  // Main cluster
  const mainClusterSize = 25;
  const secondaryClusterSize = 15;
  const chainSize = 10;
  const smallClustersCount = 3;
  const smallClusterSize = 4;

  const nodes = [];
  const links = [];
  let nodeId = 0;

  // Helper to add a node with a specific color and name
  const addNode = (color, size = 1, name = null) => {
    const id = String(nodeId++);
    nodes.push({
      id,
      color,
      val: size,
      name: name // Используем имя, которое передаётся в функцию
    });
    return id;
  };

  // Helper to add a link between nodes
  const addLink = (source, target, value = 1) => {
    links.push({
      source,
      target, 
      value
    });
  };

  // Создаем центральный узел с конкретным именем
  const centralNode = addNode('#ffffff', 2, 'Главный узел');
  
  // Create main central cluster (colorful) с именами для некоторых узлов
  const mainClusterColors = ['#ff6b6b', '#ff9e7d', '#ffd166', '#e6f98c', '#64dfdf', '#6a8caf', '#9a8cf5', '#d183c9'];
  const mainClusterNodes = [];
  
  for (let i = 0; i < mainClusterSize; i++) {
    const colorIndex = Math.floor(Math.random() * mainClusterColors.length);
    
    // Для примера, даем конкретные имена только некоторым узлам
    let nodeName = null;
    if (i === 0) nodeName = "Важный узел A";
    if (i === 5) nodeName = "Важный узел B";
    if (i === 10) nodeName = "Узел документации";
    
    const node = addNode(mainClusterColors[colorIndex], 1, nodeName);
    mainClusterNodes.push(node);
    addLink(centralNode, node);
    
    // Add some connections within the cluster
    if (i > 0 && Math.random() > 0.7) {
      const randomNodeIndex = Math.floor(Math.random() * i);
      addLink(node, mainClusterNodes[randomNodeIndex]);
    }
  }

  // Create a chain of nodes (like in the top left of the image)
  const chainColors = ['#7cbc8e', '#bad1cd', '#7cbc8e', '#bad1cd', '#9370db'];
  let prevNode = null;
  const chainNodes = [];
  
  const chainNames = ["Начало цепи", "Этап 1", "Этап 2", "Этап 3", "Финал"];
  
  for (let i = 0; i < chainSize; i++) {
    const colorIndex = i % chainColors.length;
    // Используем имена из массива для первых 5 узлов, остальные без имен
    const nodeName = i < chainNames.length ? chainNames[i] : null;
    
    const node = addNode(chainColors[colorIndex], 1, nodeName);
    chainNodes.push(node);
    
    if (prevNode) {
      addLink(prevNode, node);
    }
    prevNode = node;
  }
  
  // Connect the chain to the main cluster
  addLink(chainNodes[chainSize-1], centralNode);

  // Create secondary green cluster (bottom part of the image)
  const greenClusterNodes = [];
  const greenColor = '#4caf50';
  
  const greenCentralNode = addNode(greenColor, 1.5, "Зеленый центр");
  
  for (let i = 0; i < secondaryClusterSize; i++) {
    // Даем имена только некоторым узлам
    const nodeName = i % 5 === 0 ? `Зеленый узел ${i}` : null;
    
    const node = addNode(greenColor, 1, nodeName);
    greenClusterNodes.push(node);
    
    // Connect to central node of this cluster or to another node
    if (Math.random() > 0.3) {
      addLink(greenCentralNode, node);
    } else if (i > 0) {
      const randomNodeIndex = Math.floor(Math.random() * i);
      addLink(node, greenClusterNodes[randomNodeIndex]);
    }
  }
  
  // Connect green cluster to the main cluster
  addLink(greenCentralNode, centralNode);
  
  // Add a few small disconnected clusters
  for (let c = 0; c < smallClustersCount; c++) {
    const smallClusterNodes = [];
    const randColor = mainClusterColors[Math.floor(Math.random() * mainClusterColors.length)];
    
    // Create small cluster
    const firstNode = addNode(randColor, 1, `Малый кластер ${c}`);
    smallClusterNodes.push(firstNode);
    
    for (let i = 1; i < smallClusterSize; i++) {
      const node = addNode(randColor);
      smallClusterNodes.push(node);
      
      // Connect to previous nodes in this small cluster
      const connectTo = smallClusterNodes[Math.floor(Math.random() * i)];
      addLink(connectTo, node);
    }
  }

  // Add a large blue node at the bottom left
  const blueNode = addNode('#87CEEB', 2, "Большой синий узел");
  const anotherNode = addNode('#ffffff', 0.8, "Маленький белый");
  addLink(blueNode, centralNode);
  addLink(blueNode, anotherNode);

  return { nodes, links };
};

// Функция для создания THREE.js объекта узла
export const createNodeThreeObject = node => {
  const material = new THREE.MeshLambertMaterial({ color: node.color || '#ffffff' });
  const geometry = new THREE.SphereGeometry(node.val || 1, 16, 16);
  const mesh = new THREE.Mesh(geometry, material);
  
  // Add glow effect
  const glowMaterial = new THREE.MeshBasicMaterial({ 
    color: node.color || '#ffffff',
    transparent: true,
    opacity: 0.5
  });
  const glowGeometry = new THREE.SphereGeometry((node.val || 1) * 1.2, 16, 16);
  const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
  
  const group = new THREE.Group();
  group.add(mesh);
  group.add(glowMesh);
  
  return group;
};

export default {
  generateGraphData,
  createNodeThreeObject
};
