# Core Package for Whelp App

## Overview

The `Core` package is the backbone of the Whelp App, containing the main Next.js application. This is where the frontend logic, pages, and application lifecycle are managed.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Directory Structure](#directory-structure)
- [Development](#development)
- [Deployment](#deployment)

## Getting Started

1. Navigate to the `core` directory from the project root

   ```bash
   cd packages/core
   ```

2. Install dependencies (if you haven't installed dependencies from the root)

   ```bash
   yarn install
   ```

3. Run the development server
   ```bash
   yarn dev
   ```

## Directory Structure

- `app/`: Next.js pages (routes)
- `components/`: Reusable components specific to this package
- `public/`: Public assets like images and fonts

## Development

- Run the development server

  ```bash
  yarn dev
  ```

- To build the project for production

  ```bash
  yarn build
  ```

- To start the production server
  ```bash
  yarn start
  ```

## Deployment

Follow the deployment steps as per your hosting solution. Typically you would:

1. Build the project

   ```bash
   yarn build
   ```

2. Deploy the `.next` directory based on your hosting provider's instructions

---

For any questions or issues, refer to the main project README or open an issue.
