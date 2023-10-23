# State Package for Whelp App

## Overview

The `State` package is responsible for managing the application state using Zustand. This package centralizes all application-level states and exposes them for use in other packages.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Directory Structure](#directory-structure)
- [Usage](#usage)
- [Best Practices](#best-practices)

## Getting Started

1. Navigate to the `state` directory from the project root
   ```bash
   cd packages/state
   ```

2. Install dependencies (if you haven't installed dependencies from the root)
   ```bash
   yarn install
   ```

## Directory Structure

- `src/`: Source folder containing Zustand stores
- `index.ts`: Main entry point for exports

## Usage

Stores are exported from this package and can be imported into other packages:

```typescript
import { useMyStore } from '@whelp/state';
```

You can then use Zustand's hooks or API to interact with the state:

```typescript
const { someValue, someMethod } = useMyStore();
```

## Best Practices

- Keep stores focused and specific to a domain or feature.
- Use selectors for derived state.
- Keep asynchronous actions separate or handle them appropriately within Zustand actions.

---

For any questions or issues, refer to the main project README or open an issue.
