---
# Documentation: https://wowchemy.com/docs/managing-content/

title: "Network Graphs with Images"
subtitle: ""
summary: ""
authors: []
tags: ["network", "visjs", "graph", "js", "hugo", "fruit"]
categories: []
date: 2022-12-21T02:15:04-05:00
lastmod: 2022-12-21T02:15:04-05:00
featured: false
draft: false

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# Focal points: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight.
image:
  caption: ""
  focal_point: ""
  preview_only: true

# Projects (optional).
#   Associate this post with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["internal-project"]` references `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
projects: []
---

This is a follow-up to the previous post [Network Graphs in Hugo](/post/network-graphs-in-hugo/).
I'm feeling fruity.  These aren't *all* tree fruits, but a few clusters organized by tree grafting compatablity.  

{{< fruit-network nodesPath="/data/fruit/nodes.json" edgesPath="/data/fruit/edges.json" >}}


Relative to the root of the Hugo website directory, here's some basic files to make this interactive.
Note that The JSON data and CSS is added inline here to make the scope of this tutorial focus on Hugo-specific structures.

1. Data for the network is stored two separate JSON files, both located in `/static/data/fruit/`: 
    - [`nodes.json`](/data/fruit/nodes.json)
    - [`edges.json`](/data/fruit/edges.json)

2. The javascript and the shortcode become the same file: 
    - `fruit-network.html`
        ``` javascript
        {{ $nodesPath := .Get "nodesPath" }}
        {{ $edgesPath := .Get "edgesPath" }}

        <style>
          #mynetwork {
            padding: 20px;
            background-color: #f5f5f5; /* a medium gray color */
            border-radius: 10px;
            border: 1px solid #cccccc;
            margin: 5px 0 40px 0;
          }

          .label-text {
            color: #000000;
          }
          .dark .label-text {
            color: #ffffff;
          }
        </style>

        <div id="mynetwork" data-nodes-path={{ $nodesPath }} data-edges-path={{ $edgesPath }}></div>

        <script src="https://visjs.github.io/vis-network/standalone/umd/vis-network.min.js"></script>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script>
          const options = {
            width: "800px",
            height: "500px",
          };

          const container = document.getElementById("mynetwork");
          const network = new vis.Network(container, {}, options);

          const nodesPath = $("#mynetwork").data("nodes-path");
          const edgesPath = $("#mynetwork").data("edges-path");

          const nodeStyles = {
            nodes: {
              color: {
                background: '#eaeaea',
                border: '#ffffff'
              },
              shape: 'circularImage',
              size: 65,
              image: node => node.image,
              label: node => `<span class="label-text">${node.label}</span>`,
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
