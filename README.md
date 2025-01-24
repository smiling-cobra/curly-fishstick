## Curly Fishstick

This is a post management application written in Vue.js 3. It allow users to CRUD posts using the JSON placeholder API.

## Explanations

- I took JS instead of TS in a sake of simplicity.

- I decided to use vanilla css over tailwind in order to keep it cheap & simple.

- I decided to use vue router in the sake of better organisation. However, it could've been built on a single page.

- CRUD operations are encapsulated in usePosts & useUsers.

- Composables - usePosts & useUsers are being used in order to manage data fetching & state, making them reusable.