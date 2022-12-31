---
title: "Network Graphs in Hugo"
tags: ["network", "networkx", "graph", "js", "hugo"]
date: 2022-12-09T23:02:42-05:00
draft: false
---

This is a simple toy to see how a network graph can be added in a Hugo article.  I'll be testing new features on it as I learn new things.

{{< toy-network >}}

Relative to the root of the Hugo website directory, here's some basic files to make this interactive.
Note that The JSON data and CSS is added inline here to make the scope of this tutorial focus on Hugo-specific structures.

1. The javascript file was put in `/static/js/` and can be found here: 
    - [`toy-network.js`](/js/toy-network.js)

2. This file accesses data for the nodes and edges for the network from two separate JSON files, both located in `/static/data/toy-network/`: 
    - [`nodes.json`](/data/toy-network/nodes.json)
    - [`edges.json`](/data/toy-network/edges.json)

3. In the shortcodes directory `/layouts/shortcodes/`:
    - `toy-network.html` 
        ``` html
        <div id="mynetwork">
            <script src="https://visjs.github.io/vis-network/standalone/umd/vis-network.min.js"></script>
            <script src="/js/toy-network.js"></script>
        </div>
        ```

4. Do the normal way of making a post in Hugo, but invoke the shortcode within the body of your markdown:
    - `index.md`
        ``` markdown
        {{</* toy-network */>}}
        ```
This will provide the simple network graph above.









