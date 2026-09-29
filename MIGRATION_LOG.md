# TypeScript Migration Log

## Project

Week 4 Mini SPA

## Objective

Document common TypeScript migration errors encountered while converting the
Week 4 JavaScript SPA to TypeScript.

---

## 1. Property does not exist on type

### Error Pattern

```text
Property 'X' does not exist on type 'Y'.
```

### Cause

A property was accessed on an object, but that property was not included in
the object's TypeScript type.

### Example

```ts
interface User {
    id: number;
    name: string;
}

const user: User = {
    id: 1,
    name: "Akshay"
};

console.log(user.email);
```

TypeScript reports:

```text
Property 'email' does not exist on type 'User'.
```

### Fix

Add the property to the interface if it is actually part of the data:

```ts
interface User {
    id: number;
    name: string;
    email: string;
}
```

### Lesson

The first solution should be to correct the type definition. A type assertion
should only be used when the type is known but TypeScript cannot determine it.

---

## 2. Object is possibly null

### Error Pattern

```text
Object is possibly 'null'.
```

### Cause

Some DOM methods can return `null` when an element is not found.

### Example

```ts
const app = document.querySelector("#app");

app.replaceChildren(...);
```

`querySelector()` can return:

```text
Element | null
```

Therefore TypeScript cannot guarantee that `app` exists.

### Fix

Check for `null` before using the value:

```ts
const app = document.querySelector("#app");

if (!app) return;

app.replaceChildren(...);
```

### Alternative

Optional chaining can be used when doing nothing is acceptable:

```ts
app?.replaceChildren(...);
```

### Non-null Assertion

The `!` operator can be used when the value is definitely known to exist:

```ts
const app = document.querySelector("#app")!;
```

It should only be used when that guarantee is actually valid.

### Lesson

Prefer a null check when the value can genuinely be missing.

---

## 3. Argument of type X is not assignable to Y

### Error Pattern

```text
Argument of type 'X' is not assignable to parameter of type 'Y'.
```

### Cause

A function received a value whose type does not match the type expected by
the function parameter.

### Example

```ts
function greet(name: string): void {
    console.log(name);
}

greet(123);
```

TypeScript reports:

```text
Argument of type 'number' is not assignable to parameter of type 'string'.
```

### Fix

Pass the correct type:

```ts
greet("Akshay");
```

If the function should actually accept numbers, change the function's
parameter type instead.

### Lesson

Understand why the two types are different and fix the root cause instead of
using a type assertion to hide the error.

---

## 4. Incorrectly Inferred Object Type

### Error Pattern

An object initialized as `{}` does not accept a property assigned later.

### Example

```ts
let params = {};

params = {
    id: 10
};
```

The intended type is:

```ts
{
    id?: number;
}
```

### Fix

Explicitly define the intended type:

```ts
let params: { id?: number } = {};

params = {
    id: 10
};
```

### Lesson

When TypeScript cannot infer the intended object shape correctly, explicitly
define the type.

---

## 5. Overly Broad Function Type

### Error Pattern

Using `Function` when the actual function signature is known.

### Example

```ts
const subscribers: Set<Function> = new Set();
```

### Problem

`Function` is too broad and does not describe the arguments or return value
of the functions stored in the set.

### Fix

The subscribers in the SPA take no arguments and return nothing:

```ts
const subscribers: Set<() => void> = new Set();
```

### Lesson

Use the actual function signature instead of the broad `Function` type.

---

# Migration Principles

## Fix the Root Cause

Do not immediately use:

```ts
value as any
```

to silence an error.

Find out why the types do not match and fix the underlying problem.

---

## Prefer Type Narrowing

For nullable values:

```ts
if (!value) return;
```

For values with different possible types:

```ts
if (typeof value === "string") {
    // value is known to be a string here
}
```

---

## Use Type Assertions Carefully

A type assertion:

```ts
value as SomeType
```

does not validate the value at runtime.

It only tells TypeScript to treat the value as `SomeType`.

Therefore, assertions should not be used as a replacement for proper
type checking.

---

## Avoid `any`

The final migration target is zero `any`.

Prefer:

- Interfaces
- Type aliases
- Union types
- Generics
- Type guards
- Explicit function signatures
- Null checks
- Properly typed data structures

---

# Commands Used During Migration

## Check TypeScript Without Generating Files

```bash
npx tsc --noEmit
```

## Run Tests

```bash
npm test
```

## Run Tests With Coverage

```bash
npm test -- --coverage
```

---

# Migration Checklist

- [ ] Existing JavaScript files checked with `checkJs`
- [ ] Utilities converted to TypeScript
- [ ] Components converted to TypeScript
- [ ] Router converted to TypeScript
- [ ] State manager converted to TypeScript
- [ ] Tests converted to TypeScript
- [ ] All `any` types removed
- [ ] `strict: true` enabled
- [ ] Null and undefined errors resolved
- [ ] Type assignment errors resolved
- [ ] `npx tsc --noEmit` passes
- [ ] Jest tests pass
- [ ] Coverage is at least 70%
