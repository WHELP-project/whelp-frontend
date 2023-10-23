# UI Package for Whelp App

## Overview

The `UI` package serves as the UI component library for the Whelp App. Built on top of Material-UI (MUI), this package contains reusable components that are also documented and tested using Storybook.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Directory Structure](#directory-structure)
- [Running Storybook](#running-storybook)
- [Usage](#usage)
- [Conventions](#conventions)

## Getting Started

1. Navigate to the `UI` directory from the project root

   ```bash
   cd packages/UI
   ```

2. Install dependencies (if you haven't installed dependencies from the root)
   ```bash
   yarn install
   ```

## Directory Structure

- `src/`: Source folder containing UI components
- `stories/`: Storybook stories for components

## Running Storybook

To view components in a live Storybook environment, execute:

```bash
yarn storybook
```

This will open Storybook in your default web browser.

## Usage

Components are exported from this package and can be imported into other packages:

```typescript
import { MyComponent } from "@whelp/UI";
```

You can then use these components in your application like any other React component:

```jsx
<MyComponent someProp={value} />
```

## Conventions

- Follow MUI guidelines for styling and theming.
- Write Storybook stories for each new component.
- Make sure components are reusable and well-documented.

---

For any questions or issues, refer to the main project README or open an issue.
