# Architecture

## Overview

The project is a client-side Single Page Application built with TypeScript.

The application is organized into several responsibilities:

* `main.ts` — application entry point and rendering coordination
* `router/` — client-side routing
* `utils/store.ts` — centralized application state
* `pages/` — page-level UI
* `components/` — reusable UI elements
* `types.ts` — shared TypeScript types
* `queue.ts` — generic queue and API-related functionality
* `tests/` — automated tests for application behavior

## Module Diagram

```text
                         ┌──────────────┐
                         │  index.html  │
                         └──────┬───────┘
                                │
                                ▼
                         ┌──────────────┐
                         │    main.ts   │
                         │ Entry Point  │
                         └──────┬───────┘
                                │
              ┌─────────────────┼─────────────────┐
              │                 │                 │
              ▼                 ▼                 ▼
        ┌───────────┐     ┌───────────┐     ┌────────────┐
        │  Router   │     │   Store   │     │   Pages    │
        │ router.ts │     │ store.ts  │     │            │
        └───────────┘     └─────┬─────┘     └─────┬──────┘
                                │                 │
                                │          ┌──────┼────────┐
                                │          │      │        │
                                │          ▼      ▼        ▼
                                │       Home   List     Detail
                                │                │
                                │                ▼
                                │          ┌────────────┐
                                │          │Components  │
                                │          ├────────────┤
                                │          │ Card       │
                                │          │ Button     │
                                │          │ Modal      │
                                │          │ AddForm    │
                                │          └────────────┘
                                │
                                ▼
                         ┌──────────────┐
                         │ localStorage │
                         └──────────────┘

                    Shared Type Definitions
                           │
                           ▼
                       types.ts

```

## Application Flow

### Application Startup

1. `index.html` loads the TypeScript application through Vite.
2. `main.ts` creates the initial application state.
3. The application registers the available routes.
4. The router determines the current route from the URL hash.
5. The corresponding page component is rendered.

### Routing

The router uses the URL hash to determine the current page.

For example:

```text
#/              → Home
#/list          → Task list
#/detail/1      → Task details
```

The router dispatches a `ROUTE_CHANGED` action when the route changes.

### State Management

Application state is centralized in the store.

The store provides:

```text
getState()
dispatch(action)
subscribe(callback)
```

When an action is dispatched:

```text
Action
  │
  ▼
Reducer
  │
  ▼
New State
  │
  ├──► localStorage
  │
  └──► subscribers
           │
           ▼
        Re-render
```

### Components

Pages compose smaller reusable components.

For example:

```text
ListPage
   │
   ├── Card
   │    ├── Button
   │    └── Button
   │
   └── addTaskForm
```

The components receive the data and dispatch function they need rather than directly owning the application's global state.

## Type System

Shared application types are defined in `src/types.ts`.

The main state model contains:

```text
State
 ├── route
 ├── params
 └── tasks[]

Task
 ├── id
 └── title

Action
 ├── ROUTE_CHANGED
 ├── TASK_ADDED
 ├── TASK_DELETED
 └── TASK_UPDATED
```

The `Action` type is a discriminated union. The `type` property identifies the action and determines the shape of its payload.

## Testing Architecture

Tests are separated according to application responsibility:

```text
tests/
├── component.test.ts
├── main.test.ts
├── pages.test.ts
├── queue.test.ts
├── router.test.ts
└── store.test.ts
```

The tests run in Vitest with a JSDOM environment so DOM-dependent components can be tested without a real browser.

## Build and Development

Vite is used as the development server and module resolver.

TypeScript is responsible for static type checking and declaration generation.

The development flow is:

```text
TypeScript Source
      │
      ▼
     Vite
      │
      ▼
 Browser Application
```

The TypeScript checking flow is:

```text
TypeScript Source
      │
      ▼
     tsc
      │
      ▼
Type Checking / JavaScript / Declarations
```
