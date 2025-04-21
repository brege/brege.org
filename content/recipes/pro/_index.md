---
title: 'Production Recipes'
ShowTOC: false
draft: false
date: 2025-04-16
layout: recipe-landing
ShowBreadcrumbs: true
---

## Production Recipes

These recipes are for a production kitchen. The quantities are much larger than what is appropriate for home use. These are speed recipes in the sense the user knows their way around their equipment, and has familiarized themselves with industry terminology.


{{< recipe-list section="pro" >}}

## Converting Gourmet Recipe Manager HTML to Markdown

You'll have to change the paths in the script.
I wrote this script to automatically convert the now abandoned 
[Gourmet Recipe Manager](https://github.com/thinkle/gourmet) output HTML files to:
Markdown.  You can run this script with `--no-hugo` to generate normal markdown
files.  If you download this script to the same directory as the output from 
*Gourmet* > *Files* > *Export all recipes* > *HTML* as the output format in the 
file picker.  Otherwise, you can specify `--input=` and `--output=` or
in long form or `-i` and `-o` in short form to change the paths.

<details>
<summary><strong>Show script used to generate these recipes</strong></summary>

{{< codefile src="scripts/convert-gourmet-recipe-manager-html-to-markdown.sh" >}}

</details>
