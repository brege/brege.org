---
title: "Les Miserables"
tags: ["hugo", "co-occurrence", "network", "visjs", "graph"]
date: 2022-12-24T05:30:47-05:00
draft: false
cover:
  image: 'book.jpg'
  caption:
  preview_only: true
featured:
  image: 'network.png' #isn't working
jquery: true
---

*Les Miserables is one of my favorite books.  I read most of the original translation on a train ride to Portland, OR from Chicago, IL back in 2008 and enjoyed the remainder on the return trip back East.  It taught me compassion: when Valjean places the coin in Cosette's shoe.  Father Christmas always misses her.  There was an earlier passage of a man stepping on a coin in front of her, while she swept dressed in rags.*

The graph may take a moment to load.

{{< lesmis-network nodesPath="/data/lesmis/nodes.json" edgesPath="/data/lesmis/edges.json" >}}
{{< search-plots jsonPath="/data/lesmis/nodes.json" >}}

The search bar is the major addition to the graphing methods.
Nodes can be clicked and added to a subgraph builder.
You can continue to search for new node members in the search bar 
(which has a rudimentary autofill that's a straight json query)
and clicking on them will add them to the builder.
Simultaneously, the graph will reduce to a graph containing only 
all nodes with edges linked to nodes in the builder.

Items can be removed from the builder either by clicking the little builder tabs or re-clicking the node.  Clearing the builder bar completely will redraw the whole graph.

Testing and development was done on the mini pesto data set I made for [What is Pesto?](/post/what-is-pesto/).  Recipe builder coming soon(!)

Please email me at wyatt@brege.org with any questions. 

Dataset can be found here:

  - [`nodes.json`](/data/lesmis/nodes.json)
  - [`edges.json`](/data/lesmis/edges.json)


> Lingering annoyances:
>  - Slow
>  - Still haven't figured out how to pass shortcode variables 
>    to javascript files in Hugo (the website builder, not the author)
>  - Javascript needs clean up
>  - I have great fear running this on my 700x3000 dataset.. 
