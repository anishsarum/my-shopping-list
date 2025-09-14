# My Shopping List App

This is a simple shopping list application built with **Vite**, **React**, and **Tailwind CSS**.  
Currently, it includes only the frontend, which is dockerised for development mode.

## Features

- Add, check off, and delete shopping list items
- Responsive and clean UI with Tailwind CSS
- Login screen (placeholder logic; backend integration planned)

## Development

- The frontend runs in a Docker container with hot reloading enabled for development.
- Pre-commit hooks are set up using Husky and lint-staged for code formatting and linting.

## Planned Backend

- User authentication (sign up and login)
- Per-user shopping lists stored in a backend service
- Full-stack Docker Compose setup

## Planned Migration
- The frontend is planned to be migrated from Vite/React to Next.js in a future release for improved routing, SSR, and scalability.

## How to Run Locally

To set up and run the frontend locally using Docker:

1. Make the build script executable (if not already):
   ```sh
   chmod +x build-all.sh
   ```
2. Build the project:
   ```sh
   ./build-all.sh
   ```
3. Start the development environment:
   ```sh
   docker compose up --build
   ```