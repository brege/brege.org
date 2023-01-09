---
title: 'The Flavor Network'
summary: >
    This tool allows you to explore the flavor network, a social graph for flavor profiles.  The network is based on the [Flavor Bible](https://karenandandrew.com/books/the-flavor-bible/) and soon the companion book [What to Drink with What You Eat](https://karenandandrew.com/books/what-to-drink-with-what-you-eat/).
authors: 'Wyatt Brege'
tags: ['flavor', 'network', 'visjs', 'graph', 'jaccard', 'metric']
date: 2023-01-04T04:04:49-05:00
cover:
  image: '' 
  caption: '' 
jquery: true
draft: false
showToc: false
---

{{< flavor-network 
  nodesPath="/data/flavor/nodes.json" 
  edgesPath="/data/flavor/edges.json"
  simPath="/data/flavor/similarity.json" >}}

{{< search-plots jsonPath="/data/flavor/nodes.json" >}}

This tool allows you to explore the flavor network, a social graph for flavor profiles.
The network is based on the 
[Flavor Bible](https://karenandandrew.com/books/the-flavor-bible/) and soon the companion book 
[What to Drink with What You Eat](https://karenandandrew.com/books/what-to-drink-with-what-you-eat/).

Search for an ingredient you like, and the graph will refine to give you a web of ingredients that share highly similar flavor profiles. 
Then, click on a new ingredient in the network to add it to your recipe above the search box (or to remove it).
Clicking on either a search suggestions or a node has the same effect.
Search is not sorted by the flavor metric.  Search is sorted [lexically](https://fusejs.io/).

## Overview

* the nodes with color are your recipe ingredients
* the suggested ingredients are determined by Jaccard similarity (overlaps in The Flavor Bible listings of each chosen ingredient)
* for each of your recipe ingredients, the suggested nodes are fiducially split between:
  1. the most similar ingredients in the flavor metric (think 'top 5')
  2. randomized plucking of other similar ingredients (think 'a random 5 better than average')
* the edges are weighted and come only from direct mentions of one ingredient to another in the book [^1]
* if your ingredient is missing, it was likely missing in the book (quinoa) or was pruned because its mentions were too sparse [^2]

If a node is present without an edge, it means that the ingredient has a very good similarity with your recipe, but wasn't mentioned (connected) in its book entry literally.
Reconstructing 'ghost' entries and connections by training a model with listed affinities is the agenda.

Randomization is added to encourage diversity of the suggestions.
This is a seed, which can be toggled by 'rng salt' if you would rather see only the top results. 
The amount of suggestions gradually decreases as you add more ingredients to your recipe.
This is for performance reasons, as with the physics simulation disabling itself at destabilization.
When that happens, maybe you discovered a flavor affinity.

## Details

Understanding why I chose this book for the dataset are mostly apparent upon opening it, but the key thing is the authors did a fine job formatting something computer readable and human usable--a rare feat!
Most importantly, it is aggregated from *chefs*, from real humans in kitchens doing what works, what's delicious, and what's in season.
Recipe API's don't have this kind of granularity, many rely too heavily on user data to seed recommendations.
To my knowledge, this is the only dataset of this kind.

Technical tools only involve [vis.js](https://visjs.org/) for visualization and [BeautifulSoup](https://www.crummy.com/software/BeautifulSoup/bs4/doc/) for parsing.
The data is scraped from the Flavor Bible, and the similarity matrix is calculated using [Jaccard similarity](https://en.wikipedia.org/wiki/Jaccard_index) for [pairwise comparisons](https://en.wikipedia.org/wiki/Pairwise_comparison).
The [Natural Language Toolkit](https://www.nltk.org/) will be used to clean up ingredient names (this is a bug and will be fixed soon). 
The suggested nodes can be improved by using a weighted Jaccard probability distribution ([arXiv](https://arxiv.org/abs/1809.04052)).
Source code for this part of the calculation is [available on GitHub](https://github.com/brege/flavor-project).

## Purpose

In 2019, I was helping fellow chefs come up with new menu offerings for our farm-to-fork specials, where a strategy eventually developed to prompt ourselves, given the following constraints:
1. do something new
2. use something old
3. feature three things seasonal

We would work out new ideas together over the prep table.
As ideas began to stretch and the Northern California winter approached, we sometimes used sheets of butcher paper to draw out a crude graph of our plate setups.
These were sketches of sauce and protein layouts, heavy edges between ideas if their pairing 'sang', now a guide hanging from the ticket rail on the night a feature debuted. Karen and Andrew's book was gifted to me later that year, and it changed my game.
I had a good resource that gave answers, and especially new ideas, quickly.  One with a chef's trust.

This method was so helpful, I started dreaming of a computer tool to help me sketch out this process. I saw a reddit [post](https://www.reddit.com/r/datasets/comments/3bxlg7/i_have_every_publicly_available_reddit_comment/) that [spurred others](https://www.reddit.com/r/dataisbeautiful/comments/ae88pk/interactive_visualization_of_related_subreddits/) to lay out some of the underlying ideas: overlapping subreddits :: compatible flavors.  Predictably, restaurant life is not at all conducive to finding free time to write code.

I believe the impact of mathematical concepts to the broader culinary scope to be a major upgrade in our thoughtfulness about food.
To extend its application, in creativity and clarity, not abused in statistics to pressure a sale and disable the creative *mind*.
While I do see how a tool like this could provide immense practical application in the distribution world, my focus here is to empower chefs, bartenders, brewers, baristas, and sommeliers to create new things.

When it comes to tools available to chefs, 
compared to musicians, writers, and artists,
chef's are unfortunately at a disadvantage creatively.
Yes, we have recipes, but those are instructions, and do little to help us build on [ratio](https://ruhlman.com/ruhlmans-books/) or [balance](https://www.saltfatacidheat.com/).

It would be nice to be able to manipulate a canvas, like a musician can with a guitar or an artist can with photoshop, without getting your hands dirty: from the sofa, with a glass of wine.

[^1]: In the book, the weight of the pairing is given by the emphasis of the text:
    * normal text means mentioned by at least one expert
    * **bold** is recommended by many experts
    * **BOLD CAPS** is highly recommended 
    * \***BOLD CAPS** is the "Holy Grail" of pairings

    If the ingredient is not mentioned, it is given no weight (or edge) but it does not mean a flavor pairing doesn't exist.
    This is part of the purpose of this tool!  Lastly, there are a few dozen mentions of "Avoid", and should be thought of as opposite charges.

[^2]: If you encounter a bug, please feel free to contact me by [email](mailto:wyatt@brege.org)
or open an issue on
[GitHub](https://github.com/brege/flavor-project/issues)!

