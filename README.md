# [brege.org](https://brege.org)

### Adding an article

This example explains how to add a new post, assuming you are in the base directory for your [hugo](https://github.com/gohugoio/hugo) source files.

1. Initialize: `hugo new --kind post post/hello-world`
2. Edit `content/post/hello-world/index.md` after the `+++...+++` or `---...---` front matter
3. Check article for typos with `hugo server` (use `-D` if draft) 
4. When finalized, run `./deploy` ship the changes to the production server

To edit an article, repeat steps 2-4 above while `hugo server` is running. Best to use git to track changes.

### Removing an article

Say you want to remove the `hello-world.md` article:

1. `rm -r content/post/hello-world/`
2. `./deploy`

## Installing

### Site

1. `git clone git@github.com:brege/brege.org.git`
2. `cd brege.org`

Contains Markdown (post content) and JavaScript (shortcodes and partials).

### Theme 

3. `mkdir -p themes/hugo-papermod`
4. `git clone git@github.com:adityatelange/hugo-PaperMod.git themes/hugo-papermod/`
5. check: `hugo server`

The base of [brege.org](https://brege.org) is [hugo-PaperMod](https://github.com/adityatelange/hugo-PaperMod), with some custom overrides found in [`assets/css/extended/`](assets/css/extended/).
