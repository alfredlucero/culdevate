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
