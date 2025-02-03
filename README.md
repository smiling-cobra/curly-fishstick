## Curly Fishstick

This is a post management application written in Vue.js 3. It allow users to CRUD posts using the JSON placeholder API.

## Pre-conditions

- Node 20.18.1 is required.

## Some explanations

- I choose JS instead of TS in a sake of simplicity.

- I decided to use tailwind in order to move faster.

- I created data fetching layer using axios. I decided to use specifically axios because it's more convenient - automatically transforms JSON responses and simplifies error handling. However, buil-in fetch could perfectly fit instead but will require a bit more code.

- Since JSON placeholder API is partially imitation real API behavior, I had to use vuex & vuex-persistedstate in order to be able to persist and manipulate data properly. I've created 2 separate

- I decided to combine posts and partially users into mergedPosts in order to avoid data transformation down the line, have it centralized and reusable. I admit that it's not the best idea eventually, since it creates tight data coupling (view is tightly coupled to both modules). But I think it's acceptable in the context of a case study.

- I've tried to utilize [vue-quill](https://vueup.github.io/vue-quill/#demo) for rich text functionality, but had to get rid of it eventually because it did not work and I was short on time to figure out why.

## Issues

- Issue with the tailwind CLI in version of 4.0.0. Had to use version 3.3.
- Issues with usage of vue-quill package.

## Notes

If I would have more time then I would add form validation, tests and accessibility features (bonus points). I would fix update of newly created posts (now it fails with 500 being return). Also, I would add pagination, confirmation windows (for all CRUD operations), notifications, maybe sorting, some kind of multiple posts management (multiple posts removal, for example).