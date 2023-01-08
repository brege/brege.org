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
---

{{< flavor-network 
  nodesPath="/data/flavor/nodes.json" 
  edgesPath="/data/flavor/edges.json"
  simPath="/data/flavor/similarity.json" >}}

{{< search-plots jsonPath="/data/flavor/nodes.json" >}}

This tool allows you to explore the flavor network, a social graph for flavor profiles.  The network is based on the [Flavor Bible](https://karenandandrew.com/books/the-flavor-bible/) and soon the companion book [What to Drink with What You Eat](https://karenandandrew.com/books/what-to-drink-with-what-you-eat/).

You search for an ingredient you like, and the graph refines to give you a web of ingredients that share high compatability scores. 
Then, click on a new ingredient in the network to add it to your recipe above the search box, or to remove it.  Clicking on search suggestions has the same effect.
Search is not sorted by the flavor metric.  Search is sorted like any other search function, lexically.

What you are seeing:

* the nodes with color are your recipe ingredients
* the suggested nodes are determined by Jaccard similarity (overlaps in the flavor bible listings)
* for each of your recipe ingredients, the suggested nodes are fiducially
  split between:
  1. the most similar ingredients in the flavor metric (think 'top 5')
  2. randomized plucking of other similar ingredients (think 'a random 5 better than average')
* the edges are weighted and come only from direct mentions of one ingredient to another in the book
* if your ingredient is missing, it was likely missing in the book (quinoa) or was pruined because its mentions were too sparse

If a node is present without an edge, it means that the ingredient has a very good similarity with your recipe, but wasn't mentioned literally in its book entry.  Reconstructing 'ghost' entries and training a model with listed affinities is the agenda.

Randomization is added to encourage diversity of the suggestions.
This is a seed, which will be added as an option to toggle. 
The amount of suggestions gradually decreases as you add more ingredients
to your recipe, for performance reasons, as with the physics simulation disabling itself at destabilization (when that happens, maybe you discovered a flavor affinity).

# Background

Understanding why I chose this book for the dataset are mostly apparent upon opening it, but the key thing is the authors did a fine job formatting something computer readable and human usable--a rare feat!  Most importantly, it is aggregated from *chefs*, from real humans in kitchens doing what works, what's delicious, and what's in season.  Recipe API's don't have this granularity, they rely too heavily on user data to seed recommendations.  To my knowledge, this is the only dataset of this kind.

Technical tools only involve [vis.js](https://visjs.org/) for visualization and [BeautifulSoup](https://www.crummy.com/software/BeautifulSoup/bs4/doc/) for parsing.  The data is scraped from the Flavor Bible, and the similarity matrix is calculated using [Jaccard similarity](https://en.wikipedia.org/wiki/Jaccard_index) for [pairwise comparisons](https://en.wikipedia.org/wiki/Pairwise_comparison). The [Natural Language Toolkit](https://www.nltk.org/) will be used to clean up ingredient names (this is a bug and will be fixed soon).  The sugggested nodes can be improved by using a weighted Jaccard probability distribution ([arXiv](https://arxiv.org/abs/1809.04052)).  Source code for this side of the calculations is [available on GitHub](https://github.com/brege/flavor-project).

# Motivation

In 2019, I was helping fellow chefs come up with new menu offerings for our farm-to-fork specials, where a strategy eventually developed to prompt ourselves with given the following constraints:
1. do something new
2. use something old
3. feature three things seasonal

We would scrap together new ideas over the prep table.  As ideas began to stretch and the Northern California winter approached, we sometimes used sheets of butcher paper to draw out a crude graph of our plate setups.  Sketches of sauce and protein layouts, heavy edges between ideas if the pairing 'sang', hanging in the ticket window on feature nights, for guidance. Karen and Andrew's book was gifted to me later that year, and it changed my game.  I had a good resource that gave answers, but especially ideas, quickly.  One *with a chef's trust*.

This method was so helpful, I started dreaming of a computer tool to do it for me. I saw a reddit [post](https://www.reddit.com/r/datasets/comments/3bxlg7/i_have_every_publicly_available_reddit_comment/) that [spurred others](https://www.reddit.com/r/dataisbeautiful/comments/ae88pk/interactive_visualization_of_related_subreddits/) to lay out some of these ideas: overlapping subreddits :: compatable flavors.  Predictably, restaurant life is not at all conducive to finding free time to write code.

I believe the impact of mathematical concepts to culinary scope to be a major upgrade in food-first thoughtfulness.
To extend its application to creativity and clarity, not abused in statistics to persuade a sale or by businesses to disable *creative* minds.
While I do see how a tool like this could have immense practical application in the distribution world, the drive here is to empower chefs, bartenders, brewers, baristas, and sommeliers to create.

When you have writer's block, having suggestions from a trustful source is a big advantage.  I try to remind myself often that ['blocks' are a bougoise luxury](https://www.youtube.com/watch?v=imLid4WBwOg), as John Darnielle of the Mountain Goats told John K Sampson: there's no 'miner  blocks', there's no 'steal worker' blocks, there's no '7-11 clerk' blocks.

Chef's unfortuanely are at a disadvantage creatively when compared to some other culturally impactful disciplines (music/language).  Yes, we have recipes, but those are instructions, and never help us build on [ratio](https://ruhlman.com/ruhlmans-books/) or [balance](https://www.saltfatacidheat.com/).  When you're on the couch in your jammies all you've really got is inspirations from social media and interactions with your peers.  

I'm hoping this tool can help with creativity the same way musicians and writers have sofa friendly rubrics to make new.  Where's the guitar tabs and spell checker for food?