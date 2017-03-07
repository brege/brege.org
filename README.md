## Workflow 

### Adding an article

This example explains how to add a new post, assuming you are in the base directory for your hugo source files.

1. `hugo new post/hello-world.md`

2. Edit `content/post/hello-world.md` after the `+++...+++` matter

3. Check your article for typos with `hugo server`

4. When satisfied with your work, run the `./deploy` to ship the changes to the production server.

To edit an article, repeat steps 2-4 above.

### Removing an article

Say you want to remove the `hello-world.md` article:

1. `rm content/post/hello-world.md`

2. `./deploy`

### Optionally, use git to keep track of changes

When work on an article is complete, typically do

1. `git add content/post/hello-world.md`

2. `git commit` and enter change

If you remove an article, `git rm content/post/hello-world.md` then step 2 or just `git commit -a`
