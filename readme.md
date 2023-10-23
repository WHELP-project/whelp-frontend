# Whelp App

## Introduction

Welcome to the Whelp App repository. This application serves as a decentralized exchange (DEX) on the Coreum blockchain and is built using CosmWasm smart contracts. The repository architecture leverages Yarn Workspaces to modularize the codebase and facilitate development. Below you'll find details on the purpose of each workspace package and how to get started.

## Table of Contents

- [Introduction](#introduction)
- [Table of Contents](#table-of-contents)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Packages](#packages)
  - [Core](#core)
  - [Utils](#utils)
  - [State](#state)
  - [UI](#ui)
  - [Contracts](#contracts)
- [Development Guidelines](#development-guidelines)
- [Contributing](#contributing)

## Architecture

The codebase is organized into multiple Yarn workspaces, each serving a specific purpose.

- `Core`: Main application built with Next.js
- `Utils`: Helper and utility functions
- `State`: State management with Zustand
- `UI`: UI component kit based on Material-UI (MUI), supporting Storybook
- `Contracts`: Contains all auto-generated contract API code for interacting with CosmWasm smart contracts.

## Getting Started

1. Clone the repository

   ```
   git clone <repository_url>
   ```

2. Install dependencies

   ```
   yarn install
   ```

3. Run development servers (From individual package directories or use workspace commands)
   ```
   yarn dev
   ```

## Packages

### Core

This is the main workspace that houses the Next.js application.

- Run development server: `yarn workspace core dev`

### Utils

Utilities, helper functions and common configurations reside here.

- To import in other packages: `import { someFunction } from '@whelp/utils'`

### State

The Zustand state management library is utilized for managing application state.

- To import in other packages: `import { useMyStore } from '@whelp/state'`

### UI

This workspace contains a UI component library built on top of MUI and also supports Storybook for component documentation and testing.

- Run Storybook: `yarn workspace ui storybook`

### Contracts

This workspace contains all auto-generated contract APIs for interacting with CosmWasm smart contracts on the Coreum blockchain. Code generation is done using [ts-codegen](https://github.com/CosmWasm/ts-codegen).

- Build it: `yarn workspace contracts build`

## Development Guidelines

- Please follow the standard coding guidelines and styles.
- Always create a new branch for features or bug fixes.
- Keep commits granular and specific to the changes made.

## Contributing

Please read the `CONTRIBUTING.md` file for details on how to contribute to this project.

___

For any issues or further questions, feel free to open an issue or contact the maintainers.

