---
title: "Network Graphs with Images"
summary: |
  A followup to the Network Graphs in Hugo post, this time with avatars for
  the nodes.
tags:
  - hugo
  - network-graphs
  - vis.js
  - images
  - data-visualization
categories:
  - software
  - data-science
series:
  - network graphs in hugo
date: 2022-12-21T02:15:04-05:00
featured: false
draft: false
cover:
  image: "fruit-network-images.png"
  hidden: true
  hiddenInList: false
---

This is a follow-up to the previous post [Network Graphs in Hugo](/post/network-graphs-in-hugo/).
I'm feeling fruity.  These aren't *all* tree fruits, but a few clusters organized by tree grafting compatibility.

{{< fruit-network nodesPath="nodes.json" edgesPath="edges.json" >}}

1. Data for the network is stored in two separate JSON files in this page bundle:
    - [`nodes.json`](nodes.json)
    - [`edges.json`](edges.json)

2. The shortcode and post-local javascript work together:
    - `fruit-network.html`
    - [`fruit-network.js`](fruit-network.js)
        ``` html
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
        <script src="fruit-network.js"></script>

        ```

This will provide network graph physics where the nodes are images (all sourced from [Wikipedia](https://www.wikipedia.org/). Hugo template for completeness:
``` markdown
{{</* fruit-network nodesPath="nodes.json" edgesPath="edges.json" */>}}

```
