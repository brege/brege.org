// Get a reference to the search form and input field
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('searchResults');

const searchPath = $("#search-form").data("search-path");
console.log('searchPath:', searchPath);

// Add an input event listener to the input field
searchInput.addEventListener('input', event => {
  const query = searchInput.value;
  // Check if the input field is empty, then clear the search results
  if (query.length === 0) {
    searchResults.innerHTML = '';
    return;
  }
  // Perform the search and display the results
  searchJSON(query, searchPath);
});

// Add a focus event listener to the input field
searchInput.addEventListener('focus', event => {
  const query = searchInput.value;
  searchInput.value = '';
});

// If the user is focused on the input field and presses the escape key, clear the search results
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && searchInput === document.activeElement) {
    searchResults.innerHTML = '';
  }
});

// Search the JSON file and display the results
async function searchJSON(query, searchPath) {
  const response = await fetch(searchPath);
  const json = await response.json();
  const results = json.filter(node => node.id.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
  searchResults.innerHTML = `
      ${results.map(result => `<li class="searchResults" onclick="handleResultClick('${result.id}')">${result.id}</li>`).join('')}
  `;
  // it would be nice if arrow keys could be used to select the results
  // as they do on the /search page
}
// smarter search: we will want to make the dropdown list
// of results sorted by influence and not just alphabetical
// we could probably feed in the influence from sources that 
// we have, either from:
// 1. edges.json
// 2. a separate json file with the jaccard index
//      (this would be the most accurate)
//    - we have this in the python code
// 3. if nodes.json has the influence, we can use that

let selectedResults = [];

// Add a click event listener to the search results
function handleResultClick(resultId) {
  searchInput.value = resultId;

  // Check if the resultId is in the selectedResults array
  if (!selectedResults.includes(resultId)) {
    // Add the resultId to the selectedResults array
    selectedResults.push(resultId);
    const resultBox = document.createElement('div');
    resultBox.innerHTML = resultId;
    resultBox.classList.add('result-box');
    // Add a click event listener to the result box
    resultBox.addEventListener('click', event => {
      resultBox.parentNode.removeChild(resultBox);
      selectedResults = selectedResults.filter(id => id !== resultId);
      console.log(selectedResults);
      // Pass the selelected results to the node/edge filter 
      // if filterNodesAndEdges is defined
      if (typeof filterNodesAndEdges === 'function') {
        filterNodesAndEdges(selectedResults);
      }
      if (typeof filterHistogram === 'function') {
        filterHistogramData(selectedResults);
      }
    });
    // Insert the result box before the search form
    searchForm.parentNode.insertBefore(resultBox, searchForm);
  } else {
    // Remove the resultId from the selectedResults array and DOM
    selectedResults = selectedResults.filter(id => id !== resultId);
    document.querySelectorAll('.result-box').forEach(resultBox => {
      if (resultBox.innerHTML === resultId) {
        resultBox.parentNode.removeChild(resultBox);
      }
    });
  }

  // Filter the nodes and edges based on the selected results
  if (typeof filterNodesAndEdges === 'function') {
    filterNodesAndEdges(selectedResults);
  }
  if (typeof filterHistogramData === 'function') {
    filterHistogramData(selectedResults);
  }
  // Clear the search results and input field
  searchResults.innerHTML = '';
  searchInput.value = '';     
}