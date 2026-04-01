# [brege.org](https://brege.org)

[brege.org](https://brege.org) is my static [hugo](https://github.com/gohugoio/hugo) site, which is currently based on [hugo-PaperMod](https://github.com/adityatelange/hugo-PaperMod). 

## Adding an article

How I add a new post on [brege.org](https://brege.org).

1. Initialize
   ```bash
   hugo new --kind post post/hello-world
   hugo server # -D|--buildDrafts
   ```
2. Edit `content/post/hello-world/index.md` and add content after the `+++...+++` or `---...---` front matter
3. The I run an external `./deploy` script to push the changes to my droplet.

## Editing an article

To edit an article, repeat steps 2-4 while `hugo server` is running.

## Removing an article

Say you want to remove the `hello-world.md` article:

```bash
rm -r content/post/hello-world/
./deploy
```

## Taxonomy

See [Post README](content/post/README.md) and [Recipe README](content/recipes/README.md) for categories, tagging, and serialization used on [brege.org](https://brege.org).

## Installing

### Site

```bash
git clone git@github.com:brege/brege.org.git
cd brege.org
```

This repo tracks all JavaScript, CSS, and Markdown files used on [brege.org](https://brege.org). I have heavily modded [papermod](https://github.com/adityatelange/hugo-PaperMod) for better culinary and multiple-careers handling through:

- [shortcodes](https://gohugo.io/shortcodes/)
- [partials](https://gohugo.io/functions/partials/)
- [layouts](https://gohugo.io/methods/page/layout/)
- [assets](https://gohugo.io/hugo-pipes/introduction/#asset-directory)

### Theme 

```bash
mkdir -p themes/hugo-papermod
git clone git@github.com:adityatelange/hugo-PaperMod.git themes/hugo-papermod/
```
Check: `hugo server`

### CV

The main configuration of my cv is in `content/cv/cv.yaml`. A Markdown version of this is created so:

1. hugo/papermod can accurately count words through `.Content`
2. the `cv.md` becomes easier to copy and paste from
3. works with external Markdown editors

To create the `cv.md` file:
```bash
make cv
```

## License

[MIT](LICENSE)
