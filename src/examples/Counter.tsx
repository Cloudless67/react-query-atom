import { createAtom, useAtom } from "../index";

const counterAtom = createAtom("count", 0);

function Counter() {
  const [count, setCount] = useAtom(counterAtom);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}

export default Counter;
