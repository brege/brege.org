---
# Documentation: https://wowchemy.com/docs/managing-content/

title: "Developing Seasons Histograms"
subtitle: ""
summary: ""
authors: []
tags: []
categories: []
date: 2022-12-26T02:29:42-05:00
lastmod: 2022-12-26T02:29:42-05:00
featured: false
draft: true

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# Focal points: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight.
image:
  caption: ""
  focal_point: ""
  preview_only: false

# Projects (optional).
#   Associate this post with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["internal-project"]` references `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
projects: []
---

{{< histogram jsonPath="/data/flavor/abundance.json" >}}
{{< devel-json-search jsonPath="/data/flavor/nodes.json" >}}

I am still searching for a dataset that has quantities of produce at different weeks/months of the year.  I might just have to ask some 
organic farms for produce inventories.  *How to ask for that...*