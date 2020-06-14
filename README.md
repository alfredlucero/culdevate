# Culdevate

Full stack monorepo for Culdevate and managed through Lerna to run helpful commands across all the packages i.e. frontend and backend.

## How to get started

Install all dependencies with `npm ci`.

Install all package dependencies with `npm run setup_packages`.

After installing all the package dependencies, you can run the
dev servers for frontend and backend at the same time with `npm run dev`.

## Running Helpful Scripts across all Packages

To lint all the packages, run `npm run lint`.

When committing new code, we will typecheck and lint all the packages.
You can also run the same checks with `npm run precommit`.

When pushing new code, we will run the unit tests for all the packages.
You can also run the unit tests for all packages with `npm run test`.

## Github Action Workflows

Whenever a Pull Request to master has backend changes, we kick off the `backendPullRequestChangesAction.yml` workflow to check out the repo, install dependencies, and run unit tests for the backend folder.

Whenever a Pull Request to master has frontend changes, we kick off the `frontendPullRequestChangesAction.yml` workflow to check out the repo, install dependencies, and run unit tests for the frontend folder.

Whenever a Pull Request is merged to master and new changes are pushed to the master branch with frontend changes, we kick off the `frontendMasterStagingDeployAction.yml` to check out the repo, install the frontend dependencies, build out the web assets in the dist folder, and deploy those web assets to [surge.sh](https://surge.sh/) as our hosting provider.
We have the SURGE_TOKEN and SURGE_STAGING_DOMAIN set in the repo settings secrets area for our action to use. We also used this [github example](https://github.com/yavisht/deploy-via-surge.sh-github-action-template) as reference. The staging URL should be available on [https://culdevatestaging.surge.sh](https://culdevatestaging.surge.sh).
