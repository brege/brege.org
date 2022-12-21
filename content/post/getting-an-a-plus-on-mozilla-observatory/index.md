+++
title = "Getting an A+ on Mozilla's HTTP Observatory"
date = 2017-01-09T18:29:50-05:00
math = true
tags = ["nginx", "HTTPS", "observatory", "mozilla", "HSTS"]
draft = false

[header]
image = ""
caption = ""

[image]
caption = ""
focal_point = ""
preview_only = true
+++

After I learned about [Mozilla's tool](https://github.com/mozilla/http-observatory) to test how secure your site is, I ran it on my site https://observatory.mozilla.org/analyze.html?host=brege.org and received an "**F**".  <!--more-->

After some trial & error and searching around, I came up with the following to be placed in my Nginx `server{...}` block:

``` nginx
    add_header Strict-Transport-Security "max-age=15768000; includeSubDomains; preload";
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Permitted-Cross-Domain-Policies none;
    add_header Content-Security-Policy "default-src 'self';";

```

Now I am receiving an "**A+**" from the observatory!

I also went to [Google's submission page](https://hstspreload.org/) to have your site put on the [HSTS](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security) preloaded list, so that all users of Google Chrome access your site through HTTPS by default.

