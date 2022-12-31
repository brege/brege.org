## Workflow 

### Adding an article

This example explains how to add a new post, assuming you are in the base directory for your [hugo](https://github.com/gohugoio/hugo) source files.

1. `hugo new --kind post hello-world`

2. Edit `content/post/hello-world/index.md` after the `+++...+++` or `---...---` front matter

3. Check your article for typos with `hugo server`, use `-D` if draft, run in separate terminal

4. When satisfied with your work, run the `bash ./deploy` script to ship the changes to the production server.

To edit an article, repeat steps 2 and 4 above while `hugo` is running.

### Removing an article

Say you want to remove the `hello-world.md` article:

1. `rm -r content/post/hello-world/`

2. `bash ./deploy`

### Optionally, use `git` to keep track of changes

Typical workflow for creating a new post:

1. `git branch new-post`

2. `git checkout new-post`

3. `hugo new --kind post i-made-a-new-post`

4. `git add content/post/i-made-a-new-post`

5. `git commit` and enter changes

6. \*lots of changes\*, then go back to step 4

Once development has completed, do 

7. `bash ./deploy`, check your site (this is public)
 
9. `git checkout master`

10. `git merge new-post`

11. `git push` (this is public)

## Install

See [Install](INSTALL.md)