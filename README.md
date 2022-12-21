## Workflow 

### Adding an article

This example explains how to add a new post, assuming you are in the base directory for your hugo source files.

1. `hugo new post/hello-world`

2. Edit `content/post/hello-world/index.md` after the `+++...+++` front matter

3. Check your article for typos with `hugo server`

4. When satisfied with your work, run the `./deploy` script to ship the changes to the production server.

To edit an article, repeat steps 2-4 above.

### Removing an article

Say you want to remove the `hello-world.md` article:

1. `rm -r content/post/hello-world/`

2. `./deploy`

### Optionally, use git to keep track of changes

Typical workflow for creating a new post:

1. `git branch new-post`

2. `git checkout new-post`

3. `hugo new post/i-made-a-new-post`

4. `git add content/post/i-made-a-new-post`

5. `git commit` and enter changes

6. \*lots of changes\*, then go back to step 4 

Once development has completed, do 

7. `./deploy`, check your site 
 
9. `git checkout master`

10. `git merge new-post`

11. `git push`

