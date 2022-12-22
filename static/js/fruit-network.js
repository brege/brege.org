const options = {
  width: "100%",
  height: "500px",
};

const container = document.getElementById("mynetwork");
const network = new vis.Network(container, {}, options);

const nodesPath = $("#mynetwork").data("nodes-path");
const edgesPath = $("#mynetwork").data("edges-path");

const nodeStyles = {
  nodes: {
    shape: 'circularImage',
    size: 65,
    font: {
      size: 18,
      color: '#000000',
    }
  }
};

function highlightNodes(matchingNodes) {
  matchingNodes.forEach(node => {
    $(`#${node.id}`).css('background-color', '#add8e6');
  });
}

$.getJSON(nodesPath, function(nodesData) {
  $.getJSON(edgesPath, function(edgesData) {
    const data = {
      nodes: nodesData,
      edges: edgesData
    };
    network.setData(data);
    network.setOptions(nodeStyles);

    const nodes = data.nodes;

    network.on('select', function(params) {
      const matchingNodes = nodes.filter(node => selectedResults.includes(node.label));
      highlightNodes(matchingNodes);
    });
  });
});

