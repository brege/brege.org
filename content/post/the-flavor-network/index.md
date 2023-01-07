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

You search for an ingredient you like, and the graph refines based on a similarity score between ingredients (in the flavor metric).  Click on an ingredient in the network to add it to your recipe above the search box, or to remove it.  Clicking on nodes in the network has the same effect.

Understanding why I chose this book for the dataset are mostly apparent upon opening it, but the key thing is the authors did a fine job formatting something computer readable and human usable--a rare feat!  Most importantly, it is aggregated from *chefs*, from real humans in kitchens doing what works, what's delicious, and what's in season.  Recipe API's don't have this granularity, they rely too heavily on user data to seed recommendations.  To my knowledge, this is the only dataset of this kind.

Technical tools only involve [vis.js](https://visjs.org/) for visualization and [BeautifulSoup](https://www.crummy.com/software/BeautifulSoup/bs4/doc/) for parsing.  The data is scraped from the Flavor Bible, and the similarity matrix is calculated using [Jaccard similarity](https://en.wikipedia.org/wiki/Jaccard_index) for [pairwaise comparisons](https://en.wikipedia.org/wiki/Pairwise_comparison). The [Natural Language Toolkit](https://www.nltk.org/) will be used to clean up ingredient names (this is a bug and will be fixed soon).  The sugggested nodes in the network are, for now, limited to the seven most similar ingredients for each recipe item.  

# Motivation

In 2019, I was helping fellow chefs come up with new menu offerings for our farm-to-fork specials, where a strategy eventually developed to prompt ourselves with constraints:
1. do something new
2. use something old
3. feature three things seasonal

We would scrap together new ideas over the prep table.  As ideas began to stretch and the Northern California winter approached, we sometimes used sheets of butcher paper to draw out a crude graph of our plate setups.  Sketches of sauce and protein layouts, heavy edges between ideas if the pairing 'sang', hanging in the ticket window on feature nights for guidance. Karen and Andrew's book was gifted to me later that year, and it changed my game.  I had a good resource, one *with a chef's trust*.

This method was so helpful, I started dreaming of a computer tool to do the same. I saw a reddit [post](https://www.reddit.com/r/datasets/comments/3bxlg7/i_have_every_publicly_available_reddit_comment/) that layed out some of these ideas: overlapping subreddits :: compatable flavors.  Sadly, restaurant life is not at all conducive to finding free time to write code.

I believe the impact of mathematical concepts to culinary scope to be a major upgrade in food-first thoughtfulness.  To extend its application to creativity and clarity, not abused for statistics and business evils. While I do see how these kinds of tools do have immense practical application in the distribution world, and with grander planning, the drive here is to empower chefs, bartenders, brewers, baristas, and sommeliers.

When you have writer's block, having suggestions from a trustful source is a big advantage.

Chef's unfortuanely are at a disadvantage creatively when compared to some other culturally impactful disciplines (music/language).  Yes, we have recipes, but those are instructions, and never help us build on [ratio](https://ruhlman.com/ruhlmans-books/) or [balance](https://www.saltfatacidheat.com/).  When you're on the couch in your jammies all you've really got is inspirations from social media and interactions with your peers.  

I'm hoping this tool can help with creativity the same way musicians and writers have sofa friendly rubrics to make new.  Where's the guitar tabs and spell checker for food?
