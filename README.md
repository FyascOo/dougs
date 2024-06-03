# Dougs

<a alt="Dougs logo" href="https://dougs.fr" target="_blank" rel="noreferrer"><img src="apps/category-front/public/favicon.png" width="45"></a>

✨ Proposal of a solution to the technical test ✨

## First step

Installer les dependences `npm i`

Then build back project to generate static file `npx nx build category-back`

## Start the application

Run `npx nx run-many -t target` to start the development server for the backend and frontend projects.

if you want serve specific project `npx nx serve category-front` or `npx nx serve category-back`

## Start the test

Run `npx nx run-many -t test` to start the test for backend and frontend projects.

if you want test specific project `npx nx test category-front` or `npx nx test category-back`

## Explore the project graph

Run `npx nx graph` to show the graph of the workspace.
It will show tasks that you can run with Nx.

- [Learn more about Exploring the Project Graph](https://nx.dev/core-features/explore-graph)
