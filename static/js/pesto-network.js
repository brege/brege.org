// create a network
const container = document.getElementById("mynetwork");
const network = new vis.Network(container, {}, {
  width: "100%",
  height: "500px"
});

// define the node styles
network.setOptions({
  nodes: {
    shape: "box",
    color: {
      background: "#f5f5f5",
      highlight: {
        background: "#e0e0e0"
      }
    },
    borderWidth: 1,
    borderWidthSelected: 2,
    font: {
      color: "#333"
    }
  }
});

// create a data set for the nodes and edges
const nodes = new vis.DataSet();
const edges = new vis.DataSet();

// fetch the data from the JSON files
Promise.all([
  fetch("/data/pesto/nodes.json"),
  fetch("/data/pesto/edges.json")
])
.then(([nodesResponse, edgesResponse]) => Promise.all([
  nodesResponse.json(),
  edgesResponse.json()
]))
.then(([nodesData, edgesData]) => {
  // add the nodes and edges data to the data sets
  nodes.add(nodesData);
  edges.add(edgesData);

  // update the data in the network
  network.setData({ nodes, edges });
});

// define the search function
network.searchGraph = function(query) {
  // search the nodes in the network for ones that match the query
  const matchingNodes = this.nodes.get({
    filter: node => node.label.includes(query)
  });
  return matchingNodes;
};

// define the highlight function
network.highlightNodes = function(matchingNodes) {
  // iterate over the matching nodes and change their color to highlight them
  matchingNodes.forEach(node => {
    this.setOptions({
      nodes: {
        [node.id]: {
          color: {
            background: '#ff0000',
            highlight: {
              background: '#ff0000'
            }
          }
        }
      }
    });
  });
};

// Get a reference to the search form, input field, and search button
const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const suggestion = document.getElementById('search-suggestion');

// Fetch the node data from the JSON file
fetch("/data/pesto/nodes.json")
  .then(response => response.json())
  .then(nodesData => {
    // Get a reference to the search form
    const form = document.getElementById('search-form');

    // Add an event listener to the form that listens for the submit event
    form.addEventListener('submit', event => {
      // Prevent the default form submission behavior
      event.preventDefault();

      // Get the value of the search input field
      const query = document.getElementById('search-input').value;

      // Search the nodes data for ones that match the query
      const matchingNodes = nodesData.filter(node => node.label.includes(query));

      // If there are matching nodes, display the results
      if (matchingNodes.length > 0) {
        const resultsContainer = document.getElementById('search-results');
        resultsContainer.innerHTML = ''; // Clear any previous results
        for (const node of matchingNodes) {
          const result = document.createElement('div');
          result.textContent = node.label;
          resultsContainer.appendChild(result);
        }
      } else {
        // If there are no matching nodes, display a message indicating that no results were found
        const noResults = document.createElement('div');
        noResults.textContent = 'No results found';
        document.getElementById('search-results').appendChild(noResults);
      }
    });
  });

