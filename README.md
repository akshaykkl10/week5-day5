# Week 5 TypeScript SPA

A small Single Page Application (SPA) built with TypeScript. The application provides task management functionality with client-side routing, state management, reusable UI components, and automated tests.

## Live Demo

[Add your deployed application URL here]

## Tech Stack

* TypeScript
* Vite
* Vitest
* JavaScript DOM APIs
* HTML/CSS
* ESLint
* V8 coverage

## What the Application Does

The application is a client-side task management SPA.

It includes:

* Task listing
* Adding tasks
* Updating tasks
* Deleting tasks
* Task detail pages
* Client-side hash routing
* Centralized application state
* Local storage persistence
* Reusable UI components
* Automated unit and integration tests

## TypeScript Features Used

### Interfaces

Interfaces are used to describe structured application data such as `State`, `Task`, and other objects passed between modules.

### Union Types

Action types use a discriminated union so that each action has a specific `type` and corresponding payload.

For example:

```ts
type Action =
  | { type: "ROUTE_CHANGED"; payload: ... }
  | { type: "TASK_ADDED"; payload: ... }
  | { type: "TASK_DELETED"; payload: ... }
  | { type: "TASK_UPDATED"; payload: ... };
```

This allows TypeScript to determine which payload is valid for each action.

### Generics

Generic types are used where the same implementation needs to work with different data types.

For example, `Queue<T>` can represent a queue of strings, numbers, or objects without duplicating the implementation.

### Function Types

Functions such as components, dispatch functions, and callbacks are explicitly typed.

### Strict Type Checking

The project uses TypeScript strict checking to detect potential type errors, including unsafe null/undefined access and implicit `any` types.

### Type-only Imports

Type-only imports are used when an import is needed only for TypeScript's type system.

```ts
import type { Action, State } from "@src/types";
```

### Path Aliases

Path aliases are used to avoid long relative import paths.

Examples:

```ts
@components/*
@pages/*
@router/*
@utils/*
@src/*
```

## Project Structure

```text
week5-day5/
│
├── src/
│   ├── components/
│   │   ├── addTaskForm.ts
│   │   ├── button.ts
│   │   ├── card.ts
│   │   └── modal.ts
│   │
│   ├── pages/
│   │   ├── DetailPage.ts
│   │   ├── Homepage.ts
│   │   ├── ListPage.ts
│   │   └── SettingsPage.ts
│   │
│   ├── router/
│   │   └── router.ts
│   │
│   ├── utils/
│   │   └── store.ts
│   │
│   ├── main.ts
│   ├── queue.ts
│   └── types.ts
│
├── tests/
│   ├── component.test.ts
│   ├── main.test.ts
│   ├── pages.test.ts
│   ├── queue.test.ts
│   ├── router.test.ts
│   └── store.test.ts
│
├── index.html
├── tsconfig.json
├── vite.config.js
├── vitest.config.js
├── eslint.config.ts
├── package.json
├── ARCHITECTURE.md
└── TYPESCRIPT_DECISIONS.md
```

## Installation

Clone the repository and install the dependencies:

```bash
npm install
```

## Development

Start the Vite development server:

```bash
npm run dev
```

The application will be available at the local URL provided by Vite.

## Build

Compile the TypeScript project:

```bash
npm run build
```

## Testing

Run the complete Vitest test suite with coverage:

```bash
npm test
```

The project uses V8 coverage reporting.

## Type Checking

Run TypeScript without generating output:

```bash
npx tsc --noEmit
```

For strict checking:

```bash
npx tsc --strict --noEmit
```

## Linting

Run ESLint:

```bash
npx eslint .
```

## Coverage

The test suite currently covers the application's business logic above the required 70% threshold.

## Project Goals

This project was migrated from JavaScript to TypeScript as part of the Week 5 TypeScript training and checkpoint. The main goals were to introduce static typing, improve type safety, use TypeScript-specific patterns, and maintain the existing application's functionality while adding automated tests.

## Deployment

The application is configured for GitHub Pages deployment using Vite and GitHub Actions.

The production build is generated with `vite build` and deployed from the `dist` directory.

After the PR is merged into `main`, GitHub Actions will deploy the application to:

https://akshaykkl10.github.io/week5-day5/