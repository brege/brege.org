---
title: "Network Graphs in Hugo"
summary: |
  First crack at making a simple toy network graph in Hugo.
tags:
  - hugo
  - network-graphs
  - vis.js
  - tutorial
  - data-visualization
categories:
  - software
  - data-science
series:
  - network graphs in hugo
series_order: 1
date: 2022-12-09T23:02:42-05:00
draft: false
cover:
  image: "cover.png"
  hidden: true
  hiddenInList: false
---

This is a simple toy to see how a network graph can be added in a Hugo article.  I'll be testing new features on it as I learn new things.

{{< toy-network nodesPath="data/nodes.json" edgesPath="data/edges.json" scriptPath="js/toy-network.js" >}}

Relative to the root of the Hugo website directory, here's some basic files to make this interactive.
Note that The JSON data and CSS is added inline here to make the scope of this tutorial focus on Hugo-specific structures.

1. The javascript file lives in this page bundle:
    - [`toy-network.js`](js/toy-network.js)

2. This file accesses data for the nodes and edges from two JSON files in this page bundle:
    - [`nodes.json`](data/nodes.json)
    - [`edges.json`](data/edges.json)

3. In the shortcodes directory `/layouts/shortcodes/`:
    - `toy-network.html` 
        ``` html
        <div id="mynetwork" data-nodes-path="data/nodes.json" data-edges-path="data/edges.json">
            <script src="https://visjs.github.io/vis-network/standalone/umd/vis-network.min.js"></script>
            <script src="js/toy-network.js"></script>
        </div>
        ```

4. Do the normal way of making a post in Hugo, but invoke the shortcode within the body of your markdown:
    - `index.md`
        ``` markdown
        {{</* toy-network nodesPath="data/nodes.json" edgesPath="data/edges.json" scriptPath="js/toy-network.js" */>}}
        ```
This will provide the simple network graph above.





