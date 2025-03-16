# User Management Dashboard

This project is a User Management Dashboard built with Vue 3, TypeScript, and Pinia for state management. The dashboard allows administrators to view, search, filter, edit, and manage user accounts.

## 1. How would optimized API calls in this application for performance?

To optimize API calls, I implemented the following strategies:

- **Debouncing:** For search and filter operations triggered by user input, I introduced debouncing to prevent excessive API calls. This improves the user experience by reducing unnecessary requests to the backend.
- **Batching Requests:** Where possible, I group related API requests into a single batch call. This reduces the number of HTTP requests and minimizes the network overhead.
- **Caching Responses:** I use **Axios Cache Adapter** to cache frequently requested data on the client-side. This ensures that repeated requests for the same data are served from the cache, improving performance and reducing server load.
- **Lazy Loading:** Data is loaded only when necessary. I leverage Vue's built-in lazy loading to load user data and other resources dynamically based on the user's navigation within the application.

## 2. Approach to handling shared logic between components.

I handle shared logic by abstracting common functionality into reusable **composables** using Vue 3's Composition API. For instance, data fetching, form validation, and user role checks are all abstracted into composables stored in the `composables/` folder. This ensures the code remains modular and maintainable across different components. Additionally, I use **Pinia** for centralized state management, allowing components to easily access shared data and actions without duplication.

## 3. How would implemented client-side data caching for this dashboard?

For client-side data caching, I rely on **localStorage** for storing data persistently across sessions. After fetching data from the API, I store the results along with a timestamp in `localStorage`. On subsequent visits, the app checks if the cached data is still valid based on its expiration time. If the data is outdated or critical for freshness, I re-fetch it from the server. I also use a **service worker** to cache API responses and static assets, allowing the app to serve data offline and sync with the server when connectivity is restored.

## 4. What strategy i used to scale this application if it needed to support hundreds of different user permission types?

For scaling user permissions, I implemented **Role-Based Access Control (RBAC)**. Users are assigned roles with specific permissions, which are managed on the backend and passed to the frontend upon authentication. I use **Pinia** to store user roles and permissions, ensuring they are accessible across the application. On the frontend, I conditionally render components and restrict access to certain routes based on the user's permissions, using Vue Router guards for route protection.
This approach ensures the application can scale efficiently with hundreds of different permission types while maintaining a clean and modular architecture.
