// Define the color palettes
// https://material.io/design/color/the-color-system.html#tools-for-picking-colors
// this is a poor way to do this, but it works for now
const greyColorPalette = [
  '#fafafa',  // Grey 100
  '#f5f5f5',  // Grey 200
  '#eeeeee',  // Grey 300
  '#e0e0e0',  // Grey 400
  '#bdbdbd',  // Grey 500
  '#9e9e9e',  // Grey 600
  '#757575',  // Grey 700
  '#616161',  // Grey 800
  '#424242',  // Grey 900
  '#212121',  // Grey 1000
];
const blueColorPalette = [
  '#E3F2FD',  // Light Blue 100
  '#BBDEFB',  // Light Blue 200
  '#90CAF9',  // Light Blue 300
  '#64B5F6',  // Light Blue 400
  '#42A5F5',  // Light Blue 500
  '#2196F3',  // Light Blue 600
  '#1E88E5',  // Light Blue 700
  '#1976D2',  // Light Blue 800
  '#1565C0',  // Light Blue 900
  '#0D47A1',  // Light Blue 1000
];
const greenColorPalette = [
  '#E8F5E9',  // Light Green 100
  '#C8E6C9',  // Light Green 200
  '#A5D6A7',  // Light Green 300
  '#81C784',  // Light Green 400
  '#66BB6A',  // Light Green 500
  '#4CAF50',  // Light Green 600
  '#43A047',  // Light Green 700
  '#388E3C',  // Light Green 800
  '#2E7D32',  // Light Green 900
  '#1B5E20',  // Light Green 1000
];

// Define a function for the nodes based on a color palette
function generateNodeStyles(colorPalette) {
  return {
    nodes: {
      color: {
        background: colorPalette[1],  // Pallete 200
        border: colorPalette[5],  // Pallete 600  
        highlight: {
        background: colorPalette[3],  // Pallete 400
        border: colorPalette[5]  // Pallete 600
      }
      },
      font: {
        color: colorPalette[9],  // Pallete 1000
        size: 30,
        align: 'center'
      },
      shape: 'box',
      shapeProperties: {
        borderRadius: 3,
      }
    }
  };
}

const nodeStylesOrigin = generateNodeStyles(greyColorPalette);
const nodeStylesPrime = generateNodeStyles(greenColorPalette);

// Define the network options
const options = {
  interaction: {
    hover: true,
    hoverConnectedEdges: true,
  },
  autoResize: true,
  height: '100%',
  width: '100%',
}

// Create a new network graph
const container = document.getElementById('network');
const network = new vis.Network(container, {}, options);
let nodes = [];
let edges = [];
const nodesPath = $("#network").data("nodes-path");
const edgesPath = $("#network").data("edges-path");

// Load the data and display the graph
async function displayGraph() {
  const nodesResponse = await fetch(nodesPath);
  nodes = await nodesResponse.json();
  const edgesResponse = await fetch(edgesPath);
  edges = await edgesResponse.json();
  network.setOptions(nodeStylesOrigin);
  network.setData({ nodes: nodes, edges: edges });
  // Apply the node styles
  network.setOptions(nodeStylesOrigin);
}

// Display the graph when the page loads
window.addEventListener('load', displayGraph);
// Listen whenever selected results change
document.addEventListener('selectedResultsChanged', function (e) {
  const selectedResults = e.detail;
  filterNodesAndEdges(selectedResults);
});

// When the user clicks a node
network.on('click', function (params) {
if (params.nodes.length > 0) {
    const nodeId = params.nodes[0];
    handleResultClick(nodeId);
}
});   

// Filter the nodes and edges based on the selected results
function filterNodesAndEdges(selectedResults) {
  // Display the graph with the matching nodes and edges, 
  const matchingEdges = edges.filter(edge => selectedResults.includes(edge.from) || selectedResults.includes(edge.to));
  const matchingNodes = nodes.filter(node => matchingEdges.some(edge => edge.from === node.id || edge.to === node.id));
  network.setData({ nodes: matchingNodes, edges: matchingEdges });
  // Apply the node styles
  network.setOptions(nodeStylesOrigin);
  network.body.data.nodes.update(matchingNodes.map(node => {
    if (selectedResults.includes(node.id)) {
      return { id: node.id, color: nodeStylesPrime.nodes.color };
    } else {
      return { id: node.id };
    }
  }));

  // if the selected results is empty, display the graph with all the nodes and edges
  if (selectedResults.length === 0) {
    network.setData({ nodes: nodes, edges: edges });
    network.setOptions(nodeStylesOrigin);
  }
}
