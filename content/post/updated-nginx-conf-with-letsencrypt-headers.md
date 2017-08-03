+++
title = "Updated Nginx configuration with Let's Encrypt headers"
math = false
highlight = true
date = "2017-04-03T15:06:38-07:00"
tags = ["nginx", "HSTS", "Let's Encrypt" 
]

[header]
  image = ""
  caption = ""

+++

I've added a new `security_headers.conf` file in `/etc/nginx/` to keep all the HTTPS headers in one place:
<!--more-->

```
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_session_tickets off;


    # intermediate configuration. tweak to your needs.
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers 'ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:ECDHE-ECDSA-DES-CBC3-SHA:ECDHE-RSA-DES-CBC3-SHA:EDH-RSA-DES-CBC3-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:DES-CBC3-SHA:!DSS';
    ssl_prefer_server_ciphers on;


    # to score better grades on
    #  https://observatory.mozilla.org/analyze.html?host=brege.org

    add_header Strict-Transport-Security "max-age=15768000; includeSubDomains; preload";
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Permitted-Cross-Domain-Policies none;
    add_header Content-Security-Policy "default-src 'self';";
    add_header Referrer-Policy "no-referrer, strict-origin-when-cross-origin";

    # OCSP Stapling ---
    # fetch OCSP records from URL in ssl_certificate and cache them
    ssl_stapling on;
    ssl_stapling_verify on;
```

We include the headers we obtained in the [last post](/post/getting-an-a-plus-on-mozilla-observatory/) in here as well.  The main configuration file `/etc/nginx/brege.org` contains:

```
server {
    server_name *.brege.org;
    return http://brege.org/;
}

server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name  brege.org;
    # enforce https
    return 301 https://$host$request_uri;

    if ($scheme != "https") {
        return 301 https://$host$request_uri;
    } # managed by Certbot

}

server {
    listen 443 default ssl;
    listen [::]:443 default ssl;

    root /usr/share/nginx/brege.org;
    index index.html index.htm index.php;

    server_name brege.org;

    ssl_certificate /etc/letsencrypt/live/brege.org/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/brege.org/privkey.pem; # managed by Certbot

    include security_headers.conf;
    include letsencrypt.conf;

    location / {
        # First attempt to serve request as file, then
        # as directory, then fall back to displaying a 404.
        try_files $uri $uri/ =404;
    }

    location ~ ^/(?:feed|feeds|rss)  {
        return 301 /index.xml;
    }

}
```

Note that first server block does not work as expected.  On a separate instance, I tested this and confirmed that http://abc.mysite.org does get redirected to https://mysite.org, but I think that since my site has been [HSTS Preloaded](https://hstspreload.org/?domain=brege.org), this doesn't allow http://abc.brege.org to redirect to https://brege.org.  
