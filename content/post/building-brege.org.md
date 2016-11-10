+++
image = ""
math = false
tags = ["site", "building"]
date = "2016-10-10T19:47:14Z"
title = "Building brege.org"

+++

## Overview

brege.org is deployed with the following services:

- [Namecheap](https://www.namecheap.com/) - DNS Registrar
- [Let's Encrypt](https://letsencrypt.org) - Free SSL certificates
- [Digital Ocean](https://www.digitalocean.com) - Droplets for $5 a month

brege.org makes use of the following tools:

- [Nginx](https://nginx.org) - Fast reverse proxy 
- [Debian Jessie](https://debian.org) - Operating system running on our DO droplet
- [Hugo](https://gohugo.io) - Static site generator<!--more-->

## Hosting

First thing I did was register my domain on Namecheap.
It was around $12 to register brege.org.

Next bit was deciding on a hosting provider.
I gave Amazon S3 some consideration, since it's practically free for a static site, but after playing around with their tools it seemed far too confusing to use.
I thought I'd try Digital Ocean.
Their tutorials on deploying various web apps have been quite helpful in previous searches, and they host good things like [lkml.org](https://lkml.org).
The $5 droplet service offers 512 MB RAM, 20 GB SSD, and 1 TB of bandwidth.
Good enough.

I selected the debian installation on the "Create Droplet" page and created a new ssh key:
``` bash
ssh-keygen -t rsa -b 4096 -C "wyatt@brege.org"
```
I like to have a different key for each remote service I use (GitHub, Clusters, Servers, etc).
So for the bit about saving the key, I just substituted the default `id_rsa` with `do_rsa`, chose a password to unlock my key, and uploaded `do_rsa.pub` in the DO web interface.

This gets added to /root/.ssh/authorized_keys on your DO droplet.
I added another user on my droplet so I wouldn't always be logging in as root.
You can copy this key from your workstation to the user's home directory on your droplet via
``` bash
ssh-copy-id -i ~/.ssh/do_rsa newuser@ip.of.my.droplet
```

DNS settings can be confusing. Setting "Custom DNS" in Namecheap and setting the nameservers to DO's nameservers was simple enough.  Setting records on namecheap is kind of annoying.  On DO it is really intuitive to set up records.

### Nginx

I've been using nginx on my personal home server and quite like its configuration and speed.

``` bash
sudo apt-get install nginx
```

I'm not exactly sure what the consensus is on where your site should live in your debian install.
`/usr/share/nginx/`? `/var/www/`? The `html/` directory in either of those?
The way I treat it is that my static site will live in `/usr/share/nginx/brege.org/`.
If I want to password protect any section of my site, my `.htpasswd` will live in user `www-data`'s home directory, `/var/www/`.
If I want to host some other site for `abc.brege.org`, it will live in `/usr/share/nginx/abc.brege.org/`.

I removed the default site configuration file installed on debian.
``` bash
rm /etc/nginx/sites-available/default
rm /etc/nginx/sites-enabled/default
```
I made a new configuration file `/etc/nginx/sites-available/brege.org` with the following settings:

``` nginx
server {
    server_name *.brege.org;
    return http://brege.org/;
}

server {
    listen 80;
    listen [::]:80 default_server;

    server_name  brege.org;
    # enforce https
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 default ssl;
    listen [::]:443 default_server;

    root /usr/share/nginx/brege.org;
    index index.html index.htm index.php;

    server_name brege.org;

    ssl_certificate /etc/letsencrypt/live/brege.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/brege.org/privkey.pem;

    include letsencrypt.conf;

    location / {
        # First attempt to serve request as file, then
        # as directory, then fall back to displaying a 404.
        try_files $uri $uri/ =404;
    }

}

```

You can split each `server{ ... }` block into its own config file if you like.
One redirects all `*.brege.org` requests to `brege.org`, including `www.brege.org`.
The second one redirects all requests from http://brege.org to https://brege.org.
The third is the main configuration for the site.
This is where you put reverse proxies that redirect internal ports to subdirectories on your site.

Link the new configuration file and restart nginx:
```bash
sudo ln -s /etc/nginx/sites-available/brege.org /etc/nginx/sites-enabled/
sudo systemctl restart nginx.service
```

### Let's Encrypt
In `/etc/nginx/letsencrypt.conf`, I have:
``` nginx
location ^~ /.well-known/acme-challenge {
    alias /var/lib/letsencrypt/.well-known/acme-challenge;
    default_type "text/plain";
    try_files $uri =404;
}
```
After making any changes to your nginx configuration, restart the service:
``` bash
sudo systemctl restart nginx.service
```

We need to generate a free SSL certificate from Let's Encrypt.
I followed the instructions on https://certbot.eff.org/#debianjessie-nginx to install certbot on Debian Jessie.

As root, I ran 
``` bash
certbot certonly --webroot -w /usr/share/nginx/brege.org -d brege.org -d www.brege.org
```
and completed the wizard. YMWV

### Hugo

Since I've been getting into the habit of writing my notes and personal documentation in [Markdown](https://daringfireball.net/projects/markdown/), I wanted to be able to quickly copy and paste snippets to-and-from this website.
I found [Hugo](https://gohugo.io), which is written in [Go](https://golang.org/).
It is very fast to build a static website under.
Every post is written in markdown, and running the `hugo` command only takes ~50ms to generate all the html/css/js files.
No more having to fiddle with html/css/js.

First, the version of [Go](https://golang.org/) required to run Hugo must be 1.5 or greater at the time of writing.
I went to https://golang.org/dl/ and grabbed the latest release:
``` bash
cd ~/
wget https://storage.googleapis.com/golang/go1.7.1.linux-amd64.tar.gz
tar xvf go1.7.1.linux-amd64.tar.gz
rm go1.7.1.linux-amd64.tar.gz
sudo mv go /opt/
sudo chown -R newuser:newuser go/
cd go/ 
```
I added the following to `/etc/profile`
``` bash
export PATH=$PATH:/usr/local/go/bin
export PATH=$PATH:/opt/go/bin
```
Next, install Hugo via git:
``` bash
export GOPATH=/opt/go/bin
go get -v github.com/spf13/hugo
```
More information available [here](https://gohugo.io/overview/installing/).

Checkout https://themes.gohugo.io/ to see if there's a theme that you like.
I thought the [academic theme](https://github.com/gcushen/hugo-academic) looked pretty nice.
I followed the instructions in the README.md to create my site.

The workflow is typically:

1. Creating a new post
``` bash
hugo new post/hello-world.md
```

2. Adding what I want to say with simple markdown format in `content/post/hellow-world.md` after the `+++ ... +++` front matter.

3. Running `hugo`, which creates all the files for your site.
It may be wise to remove the `public/` directory and the `/usr/share/nginx/brege.org/*` subdirectories to prune any orphaned articles.

4. Copying the generated `public/` folder over to the document root.
``` bash
sudo rsync -avP public/ /usr/share/nginx/brege.org/
```
5. Visit brege.org in my browser.

In fact, there is probably no need to run go/hugo on my DO droplet at all.
The proper way is probably to do everything on a local machine, add a new article and check at localhost:1313, then rsync the contents of `public/` to your document root on your droplet.  

Putting the source of this site on github might be even better.
I'm already keeping track of my changes with a local git repository, so I might as well make it available on GitHub.  Plus it seems worth it just for the sake of writing articles locally.

**Update**: I am getting closer to implementing my initial thoughts here: https://brege.org/post/new-way-forward-for-deploying-brege/
