+++
date = "2016-10-18T16:35:01-07:00"
title = "New way forward for deploying brege.org"
math = false
tags = ["hugo","rsync","deployment"
]

[header]
image = ""
caption = ""

[image]
caption = ""
focal_point = ""
preview_only = true

aliases = [
        "/post/new-way-forward-for-deploying-brege/",
        "/post/new-way-forward-for-developing-brege/"
]
+++

ssh'ing into my Digital Ocean droplet has become rather annoying for maintaining this website.  Particularly annoying is dealing with images on two different filesystems.  In the [README](https://github.com/brege/brege.org/blob/master/README.md) (commit [1a0ee5a](https://github.com/brege/brege.org/commit/1a0ee5a1a946bf5ee574a4593e4e6b22d35607e3)), I describe the steps I have been doing to publish an article to https://brege.org. 

I tried implementing [this method](https://www.digitalocean.com/community/tutorials/how-to-deploy-a-hugo-site-to-production-with-git-hooks-on-ubuntu-14-04), but it is very long and requires many modifications to the post-receive hook to get it working on a per-user basis.

Here I outline a way to do this in a more conservative manner.<!--more-->

## Installation on development machine

1. On a development laptop, [Fedora](https://getfedora.org/), I installed [Go](https://golang.org/) and [Hugo](https://gohugo.io) via
``` bash
sudo dnf install golang
mkdir -p ~/Build/go
export GOPATH=$HOME/Build/go
go get -v github.com/spf13/hugo
```

2. Clone repository 
``` bash
cd ~/Build/
git clone git://github.com/brege/brege.org.git
```

## New workflow for publishing an article

1. I once again use Hugo to create my article
``` bash
cd ~/Build/brege.org
hugo new post/new-way-forward-for-deploying-brege.org.md
```

2. Add content, run `hugo server`, then preview http://localhost:1313 in a browser to determine what needs to be edited.  The cool thing about this is you can edit/add a file while the test server is running. You don't even need to refresh the browser page whenever you save the file!

3. Run `rm -r public/ ; hugo` to remove the old and create the new `public/` directory on the development machine.

4. Ship the changes to the production server (DO droplet) with rsync: 
``` bash
rsync -avP --delete --exclude=".well-known" public/ brege.org:/usr/share/nginx/brege.org/
```
The new article will now show up on the https://brege.org/post/new-way-forward-for-deploying-brege/

5. Finally, commit the new article to GitHub: 
``` bash
git add content/post/new-way-forward-for-deploying-brege.org.md
git commit -m "Add article"
git push -u origin master
```

Much nicer way to go about it.  Images and other assets can be more readily copied and modified.  I can edit a webpage on the fly before publishing layout-bugs and typos to the world (or, at least to a lesser extent).
