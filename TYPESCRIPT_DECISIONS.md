# TypeScript Decisions

This document records important TypeScript design decisions made during the JavaScript-to-TypeScript migration.

## 1. Use Strict Type Checking

### Decision

The project uses TypeScript strict checking:

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

### Why

Strict checking catches unsafe assumptions during development, including implicit `any` types and possible `null` or `undefined` values.

This is particularly useful for DOM access, array indexing, API responses, and application state.

### Alternative Considered

Using `"strict": false` or enabling only selected strict options would require less immediate type fixing, but would provide weaker compile-time guarantees.

---

## 2. Use a Discriminated Union for Actions

### Decision

Application actions are represented using a union of object types with a common `type` discriminator.

```ts
type Action =
  | {
      type: "ROUTE_CHANGED";
      payload: ...;
    }
  | {
      type: "TASK_ADDED";
      payload: ...;
    }
  | {
      type: "TASK_DELETED";
      payload: ...;
    }
  | {
      type: "TASK_UPDATED";
      payload: ...;
    };
```

### Why

Each action has a specific payload shape.

The `type` property allows TypeScript to distinguish the actions and prevents unrelated payloads from being passed to the reducer.

### Alternative Considered

Using:

```ts
type Action = {
  type: string;
  payload: any;
};
```

would be more flexible but would remove most of the compile-time protection provided by TypeScript.

---

## 3. Use Generics for Reusable Data Structures

### Decision

Generic types are used for reusable structures such as `Queue<T>` and typed API functionality.

### Why

A generic implementation can work with multiple data types while retaining type safety.

For example:

```ts
Queue<string>
Queue<number>
Queue<User>
```

can all use the same queue implementation.

### Alternative Considered

Using `any` would allow arbitrary values but would lose compile-time type checking.

Creating separate implementations for every data type would preserve type safety but duplicate code unnecessarily.

---

## 4. Use Explicit Function Types for Components and Dispatch

### Decision

Functions that participate in the application's component and state-management interfaces have explicit parameter and return types.

For example:

```ts
(
  state: State,
  dispatch: (action: Action) => void
) => HTMLElement
```

### Why

The application has multiple modules that communicate through functions.

Explicit function types ensure that components receive the expected state and dispatch function and return a DOM element.

### Alternative Considered

Allowing TypeScript to infer every function type would reduce annotations, but important module boundaries would become less explicit.

Using broad function types such as:

```ts
(...args: any[]) => any
```

would weaken type safety.

---

## 5. Use Type-Only Imports

### Decision

Types that are only required during compilation are imported using `import type`.

Example:

```ts
import type { Action, State } from "@src/types";
```

### Why

This clearly communicates that the import is used only for type information and avoids treating a type as a runtime dependency.

It also makes the distinction between runtime imports and TypeScript-only dependencies explicit.

### Alternative Considered

Regular imports can also import types, but they do not communicate the distinction as clearly and may interact differently with module-preservation settings.

---

## Summary

The overall approach was to use TypeScript to make module boundaries, application state, actions, reusable components, and generic utilities explicit while avoiding unnecessary complexity.

The migration favors:

* strict type checking
* explicit domain types
* discriminated unions
* generics for reusable logic
* typed function interfaces
* type-only imports

The goal was to improve safety and maintainability without introducing TypeScript abstractions that the application does not need.
