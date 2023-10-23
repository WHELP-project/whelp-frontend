# Contracts Package for Whelp App

## Overview

The `Contracts` package contains all auto-generated contract APIs for interacting with CosmWasm smart contracts on the Coreum blockchain. Code generation is done using [ts-codegen](https://github.com/CosmWasm/ts-codegen).

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Directory Structure](#directory-structure)
- [Usage](#usage)

## Getting Started

1. Navigate to the `contracts` directory from the project root

   ```bash
   cd packages/contracts
   ```

2. Install dependencies (if you haven't installed dependencies from the root)
   ```bash
   yarn install
   ```

## Directory Structure

- `src/`: Source folder containing generated TypeScript files
- `codegen-config.json`: Configuration file for ts-codegen

## Usage

Once the API code is generated, it can be imported into other packages like:

```typescript
import { SomeContract } from "@whelp/contracts";
const someContract = new SomeContract();
someContract.someMethod();
```

---

For any questions or issues, refer to the main project README or open an issue.
