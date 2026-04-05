# [brege.org](https://brege.org)

[brege.org](https://brege.org) is my static [hugo](https://github.com/gohugoio/hugo) site, which is based on my custom theme, [gastrophysics](https://github.com/brege/gastrophysics).

## Adding an article

How I add a new post on [brege.org](https://brege.org).

1. Initialize
   ```bash
   hugo new --kind post post/hello-world
   hugo server # -D|--buildDrafts
   ```
2. Edit `content/post/hello-world/index.md` and add content after the `+++...+++` or `---...---` front matter
3. Then I run an external `./deploy` script to push the changes to my droplet.

## Editing an article

Edit files while `hugo server` is running.

## Removing an article

Say you want to remove the `hello-world.md` article:

```bash
rm -r content/post/hello-world/
./deploy
```

## Taxonomy

See [Post README](content/post/README.md) and [Recipe README](content/recipes/README.md) for categories, tagging, and post serialization used on [brege.org](https://brege.org).

## Installing

### Site

```bash
git clone git@github.com:brege/brege.org.git
cd brege.org
```

This repo tracks all of the base Markdown files (content) and [partials](https://gohugo.io/functions/partials/) and [shortcodes](https://gohugo.io/shortcodes/) I've made to produce calculators, graphs, and other one-off JavaScript toys. The repo history contains most of the evolution of my [gastrophysics](https://github.com/brege/gastrophysics) theme (formerly, [layouts](https://gohugo.io/methods/page/layout/) and [assets](https://gohugo.io/hugo-pipes/introduction/#asset-directory)), whose overrides and additions began eclipsing [papermod](https://github.com/adityatelange/hugo-PaperMod)'s feature-set.


### Theme 

```bash
mkdir -p themes/gastrophysics
git clone git@github.com:brege/gastrophysics.git themes/gastrophysics/
```
Check: `hugo server`

### CV

The main configuration of my cv is in `content/cv/cv.yaml`. A Markdown version of this is created so:

1. hugo/gastrophysics can accurately count words through `.Content`
2. the `cv/index.md` becomes easier to copy and paste from
3. works with external Markdown editors

To create the `cv.md` file:
```bash
make cv
```
This is already automated, even via `hugo server`, through the `Makefile`.

## License

[MIT](LICENSE)
