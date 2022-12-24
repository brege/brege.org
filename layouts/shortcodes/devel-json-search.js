<link rel="stylesheet" href="/css/search-bar.css">

{{ $jsonPath := .Get "jsonPath" }}

<div class="form-margin">
  <form id="search-form" onsubmit="return false;">
     <input type="text" name="search" id="search-input" class="form-control bg-highlight-color-7-10" placeholder="Search..." autofocus autocomplete="off">
     <i class="" id="search-icon"></i>
  </form>
  <div id="search-results"></div>
</div>

<script>
  // Get a reference to the search form and input field
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  // Add an input event listener to the input field
  searchInput.addEventListener('input', event => {
    const query = searchInput.value;
    // Check if the input field is empty
    if (query.length === 0) {
      // Clear the search results
      searchResults.innerHTML = '';
      return;
    }
    // Perform the search and display the results
    searchJSON(query, '{{ $jsonPath }}');
  });
    
  // Add a focus event listener to the input field
  searchInput.addEventListener('focus', event => {
    const query = searchInput.value;
    searchInput.value = '';
  });

  async function searchJSON(query, jsonPath) {
    const response = await fetch(jsonPath);
    const json = await response.json();
    const results = json.filter(node => node.id.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
  
    // Display the search results as a list of ID's
    searchResults.innerHTML = `
      <ul>
        ${results.map(result => `<li class="search-result" onclick="handleResultClick('${result.id}')">${result.id}</li>`).join('')}
      </ul>
    `;
  }

  let selectedResults = [];

  // Add a click event listener to the search results
  function handleResultClick(resultId) {
    // Update the search input value
    searchInput.value = resultId;

    // Check if the resultId is in the selectedResults array
    if (!selectedResults.includes(resultId)) {
      // Add the resultId to the selectedResults array
      selectedResults.push(resultId);
      // Create a new element to display the result
      const resultBox = document.createElement('div');
      resultBox.innerHTML = resultId;
      resultBox.classList.add('result-box');
      // Add an event listener to remove the result box when clicked
      resultBox.addEventListener('click', event => {
        resultBox.parentNode.removeChild(resultBox);
        selectedResults = selectedResults.filter(id => id !== resultId);
        // Print the selected results to the console
        console.log(selectedResults);
        // Pass the selelected results to the filterNodesAndEdges function  
        filterNodesAndEdges(selectedResults);
      });
      // Insert the result box before the search form
      searchForm.parentNode.insertBefore(resultBox, searchForm);
    } else {
      // Remove the resultId from the selectedResults array
      selectedResults = selectedResults.filter(id => id !== resultId);
      // Remove the result box from the DOM
      document.querySelectorAll('.result-box').forEach(resultBox => {
        if (resultBox.innerHTML === resultId) {
          resultBox.parentNode.removeChild(resultBox);
        }
      });
    }
    
    // Filter the nodes and edges based on the selected results
    filterNodesAndEdges(selectedResults);

    // Clear the search results
    searchResults.innerHTML = '';
    // Clear the search input value
    searchInput.value = '';

    // Hide the search results when current search is empty
    if (selectedResults.length === 0) {
      searchResults.style.display = 'none';
    } else {
      searchResults.style.display = 'block';
    }
    

  }

</script>
