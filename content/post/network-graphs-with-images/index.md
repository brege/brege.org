---
title: "Network Graphs with Images"
tags: ["network", "visjs", "graph", "js", "hugo", "fruit"]
date: 2022-12-21T02:15:04-05:00
featured: false
draft: false
---

This is a follow-up to the previous post [Network Graphs in Hugo](/post/network-graphs-in-hugo/).
I'm feeling fruity.  These aren't *all* tree fruits, but a few clusters organized by tree grafting compatibility.

{{< fruit-network nodesPath="/data/fruit/nodes.json" edgesPath="/data/fruit/edges.json" >}}

1. Data for the network is stored in two separate JSON files, both located in `/static/data/fruit/`: 
    - [`nodes.json`](/data/fruit/nodes.json)
    - [`edges.json`](/data/fruit/edges.json)

2. The javascript and the shortcode, as one file: 
    - `fruit-network.html`
        ``` javascript
        {{ $nodesPath := .Get "nodesPath" }}
        {{ $edgesPath := .Get "edgesPath" }}

        <style>
          #mynetwork {
            background-color: #f5f5f5; /* a medium gray color */
            border-radius: 10px;
            border: 1px solid #cccccc;
            margin: 5px 0 40px 0;
          }
        </style>

        <div id="mynetwork" data-nodes-path={{ $nodesPath }} data-edges-path={{ $edgesPath }}></div>

        <script src="https://visjs.github.io/vis-network/standalone/umd/vis-network.min.js"></script>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script>
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
        </script>

        ```

This will provide network graph physics where the nodes are images (all sourced from [Wikipedia](https://www.wikipedia.org/). Hugo template for completeness:
``` markdown
{{</* fruit-network nodesPath="/data/fruit/nodes.json" edgesPath="/data/fruit/edges.json" */>}}

```
