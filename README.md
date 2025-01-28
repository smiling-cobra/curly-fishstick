## Curly Fishstick

This is a post management application written in Vue.js 3. It allow users to CRUD posts using the JSON placeholder API.

## Pre-conditions

- Node 20.18.1 is required.

## Explanations

- I took JS instead of TS in a sake of simplicity.

- I decided to use vanilla css over tailwind in order to keep it cheap & simple.

- I decided to use vue router in the sake of better organisation. However, it could've been built on a single page.

- CRUD operations are encapsulated in usePosts & useUsers.

- Composables - usePosts & useUsers are being used in order to manage data fetching & state, making them reusable.

- I decided to combine usePosts and useUsers composables because I need to reuse that data in multiple places. Since the project is small I think global app state is an overhead.

## Issues

- Issue with the tailwind CLI in version of 4.0.0. Had to use version 3.3.


# Frontend Assessment Task

Thank you for taking the time to complete this assessment task. Your evaluation will be a crucial part of the hiring process.

## Objective

Create a post management application using Vue.js 3 composition API and Vite. The application should allow users to read, create, delete, and update posts using the JSON placeholder API.

### Requirements:

- Use Vue.js 3 composition API and Vite for building the application
- Implement CRUD functionality for posts
- Use JSON placeholder API for data fetching and manipulation
- Choose between Tailwind, UnoCSS, or Vanilla CSS for styling components

Note: You are free to use any additional libraries or tools that you see fit to accomplish the task.

### Deliverables:

- Source code of the application
- Hosted environment on GitHub Pages, Netlify, or Vercel
    - CodeSandbox, Gitpod, or Stackblitz is also acceptable
- Brief explanation of the design decisions and additional technologies used

Note: Please provide the URL to the GitHub repository containing your Vue.js application code as well as the hosted environment of your choice. Include relevant documentation or instructions on how to run the application locally if needed.

### Evaluation Criteria:

- Overall functionality and user experience of the application
- Code quality and organization
- Use of Vue.js 3 composition API
- Implementation of CRUD functionality
- Use of chosen styling framework or plain Vanilla CSS

### Bonus Points:

- Implementation of form validation
- Accessibility features
- Write end-to-end tests for the application

### API Endpoints

* GET `/posts`
	* Gets list of 100 posts
* GET `/posts/{id}`
	*  Gets a single post
* POST `/posts`
	* Adds a new post
* PUT `/posts/{id}`
	* Updates an existing post
* DELETE `/posts/{id}`
	* Deletes a post
* GET `/users`
	* Gets a list of 10 users 	

The Rest API endpoint is provided by [JSON Placeholder](https://jsonplaceholder.typicode.com/).

---

We understand time constraints and welcome any shortcuts you may need to take. In the spirit of transparency, please include a section outlining what you would have done differently with more time, noting any known issues or areas for improvement.

Good luck!