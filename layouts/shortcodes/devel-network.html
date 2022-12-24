{{ $nodesPath := .Get "nodesPath" }}
{{ $edgesPath := .Get "edgesPath" }}

<style>
  #network { height: 60vh; } /* 60% of the viewport height */ 
</style>

<!-- Network graph container -->
<div id="network"></div>
<!-- Vis.js library -->
<script src="https://visjs.github.io/vis-network/standalone/umd/vis-network.min.js"></script>
<!-- Network graph script -->
<script>
  // Define the color palettes
  // https://material.io/design/color/the-color-system.html#tools-for-picking-colors
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
          background: colorPalette[1],  // Light 200
          border: colorPalette[5],  // Light 600  
          highlight: {
            background: colorPalette[3],  // Light 400
            border: colorPalette[5]  // Light 600
          }
        },
        font: {
          color: colorPalette[9],  // Light 1000
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
  

  // define the network options
  const options = {
    interaction: {
      hover: true,
      hoverConnectedEdges: true,
    },
    autoResize: true,
  }

  // Create a new network graph
  const container = document.getElementById('network');
  const network = new vis.Network(container, {}, options);
  let nodes = [];
  let edges = [];

  // Load the data and display the graph
  async function displayGraph() {
    const nodesResponse = await fetch('{{ $nodesPath }}');
    nodes = await nodesResponse.json();
    const edgesResponse = await fetch('{{ $edgesPath }}');
    edges = await edgesResponse.json();
    // Apply the node styles
    network.setOptions(nodeStylesOrigin);
    // Display the graph with the nodes and edges data
    network.setData({ nodes: nodes, edges: edges });
  }

  // Display the graph when the page loads
  window.addEventListener('load', displayGraph);
  // Listen whenever selected results change
  document.addEventListener('selectedResultsChanged', function (e) {
    // Get the selected results from the event
    const selectedResults = e.detail;
    // Filter the nodes and edges based on the selected results
    filterNodesAndEdges(selectedResults);
  });
  
  // When the user clicks a node
  network.on('click', function (params) {
    // If the user clicked a node
    if (params.nodes.length > 0) {
      // Get the node id
      const nodeId = params.nodes[0];
      // Pass the node id to handleResultClick function
      handleResultClick(nodeId);
    }
  });   

  // Filter the nodes and edges based on the selected results
  function filterNodesAndEdges(selectedResults) {
    // Print the selected results to the console
    console.log('selectedResults', selectedResults);
    // From the selected results nodes, determine the list of every edge that connect to that node
    const matchingEdges = edges.filter(edge => selectedResults.includes(edge.from) || selectedResults.includes(edge.to));
    // From the matching edges, determine the list of every node that is connected to the selected results nodes
    const matchingNodes = nodes.filter(node => matchingEdges.some(edge => edge.from === node.id || edge.to === node.id));
    // Display the graph with the matching nodes and edges, 
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

</script> 
