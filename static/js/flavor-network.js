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
        background: colorPalette[3],  // Pallete 400
        border: colorPalette[5],  // Pallete 600  
        highlight: {
          background: colorPalette[3],  // Pallete 700
          border: colorPalette[5],  // Pallete 600
        },
        hover: {
          background: colorPalette[5],  // Pallete 600
          border: colorPalette[7],  // Pallete 600
        },
      },
      font: {
        color: colorPalette[9],  // Pallete 1000
        size: 24,
        align: 'center',

      },
      shape: 'box',
      shapeProperties: {
        borderRadius: 8,
      },
    },
    edges: {
      color: {
        color: colorPalette[3],  // Pallete 600
        highlight: colorPalette[3],  // Pallete 600
        hover: colorPalette[3],  // Pallete 600
      },
      width: 1,
    },
  };
};

const nodeStylesOrigin = generateNodeStyles(blueColorPalette);
const nodeStylesPrime = generateNodeStyles(greyColorPalette);

// Define the network options
const options = {
  interaction: {
    hover: true,
    hoverConnectedEdges: true,
  },
  autoResize: true,
  height: '100%',
  width: '100%',
};

/* Goals:
  * 1. The users specifies a node or a list of nodes (selectedResults)
  * 2. The nodes are displayed on the network graph
  * 3. From those nodes, we find the nodes that are most similar to them
  * 4. The most similar nodes are displayed on the network graph
  * 
  * We do not display nodes that are not similar to the selected nodes
  * or nodes that are not selected
  * 
  * Just for reference, similarities looks like this:
  *  { node1: { node2: 0.5, node3: 0.3, ... }, 
  *             node2: { node1: 0.5, node3: 0.2, ... }, ... }
  * 
  * The nodes and edges are displayed on the network graph
  */

// Create a new network graph
const container = document.getElementById('network');
const network = new vis.Network(container, {}, options);
const nodesPath = $("#network").data("nodes-path");
const edgesPath = $("#network").data("edges-path");
const simPath = $("#network").data("sim-path");

let nodes = [];
let edges = [];
let similarities = {};

// get the nodes and edges from the server
async function getNodesAndEdges() {
  const nodes = await $.getJSON(nodesPath);
  const edges = await $.getJSON(edgesPath);
  return { nodes, edges };
}
// get the similarities from the server
async function getSimilarities() {
  const similarities = await $.getJSON(simPath);
  //console.log('similarities', similarities);
  return similarities;
}

// get the nodes and edges from the server
getNodesAndEdges().then(function (data) {
  nodes = data.nodes;
  edges = data.edges;
  //console.log('nodes', nodes);
  //console.log('edges', edges);
  // get the similarities from the server
  getSimilarities().then(function (data) {
    similarities = data;
  });
});

document.addEventListener('selectedResultsChanged', function (e) {
  // get the selected results
  const selectedResults = e.detail;
  //console.log('selectedResults', selectedResults);
  // Filter the nodes and edges based on the selected results
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
  console.log('selectedResults', selectedResults);

  /** functionality **/

  // get the nodes that are similar to the selected nodes
  const similarNodes = getSimilarNodes(selectedResults);
  console.log('similarNodes', similarNodes);

  // filter the nodes and edges based on the selected results
  let filteredNodes = nodes.filter(function (node) {
    return similarNodes.map(function (item) {
      return item[0];
    }).includes(node.id) || selectedResults.includes(node.id);
  });
  // 
  let filteredEdges = edges.filter(function (edge) {
    return similarNodes.map(function (item) {
      return item[0];
    }).includes(edge.from) && similarNodes.map(function (item) {
      return item[0];
    }).includes(edge.to);
  });
  //console.log('filteredNodes', filteredNodes);
  //console.log('filteredEdges', filteredEdges);
  
  // set the nodes and edges on the network graph
  network.setOptions(nodeStylesPrime);
  network.setData({ nodes: filteredNodes, edges: filteredEdges });

  /** cosmetic **/

  // change the color of the nodes that are selectedResults
  selectedResults.forEach(function (nodeId) {
    network.body.data.nodes.update({ 
      id: nodeId, 
      color: nodeStylesOrigin.nodes.color, 
    });
  });
  // for any edge that is connected to a selectedResult only,
  // change the color of the edge to the origin color
  filteredEdges.forEach(function (edge) {
    if (selectedResults.includes(edge.from) && !selectedResults.includes(edge.to)) {
      network.body.data.edges.update({ 
        id: edge.id, 
        color: nodeStylesOrigin.edges.color, 
        width: 3*nodeStylesOrigin.edges.width,
      });
    }
    if (!selectedResults.includes(edge.from) && selectedResults.includes(edge.to)) {
      network.body.data.edges.update({ 
        id: edge.id, 
        color: nodeStylesOrigin.edges.color, 
        width: 3*nodeStylesOrigin.edges.width 
      });
    }
  });

  /** physics toggle **/

  const physicsToggle = document.getElementById('physics-toggle');
  if (selectedResults.length > 2) {
    physicsToggle.style.display = 'block';
  } else {
    physicsToggle.style.display = 'none';
  }
  // add an event listener to the physics checkbox
  const physicsCheckbox = document.getElementById('physics');
  if (!physicsCheckbox.hasEventListener) {
    physicsCheckbox.addEventListener('change', function (e) {
      const physics = e.target.checked;
      network.setOptions({ physics: { enabled: physics } });
    });
    physicsCheckbox.hasEventListener = true;
  }
  /* I COULD CRY I FINALLY GOT IT TO WORK */

}

// get the nodes that are similar to the selected nodes
function getSimilarNodes(selectedNodes, n=7) {
  const similarNodes = selectedNodes.map(function (node) {
    const nodeSimilarities = similarities[node];
    if (!nodeSimilarities) {
      return [];
    } else {
    const sortedSimilarities = Object.entries(nodeSimilarities).sort(function (a, b) {
      return b[1] - a[1];
    });
    const topNSimilarNodes = sortedSimilarities.slice(0, n);
    return topNSimilarNodes;
    }
  });
  const flattenedSimilarNodes = similarNodes.flat();
  const uniqueSimilarNodes = [...new Set(flattenedSimilarNodes)];
  //console.log('uniqueSimilarNodes', uniqueSimilarNodes);
  return uniqueSimilarNodes;
}

