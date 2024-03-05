# cen3031_team2
The semester group project for CEN3031

# Contributing
*A prefered method to make contributions is fork, feature-branch, and PR. This method is the most common across open-source projects on GitHub.*

*The contributing procedure below is from the [Jellyfin project](https://github.com/jellyfin), but slightly modified to the needs of this repo. https://jellyfin.org/docs/general/contributing/development#how-should-you-make-changes*

## Set up your copy of the repo

1. Fork the project on GitHub.
2. Clone the fork to your local machine

    `git clone git@github.com:yourusername/cen3031_team2.git`

    `cd cen3031_team2`

3. Add the "upstream" remote
    
    `git remote add upstream git@github.com:kasinsparks/cen3031_team2.git`

## Making changes

1. Rebase your local branch against upstream main so you are working off the latest changes:

    `git fetch --all`

    `git rebase upstream/main`

2. Create a local feature branch off of main to make your changes:

    `git checkout -b my-feature main`

3. Make your changes and commits to this local feature branch.

4. Repeat step 1 on you local feature branch once you are done with your feature. This will ensure you do not have any conflicts with other work since you started.

5. Push your local feature branch to your GitHub fork:
    `git push --set-upstream origin my-feature`

6. On GitHub, create a new PR against the upstream main branch.

7. Keep your local branches up-to-date through GitHub or by the following:

    `git fetch --all`

    `git checkout main`

    `git rebase upstream/main`

    `git push -u origin main`

8. Delete your local feature branch iff you no longer need it:

    `git branch -d my-feature`

### Optional

* Before submitting a PR, squash "junk" commits together to keep the overall history clean. A single commit should cover a single significant change: avoid squashing all your changes together, especially for large PRs that touch many files, but also don't leave "fixed this", "whoops typo" commits in your branch history as this is needless clutter in the final history of the project.
