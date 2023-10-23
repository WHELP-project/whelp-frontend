# Utils Package for Whelp App

## Overview

The `Utils` package contains utility functions, helper methods, and shared configurations for the Whelp App. These utilities are meant to be reusable across multiple packages.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Directory Structure](#directory-structure)
- [Usage](#usage)
- [Best Practices](#best-practices)

## Getting Started

1. Navigate to the `utils` directory from the project root

   ```bash
   cd packages/utils
   ```

2. Install dependencies (if you haven't installed dependencies from the root)
   ```bash
   yarn install
   ```

## Directory Structure

- `src/`: Source folder containing utility functions and helper methods
- `index.ts`: Main entry point for exports

## Usage

Utility functions are exported from this package and can be imported into other packages:

```typescript
import { someUtilityFunction } from "@whelp/utils";
```

You can then use these utility functions in your application:

```typescript
const result = someUtilityFunction(args);
```

## Best Practices

- Make utilities as generic as possible for maximum reusability.
- Document functions clearly to indicate what they do and what parameters they expect.
- If a utility function becomes too specific to a particular use-case, consider moving it to the relevant package.

---

For any questions or issues, refer to the main project README or open an issue.
