# react-query-atom - Tiny React State Management with URL Query Parameters

## Overview

**react-query-atom** is a lightweight state management library that synchronizes React state with URL query parameters. It provides an API similar to [Recoil](https://recoiljs.org/) or [Jotai](https://jotai.org/) (`createAtom`, `useAtom`) but ensures that state changes reflect in the URL and vice versa, without specific router dependencies.

### Features

✅ Simple API: `createAtom`, `useAtom`  
✅ Works with Any Router (or No Router at All)  
✅ Supports Back/Forward Navigation
✅ Handles Complex Data Types (JSON Objects, Arrays)  
✅ Custom Serialization/Deserialization
✅ No Dependencies, Pure React

## Installation

Install the package using npm or yarn:

```bash
npm install query-atom
# or
yarn add query-atom
# or
pnpm add query-atom
```

## Usage

### 1. Create an Atom

Atoms define a query parameter and its default value.

```ts
import { createAtom, useAtom } from "react-query-atom";

const countAtom = createAtom("count", 0);
```

### 2. Use the Atom in a Component

`useAtom` synchronizes state with the query parameter.

```tsx
import { useAtom } from "react-query-atom";
import { countAtom } from "./atoms";

function Counter() {
  const [count, setCount] = useAtom(countAtom);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}

export default Counter;
```

### 3. Query Parameters Update Automatically

- Changing `count` in the app updates the URL (`?count=1`).
- Manually changing the URL (`?count=5`) updates the state.
- Default values are removed from the URL for cleanliness.

## API Reference

### `createAtom<T>(key: string, defaultValue: T, options: Options<T>): Atom<T>`

Creates an atom bound to a query parameter.

- `key`: The query parameter name.
- `defaultValue`: The initial value if the parameter is missing.
- `options`: Additional configuration (see below).

```ts
const themeAtom = createAtom("theme", "light");
```

#### Options

- `serialize`: Converts the value to a string for the URL. (default: `JSON.stringify`)
- `deserialize`: Converts the URL string to the value. (default: `JSON.parse`)
- `shallow`: Update the URL without history push (default: `false`).

> **Note:** Due to limitations with JSON serialization, invalid values (e.g., `undefined`, `NaN`) are not supported. Use a custom `serialize` function if needed.

### `useAtom<T>(atom: Atom<T>): [T, (newValue: T) => void]`

Hooks into an atom, returning the state and setter function.

```ts
const [theme, setTheme] = useAtom(themeAtom);
```

## Advanced Usage

### Custom Serialization

Use custom serialization functions for complex data types.

```ts
const userAtom = createAtom(
  "user",
  { name: "Alice" },
  {
    serialize: (user) => user.name,
    deserialize: (name) => ({ name }),
  }
);
```

### Back/Forward Navigation Support

State updates automatically when navigating browser history.

## Contributing

Feel free to submit issues or pull requests on GitHub.

## License

MIT License. Free to use and modify.
