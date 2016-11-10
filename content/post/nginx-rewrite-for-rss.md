+++
image = ""
math = false
tags = ["rss","nginx"
]
date = "2016-10-11T07:01:47Z"
title = "Nginx rewrite for RSS"

+++

Add the following to the main server block in your nginx config:

``` nginx
    location ~ ^/(?:feed|feeds|rss)  {
         return 301 /post/index.xml;
    }
```
Now people can go to https://brege.org/rss to find the RSS feed.
This rewrite rule could be expanded to match other common feed URI guesses.
<!--more-->

